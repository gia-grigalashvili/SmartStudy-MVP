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
import { CreateSubjectDTO, UpdateSubjectDTO } from "@/types/admin";

export const fetchSubjects = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { skip, take, orderBy, search } = getPaginationAndFilters(req);

    const where = generateWhereInput<Prisma.SubjectWhereInput>(search, {
      "translations.some.name": "insensitive",
      code: "insensitive",
    });

    const [subjects, count] = await Promise.all([
      prisma.subject.findMany({
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
      prisma.subject.count({ where }),
    ]);

    return res.status(200).json({ data: subjects, count });
  } catch (error) {
    next(error);
  }
};

export const fetchSubject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const subject = await prisma.subject.findUnique({
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

    if (!subject) {
      return sendError(req, res, 404, "userNotFound");
    }

    return res.status(200).json({ data: subject });
  } catch (error) {
    next(error);
  }
};

export const deleteSubject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const subject = await prisma.subject.delete({
      where: {
        id,
      },
    });

    if (!subject) {
      return sendError(req, res, 404, "userNotFound");
    }

    return res.status(200).json({
      message: getResponseMessage("userDeleted"),
    });
  } catch (error) {
    next(error);
  }
};

export const createSubject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { translations, code } = req.body as CreateSubjectDTO;

    const sameSubject = await prisma.subject.count({
      where: {
        code,
      },
    });
    if (sameSubject) {
      return sendError(req, res, 400, "userAlreadyExists");
    }

    const translationsToCreate = Prisma.validator<
      Prisma.SubjectTranslationCreateWithoutSubjectInput[]
    >()(createTranslations(translations) as any);

    const subject = await prisma.subject.create({
      data: {
        code,
        translations: { create: translationsToCreate },
      },
    });

    return res.status(201).json({
      data: subject,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSubject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const { translations, code } = req.body as UpdateSubjectDTO;

    const sameSubject = await prisma.subject.count({
      where: {
        code,
        id: {
          not: id,
        },
      },
    });
    if (sameSubject) {
      return sendError(req, res, 400, "userAlreadyExists");
    }

    const translationsToCreate = Prisma.validator<
      Prisma.SubjectTranslationCreateWithoutSubjectInput[]
    >()(createTranslations(translations) as any);

    const findSubject = await prisma.subject.findUnique({
      where: {
        id,
      },
    });

    if (!findSubject) {
      return sendError(req, res, 404, "userNotFound");
    }

    const subject = await prisma.subject.update({
      where: {
        id,
      },
      data: {
        translations: {
          deleteMany: {},
          create: translationsToCreate,
        },
        code,
      },
    });

    return res.json({
      data: subject,
    });
  } catch (error) {
    next(error);
  }
};
