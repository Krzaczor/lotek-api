import mongoose from 'mongoose';
import dotenv from 'dotenv';
import passport from './src/helpers/strategy';
import app from './src/app';

dotenv.config({ path: '.env' });

const connect = async (ip, port, dbname) => {
    const linkToDB = `mongodb://${ip}:${port}/${dbname}`;

    await mongoose.connect(linkToDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });

    const listener = app.listen(app.get('port'), () => {
        const link = `http://localhost:${listener.address().port}`;
        console.log(`server ${link} started`);
    });
}

const setPort = () => {
    app.set('port', process.env.PORT || 3001);
}

mongoose.Promise = global.Promise;

passport();
setPort();
connect(process.env.DB_IP, process.env.DB_POST, process.env.DB_NAME);