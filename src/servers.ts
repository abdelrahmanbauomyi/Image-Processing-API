import  express  from "express";
import img_router from "./routes/mainroute";
const app  = express()
const port:number = 8000;
app.listen(port,()=>{
    console.log(`listening on port :${port}`);
})
app.use('/api',img_router);
