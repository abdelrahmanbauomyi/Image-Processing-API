import express from 'express';
import img_router from './routes/mainroute';
const app = express();
const port = 3000;
app.listen(port, () => {
  console.log(`listening on port :${port}`);
});
app.use('/api', img_router);
app.get('/api', (req: express.Request, res: express.Response): void => {
  res.send(
    'please use " locahost3000/api/imgs?filename=(name of the photo) & width =(desiered width) & height = (desiered height) " '
  );
});
export default app;
