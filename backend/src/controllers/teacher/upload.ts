import multer from "multer";
import { Request, Response, NextFunction } from "express";
import fs from "fs";
import { getResponseMessage, sendError } from "@/utils";
import path from "path";

const getUploadsFolder = (req: Request) => {
  const folder = req.query.folder || "";
  const uploadPath = path.join("uploads", folder as string);

  try {
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
  } catch {
    throw new Error("Failed to create upload directory");
  }

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  const upload = multer({ storage: storage });

  return upload;
};

export const uploadImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const upload = getUploadsFolder(req);

    upload.single("file")(req, res, (err) => {
      if (err) {
        return sendError(req, res, 500, "invalidImage");
      }

      res.status(200).json({
        message: getResponseMessage("imageUploaded"),
        file: req.file,
      });
    });
  } catch (err) {
    next(err);
  }
};

export const uploadImages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const upload = getUploadsFolder(req);

    upload.array("files")(req, res, (err) => {
      if (err) {
        return sendError(req, res, 500, "invalidImage");
      }

      res.status(200).json({
        message: getResponseMessage("imageUploaded"),
        files: req.files,
      });
    });
  } catch (err) {
    next(err);
  }
};
