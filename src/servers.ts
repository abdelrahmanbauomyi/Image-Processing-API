import express from 'express';
import img_router from './routes/mainroute';
const app = express();
const port = 8000;
app.listen(port, () => {
  console.log(`listening on port :${port}`);
});
app.use('/api', img_router);
app.get('/api', (req, res) => {
  res.send(
    'please use " locahost8000/api/imgs?filename=(name of the photo) & width =(desiered width) & height = (desiered height) " '
  );
});
export default app;
