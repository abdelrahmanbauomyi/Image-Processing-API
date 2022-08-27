import { NextFunction, Request, Response } from 'express';
import sharp from 'sharp';
import path from 'path';

async function resizeImg(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const filename: string = req.query.filename as string;
    const width: number = parseInt(req.query.width as unknown as string);
    const height: number = parseInt(req.query.height as unknown as string);
    // resizing using sharp
    await sharp(path.resolve(`./imgs/${filename}.jpg`))
      .resize({
        width: width, //assign new width
        height: height, //assign new hight
      })
      .toFile(path.resolve(`./cached/${filename}${width}${height}.jpg`)); //save to be cached
    console.log('Reszing done');
    res.sendFile(path.resolve(`./cached/${filename}${width}${height}.jpg`)); //send the cached img
  } catch (err) {
    console.log(err);
  }
}

export default resizeImg;
