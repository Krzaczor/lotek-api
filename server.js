import mongoose from 'mongoose';
import dotenv from 'dotenv';
import detect from 'detect-port';
import app from './src/app';

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || 'localhost';

const connect = async (ip, port, dbname) => {
    await mongoose.connect(`mongodb://${ip}:${port}/${dbname}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });

    const listener = app.listen(app.get('port'), () => {
        console.log(`server http://${HOST}:${listener.address().port} started`);
    });
}

const setPort = async () => {
    app.set('port', process.env.PORT || await detect(DEFAULT_PORT));
}

mongoose.Promise = global.Promise;

dotenv.config();
setPort();
connect(process.env.DB_IP, process.env.DB_POST, process.env.DB_NAME);