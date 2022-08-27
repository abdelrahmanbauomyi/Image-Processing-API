import { NextFunction, Request, Response } from 'express';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
async function validate(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const filename: string = req.query.filename as string;
    const width: number = parseInt(req.query.width as unknown as string);
    const height: number = parseInt(req.query.height as unknown as string);
    //check cached folder
    if (fs.existsSync(path.resolve(`./imgs/${filename}.jpg`))) {
      if (
        fs.existsSync(path.resolve(`./cached/${filename}${width}${height}.jpg`))
      ) {
        res.sendFile(path.resolve(`./cached/${filename}${width}${height}.jpg`));
      } else {
        next();
      }
    } else {
      res.send("Image doesn't exsist in the database");
    }

    //image doesn't exsist
  } catch (error) {
    console.log(`An error occurred during processing: ${error}`);
  }
}

export default validate;
