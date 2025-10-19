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
import { CreateStudentDTO, UpdateStudentDTO } from "@/types/admin";

export const fetchStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { skip, take, orderBy, search } = getPaginationAndFilters(req);

    const where = generateWhereInput<Prisma.StudentWhereInput>(search, {
      "translations.some.firstName": "insensitive",
      "translations.some.fullName": "insensitive",
      "translations.some.lastName": "insensitive",
      email: "insensitive",
      personalId: "insensitive",
    });

    const [students, count] = await Promise.all([
      prisma.student.findMany({
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
      prisma.student.count({ where }),
    ]);

    return res.status(200).json({ data: students, count });
  } catch (error) {
    next(error);
  }
};

export const fetchStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const student = await prisma.student.findUnique({
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

    if (!student) {
      return sendError(req, res, 404, "userNotFound");
    }

    return res.status(200).json({ data: student });
  } catch (error) {
    next(error);
  }
};

export const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const student = await prisma.student.delete({
      where: {
        id,
      },
    });

    if (!student) {
      return sendError(req, res, 404, "userNotFound");
    }

    return res.status(200).json({
      message: getResponseMessage("userDeleted"),
    });
  } catch (error) {
    next(error);
  }
};

export const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      translations,
      dateOfBirth,
      email,
      password,
      personalId,
      class: classNumber,
    } = req.body as CreateStudentDTO;

    const sameStudent = await prisma.student.count({
      where: {
        email,
        personalId,
      },
    });
    if (sameStudent) {
      return sendError(req, res, 400, "userAlreadyExists");
    }

    const translationsToCreate = Prisma.validator<
      Prisma.StudentTranslationCreateWithoutStudentInput[]
    >()(createTranslations(translations) as any);

    let age: number | null;
    try {
      age = calculateAge(dateOfBirth);
    } catch {
      return sendError(req, res, 400, "invalidDateOfBirth");
    }

    const passwordHash = await createPassword(password);

    const student = await prisma.student.create({
      data: {
        dateOfBirth,
        email,
        personalId,
        ...(!!classNumber ? { class: classNumber } : {}),
        age,
        passwordHash,
        translations: { create: translationsToCreate },
      },
    });

    return res.status(201).json({
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

export const updateStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const {
      translations,
      dateOfBirth,
      email,
      personalId,
      class: classNumber,
    } = req.body as UpdateStudentDTO;

    const sameStudent = await prisma.student.count({
      where: {
        email,
        personalId,
        id: {
          not: id,
        },
      },
    });
    if (sameStudent) {
      return sendError(req, res, 400, "userAlreadyExists");
    }

    let age: number | null;
    try {
      age = calculateAge(dateOfBirth);
    } catch {
      return sendError(req, res, 400, "invalidDateOfBirth");
    }

    const translationsToCreate = Prisma.validator<
      Prisma.StudentTranslationCreateWithoutStudentInput[]
    >()(createTranslations(translations) as any);

    const findStudent = await prisma.student.findUnique({
      where: {
        id,
      },
    });

    if (!findStudent) {
      return sendError(req, res, 404, "userNotFound");
    }

    const student = await prisma.student.update({
      where: {
        id,
      },
      data: {
        translations: {
          deleteMany: {},
          create: translationsToCreate,
        },
        age,
        ...(!!classNumber ? { class: classNumber } : {}),
        dateOfBirth,
        email,
        personalId,
      },
    });

    return res.json({
      data: student,
    });
  } catch (error) {
    next(error);
  }
};
