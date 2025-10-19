import { prisma } from "@/config";
import { NextFunction, Response, Request } from "express";
import {
  sendError,
  generateWhereInput,
  getPaginationAndFilters,
} from "@/utils";
import { Prisma } from "@prisma/client";

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
      age: "insensitive",
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
