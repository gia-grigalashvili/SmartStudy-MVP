import { prisma } from "@/config";
import { NextFunction, Response, Request } from "express";
import {
  getResponseMessage,
  sendError,
  generateWhereInput,
  getPaginationAndFilters,
} from "@/utils";
import { Prisma } from "@prisma/client";
import { CreateGroupDTO, UpdateGroupDTO } from "@/types/admin";

export const fetchGroups = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { skip, take, orderBy, search } = getPaginationAndFilters(req);

    const where = generateWhereInput<Prisma.GroupWhereInput>(search, {
      code: "insensitive",
      semester: "insensitive",
      "teacher.translations.some.firstName": "insensitive",
      "teacher.translations.some.lastName": "insensitive",
    });

    const [groups, count] = await Promise.all([
      prisma.group.findMany({
        where,
        skip,
        take,
        orderBy,
        include: {
          subjects: {
            select: {
              id: true,
              subject: {
                select: {
                  translations: {
                    include: {
                      language: {
                        select: {
                          code: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          teacher: {
            select: {
              id: true,
              translations: {
                include: {
                  language: {
                    select: {
                      code: true,
                    },
                  },
                },
              },
            },
          },
          academicCalendar: true,
        },
      }),
      prisma.group.count({ where }),
    ]);

    return res.status(200).json({ data: groups, count });
  } catch (error) {
    next(error);
  }
};

export const fetchGroup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const group = await prisma.group.findUnique({
      where: {
        id,
      },
      include: {
        subjects: {
          select: {
            id: true,
            subject: {
              select: {
                translations: {
                  include: {
                    language: {
                      select: {
                        code: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        teacher: {
          select: {
            id: true,
            translations: {
              include: {
                language: {
                  select: {
                    code: true,
                  },
                },
              },
            },
          },
        },
        academicCalendar: true,
      },
    });

    if (!group) {
      return sendError(req, res, 404, "groupNotFound");
    }

    return res.status(200).json({ data: group });
  } catch (error) {
    next(error);
  }
};

export const deleteGroup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const group = await prisma.group.delete({
      where: {
        id,
      },
    });

    if (!group) {
      return sendError(req, res, 404, "groupNotFound");
    }

    return res.status(200).json({
      message: getResponseMessage("groupDeleted"),
    });
  } catch (error) {
    next(error);
  }
};

export const createGroup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { code, semester, year, subjects, teacherId, academicCalendarId } =
      req.body as CreateGroupDTO;

    const sameGroup = await prisma.group.count({
      where: {
        code,
      },
    });
    if (sameGroup) {
      return sendError(req, res, 400, "groupAlreadyExists");
    }

    const group = await prisma.group.create({
      data: {
        code,
        year,
        semester,
        teacher: { connect: { id: teacherId } },
        academicCalendar: { connect: { id: academicCalendarId } },
      },
    });

    const groupSubjects = await Promise.all(
      subjects.map((subjectId) =>
        prisma.groupSubject.create({
          data: {
            groupId: group.id,
            subjectId,
          },
        })
      )
    );

    const updatedGroup = await prisma.group.update({
      where: { id: group.id },
      data: {
        subjects: {
          set: groupSubjects.map((gs) => ({ id: gs.id })),
        },
      },
      include: {
        subjects: true,
      },
    });

    return res.status(201).json({
      data: updatedGroup,
    });
  } catch (error) {
    next(error);
  }
};

export const updateGroup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { code, semester, subjects, year, teacherId, academicCalendarId } =
      req.body as UpdateGroupDTO;

    const sameGroup = await prisma.group.count({
      where: {
        code,
        id: {
          not: id,
        },
      },
    });
    if (sameGroup) {
      return sendError(req, res, 400, "groupAlreadyExists");
    }

    const findGroup = await prisma.group.findUnique({
      where: { id },
    });
    if (!findGroup) {
      return sendError(req, res, 404, "groupNotFound");
    }

    await prisma.groupSubject.deleteMany({ where: { groupId: id } });

    const groupSubjects = await Promise.all(
      subjects.map((subjectId) =>
        prisma.groupSubject.create({
          data: {
            groupId: id,
            subjectId,
          },
        })
      )
    );

    const updatedGroup = await prisma.group.update({
      where: { id },
      data: {
        ...(academicCalendarId && {
          academicCalendar: { connect: { id: academicCalendarId } },
        }),
        code,
        year,
        semester,
        subjects: {
          set: groupSubjects.map((gs) => ({ id: gs.id })),
        },
        teacher: {
          connect: { id: teacherId },
        },
      },
      include: {
        subjects: true,
      },
    });

    return res.json({
      data: updatedGroup,
    });
  } catch (error) {
    next(error);
  }
};
