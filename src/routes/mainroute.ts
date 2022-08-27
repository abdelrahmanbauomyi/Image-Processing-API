import express from 'express';
import validate from '../middelwears/validation';
import resizeImg from '../middelwears/resizing';
const img_router = express.Router();
img_router.get('/imgs', validate, resizeImg, (req, res) => {
  console.log('router working');
});
export default img_router;
