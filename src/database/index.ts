import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()

const mongoStart = () =>{
    const dbUrl:any = process.env.DBURL;

    mongoose.Promise = global.Promise;
    mongoose.connect(dbUrl, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
    .then(mongoose =>{console.log('DB connected on port 27017')})
    .catch(err => console.log(err));
}


export default mongoStart;