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
    if (fs.existsSync(path.resolve(`./cached/${filename}`))) {
      const metadata_Cached = await sharp(`cached/${filename}`).metadata();
      if (metadata_Cached.width == width && metadata_Cached.height == height) {
        res.sendFile(path.resolve(`./cached/${filename}`));
      } else {
        //file exsist but needs resizing
        next();
      }
    }
    //check imgs folder
    else if (fs.existsSync(path.resolve(`./imgs/${filename}`))) {
      const metadata_Imgs = await sharp(`imgs/${filename}`).metadata();
      if (metadata_Imgs.width == width && metadata_Imgs.height == height) {
        res.sendFile(path.resolve(`./imgs/${filename}`));
      } else {
        //file exsist but needs resizing
        next();
      }
    }

    //image doesn't exsist
    else {
      res.send("Not a listed img,File doesn't exsist");
    }
  } catch (error) {
    console.log(`An error occurred during processing: ${error}`);
  }
}

export default validate;
