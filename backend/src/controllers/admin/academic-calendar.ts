import { prisma } from "@/config";
import { NextFunction, Response, Request } from "express";
import {
  getResponseMessage,
  sendError,
  generateWhereInput,
  getPaginationAndFilters,
} from "@/utils";
import { Prisma } from "@prisma/client";
import {
  CreateAcademicCalendarDTO,
  UpdateAcademicCalendarDTO,
} from "@/types/admin";

export const fetchAcademicCalendars = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { skip, take, orderBy, search } = getPaginationAndFilters(req);

    const where = generateWhereInput<Prisma.AcademicCalendarWhereInput>(
      search,
      {
        year: "insensitive",
        semester: "insensitive",
      }
    );

    const [academicCalendars, count] = await Promise.all([
      prisma.academicCalendar.findMany({
        where,
        skip,
        take,
        orderBy,
      }),
      prisma.academicCalendar.count({ where }),
    ]);

    return res.status(200).json({ data: academicCalendars, count });
  } catch (error) {
    next(error);
  }
};

export const fetchAcademicCalendar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const academicCalendar = await prisma.academicCalendar.findUnique({
      where: {
        id,
      },
    });

    if (!academicCalendar) {
      return sendError(req, res, 404, "academicCalendarNotFound");
    }

    return res.status(200).json({ data: academicCalendar });
  } catch (error) {
    next(error);
  }
};

export const deleteAcademicCalendar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const academicCalendar = await prisma.academicCalendar.delete({
      where: {
        id,
      },
    });

    if (!academicCalendar) {
      return sendError(req, res, 404, "academicCalendarNotFound");
    }

    return res.status(200).json({
      message: getResponseMessage("academicCalendarDeleted"),
    });
  } catch (error) {
    next(error);
  }
};

export const createAcademicCalendar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { year, semester, startDate, endDate } =
      req.body as CreateAcademicCalendarDTO;

    const sameAcademicCalendar = await prisma.academicCalendar.count({
      where: {
        year,
        semester,
      },
    });
    if (sameAcademicCalendar) {
      return sendError(req, res, 400, "academicCalendarAlreadyExists");
    }

    const academicCalendar = await prisma.academicCalendar.create({
      data: {
        year,
        semester,
        startDate,
        endDate,
      },
    });

    return res.status(201).json({
      data: academicCalendar,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAcademicCalendar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const { year, semester, startDate, endDate } =
      req.body as UpdateAcademicCalendarDTO;

    const sameAcademicCalendar = await prisma.academicCalendar.count({
      where: {
        year,
        semester,
        id: {
          not: id,
        },
      },
    });
    if (sameAcademicCalendar) {
      return sendError(req, res, 400, "academicCalendarAlreadyExists");
    }

    const findAcademicCalendar = await prisma.academicCalendar.findUnique({
      where: {
        id,
      },
    });

    if (!findAcademicCalendar) {
      return sendError(req, res, 404, "academicCalendarNotFound");
    }

    const academicCalendar = await prisma.academicCalendar.update({
      where: {
        id,
      },
      data: {
        year,
        semester,
        startDate,
        endDate,
      },
    });

    return res.json({
      data: academicCalendar,
    });
  } catch (error) {
    next(error);
  }
};
