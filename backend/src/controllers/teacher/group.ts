import { prisma } from "@/config";
import { NextFunction, Response, Request } from "express";
import {
  sendError,
  generateWhereInput,
  getPaginationAndFilters,
} from "@/utils";
import { Prisma } from "@prisma/client";

export const fetchGroups = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { skip, take, orderBy, search } = getPaginationAndFilters(req);
    const teacherId = req.user.id;

    const where = generateWhereInput<Prisma.GroupWhereInput>(
      search,
      {
        code: "insensitive",
        semester: "insensitive",
      },
      {
        teacherId,
      }
    );

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
    const teacherId = req.user.id;

    const group = await prisma.group.findUnique({
      where: {
        id,
        teacherId,
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
