import { prisma } from "@/config";
import { NextFunction, Response, Request } from "express";

export const fetchDashboard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const studentId = req.user.id;

    const studentStatistic = await prisma.studentStatistic.findUnique({
      where: {
        studentId_month_year: {
          studentId,
          month,
          year,
        },
      },
    });

    const totalTasks = await prisma.task.count({ where: { studentId } });
    const completedTasks = await prisma.task.count({
      where: { studentId, completed: true },
    });
    const totalFlashcards = await prisma.flashcard.count({
      where: { studentId },
    });
    const totalQuizzes = await prisma.quizResult.count({
      where: { studentId },
    });
    const averageQuizScore = await prisma.quizResult.aggregate({
      where: { studentId },
      _avg: { score: true },
    });
    const passedTests = await prisma.quizResult.count({
      where: { studentId, score: { gte: 50 } },
    });
    const weekAgo = new Date();
    weekAgo.setDate(now.getDate() - 7);
    const weekProgress = await prisma.quizResult.aggregate({
      where: {
        studentId,
        createdAt: { gte: weekAgo, lte: now },
      },
      _avg: { score: true },
    });

    return res.status(200).json({
      data: {
        studentStatistic,
        totalTasks,
        completedTasks,
        totalFlashcards,
        totalQuizzes,
        averageQuizScore: averageQuizScore._avg.score || 0,
        passedTests,
        weekProgress: weekProgress._avg.score || 0,
      },
    });
  } catch (error) {
    next(error);
  }
};
