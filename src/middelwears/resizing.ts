import { NextFunction ,Request,Response } from 'express';
import sharp from 'sharp';
import path from 'path'
import fs from 'fs'

async function resizeImg(req:Request,res:Response,next:NextFunction) {
    try{
    const filename = req.query.filename;
    let width :number  = parseInt(req.query.width as unknown as string) ;
    let height :number = parseInt(req.query.hight as unknown as string) ;
        

        await sharp(path.resolve(`./imgs/${filename}`))
        .resize({
          width: width  ,
          height: height 
        })
        .toFile(path.resolve(`./cached/${filename}`))
        console.log("done");
        res.sendFile(path.resolve(`./cached/${filename}`))
      }  
      catch(err){
        console.log(err);
      }
    }

export default resizeImg;