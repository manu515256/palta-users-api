import express,{Application} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import router from './routes';
import mongoStart from './database';
import dotenv from 'dotenv';
dotenv.config()


const app:Application = express();

app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/api/v1',router);

mongoStart();
app.listen(3100, ()=> console.log("Servidor corriendo en puerto 3100"));