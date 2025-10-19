import { prisma } from "@/config";
import { NextFunction, Response, Request } from "express";
import {
  sendError,
  generateWhereInput,
  getPaginationAndFilters,
  getResponseMessage,
} from "@/utils";
import { Prisma } from "@prisma/client";
import {
  CreateQuizDTO,
  CreateQuizResultDTO,
  UpdateQuizDTO,
  UpdateQuizResultDTO,
} from "@/types/teacher";

export const fetchQuizzes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { skip, take, orderBy, search } = getPaginationAndFilters(req);
    const teacherId = req.user.id;

    const where = generateWhereInput<Prisma.QuizWhereInput>(
      search,
      {
        code: "insensitive",
        semester: "insensitive",
      },
      {
        group: {
          id,
          teacherId,
        },
        date: {
          gte: new Date(),
        },
      }
    );

    const [guizzes, count] = await Promise.all([
      prisma.quiz.findMany({
        where,
        skip,
        take,
        orderBy,
        include: {
          group: {
            include: {
              academicCalendar: true,
            },
          },
          subject: {
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
          },
        },
      }),
      prisma.quiz.count({ where }),
    ]);

    return res.status(200).json({ data: guizzes, count });
  } catch (error) {
    next(error);
  }
};

export const fetchQuiz = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const teacherId = req.user.id;

    const quiz = await prisma.quiz.findUnique({
      where: {
        id,
        group: {
          teacherId,
        },
      },
      include: {
        group: {
          include: {
            academicCalendar: true,
          },
        },
        subject: {
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
        },
      },
    });

    if (!quiz) {
      return sendError(req, res, 404, "quizNotFound");
    }

    return res.status(200).json({ data: quiz });
  } catch (error) {
    next(error);
  }
};

export const deleteQuiz = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const quiz = await prisma.quiz.delete({
      where: {
        id,
      },
    });

    if (!quiz) {
      return sendError(req, res, 404, "quizNotFound");
    }

    return res.status(200).json({
      message: getResponseMessage("quizDeleted"),
    });
  } catch (error) {
    next(error);
  }
};

export const createQuiz = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { date, groupId, subjectId, title } = req.body as CreateQuizDTO;

    const quiz = await prisma.quiz.create({
      data: {
        date: new Date(date),
        title,
        group: {
          connect: { id: groupId },
        },
        subject: { connect: { id: subjectId } },
      },
    });

    return res.status(201).json({
      data: quiz,
    });
  } catch (error) {
    next(error);
  }
};

export const updateQuiz = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { date, groupId, subjectId, title } = req.body as UpdateQuizDTO;

    const findQuiz = await prisma.quiz.findUnique({
      where: { id },
    });
    if (!findQuiz) {
      return sendError(req, res, 404, "quizNotFound");
    }

    const updatedQuiz = await prisma.quiz.update({
      where: { id },
      data: {
        date: new Date(date),
        groupId,
        subjectId,
        title,
      },
    });

    return res.json({
      data: updatedQuiz,
    });
  } catch (error) {
    next(error);
  }
};

export const fetchQuizResults = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { quizId } = req.params;
    const { skip, take, orderBy, search } = getPaginationAndFilters(req);

    const where = generateWhereInput<Prisma.QuizResultWhereInput>(
      search,
      {},
      {
        quizId,
      }
    );

    const [results, count] = await Promise.all([
      prisma.quizResult.findMany({
        where,
        skip,
        take,
        orderBy,
        include: {
          quiz: {
            include: {
              group: true,
              subject: true,
            },
          },
          student: true,
        },
      }),
      prisma.quizResult.count({ where }),
    ]);

    return res.status(200).json({ data: results, count });
  } catch (error) {
    next(error);
  }
};

export const fetchQuizResult = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const quizResult = await prisma.quizResult.findUnique({
      where: { id },
      include: {
        quiz: {
          include: {
            group: true,
            subject: true,
          },
        },
        student: true,
      },
    });

    if (!quizResult) {
      return sendError(req, res, 404, "quizResultNotFound");
    }

    return res.status(200).json({ data: quizResult });
  } catch (error) {
    next(error);
  }
};

export const deleteQuizResult = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const quizResult = await prisma.quizResult.delete({
      where: { id },
    });

    if (!quizResult) {
      return sendError(req, res, 404, "quizResultNotFound");
    }

    return res.status(200).json({
      message: getResponseMessage("quizResultDeleted"),
    });
  } catch (error) {
    next(error);
  }
};

export const createQuizResult = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { quizId, score, studentId } = req.body as CreateQuizResultDTO;

    const quizResult = await prisma.quizResult.create({
      data: {
        quizId,
        studentId,
        score,
      },
    });

    return res.status(201).json({
      data: quizResult,
    });
  } catch (error) {
    next(error);
  }
};

export const updateQuizResult = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { quizId, score, studentId } = req.body as UpdateQuizResultDTO;

    const findQuizResult = await prisma.quizResult.findUnique({
      where: { id },
    });
    if (!findQuizResult) {
      return sendError(req, res, 404, "quizResultNotFound");
    }

    const updatedQuizResult = await prisma.quizResult.update({
      where: { id },
      data: {
        quizId,
        studentId,
        score,
      },
    });

    return res.json({
      data: updatedQuizResult,
    });
  } catch (error) {
    next(error);
  }
};
