import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const ip = process.env.DB_IP;
const port = process.env.DB_POST;
const dbName = process.env.DB_NAME;

const connect = () => {
    mongoose.connect(`mongodb://${ip}:${port}/${dbName}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
};


export default {
    connect
}
