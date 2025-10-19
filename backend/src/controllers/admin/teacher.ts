import { prisma } from "@/config";
import { NextFunction, Response, Request } from "express";
import {
  createTranslations,
  getResponseMessage,
  sendError,
  generateWhereInput,
  getPaginationAndFilters,
  calculateAge,
  createPassword,
} from "@/utils";
import { Prisma } from "@prisma/client";
import { CreateTeacherDTO, UpdateTeacherDTO } from "@/types/admin";

export const fetchTeachers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { skip, take, orderBy, search } = getPaginationAndFilters(req);

    const where = generateWhereInput<Prisma.TeacherWhereInput>(search, {
      "translations.some.name": "insensitive",
      "translations.some.position": "insensitive",
      "translations.some.headline": "insensitive",
      "translations.some.description": "insensitive",
    });

    const [teachers, count] = await Promise.all([
      prisma.teacher.findMany({
        where,
        skip,
        take,
        orderBy,
        include: {
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
      }),
      prisma.teacher.count({ where }),
    ]);

    return res.status(200).json({ data: teachers, count });
  } catch (error) {
    next(error);
  }
};

export const fetchTeacher = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const teacher = await prisma.teacher.findUnique({
      where: {
        id,
      },
      include: {
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
    });

    if (!teacher) {
      return sendError(req, res, 404, "userNotFound");
    }

    return res.status(200).json({ data: teacher });
  } catch (error) {
    next(error);
  }
};

export const deleteTeacher = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const teacher = await prisma.teacher.delete({
      where: {
        id,
      },
    });

    if (!teacher) {
      return sendError(req, res, 404, "userNotFound");
    }

    return res.status(200).json({
      message: getResponseMessage("userDeleted"),
    });
  } catch (error) {
    next(error);
  }
};

export const createTeacher = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { translations, dateOfBirth, email, password, personalId } =
      req.body as CreateTeacherDTO;

    const sameTeacher = await prisma.teacher.count({
      where: {
        email,
        personalId,
      },
    });
    if (sameTeacher) {
      return sendError(req, res, 400, "userAlreadyExists");
    }

    const translationsToCreate = Prisma.validator<
      Prisma.TeacherTranslationCreateWithoutTeacherInput[]
    >()(createTranslations(translations) as any);

    let age: number | null;
    try {
      age = calculateAge(dateOfBirth);
    } catch {
      return sendError(req, res, 400, "invalidDateOfBirth");
    }

    const passwordHash = await createPassword(password);

    const teacher = await prisma.teacher.create({
      data: {
        dateOfBirth,
        email,
        personalId,
        age,
        passwordHash,
        translations: { create: translationsToCreate },
      },
    });

    return res.status(201).json({
      data: teacher,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTeacher = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const { translations, dateOfBirth, email, personalId } =
      req.body as UpdateTeacherDTO;

    const sameTeacher = await prisma.teacher.count({
      where: {
        email,
        personalId,
        id: {
          not: id,
        },
      },
    });
    if (sameTeacher) {
      return sendError(req, res, 400, "userAlreadyExists");
    }

    let age: number | null;
    try {
      age = calculateAge(dateOfBirth);
    } catch {
      return sendError(req, res, 400, "invalidDateOfBirth");
    }

    const translationsToCreate = Prisma.validator<
      Prisma.TeacherTranslationCreateWithoutTeacherInput[]
    >()(createTranslations(translations) as any);

    const findTeacher = await prisma.teacher.findUnique({
      where: {
        id,
      },
    });

    if (!findTeacher) {
      return sendError(req, res, 404, "userNotFound");
    }

    const teacher = await prisma.teacher.update({
      where: {
        id,
      },
      data: {
        translations: {
          deleteMany: {},
          create: translationsToCreate,
        },
        age,
        dateOfBirth,
        email,
        personalId,
      },
    });

    return res.json({
      data: teacher,
    });
  } catch (error) {
    next(error);
  }
};
