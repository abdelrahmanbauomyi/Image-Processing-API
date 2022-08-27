import express from 'express';
import sharp from 'sharp';
 import validate from '../middelwears/validation';
 import resizeImg from '../middelwears/resizing';
const img_router =express.Router();
img_router.get('/imgs',validate,resizeImg,(req,res)=>{
    
})
export default img_router;
