import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './src/app';

const connect = (ip, port, dbname) => {
    mongoose.connect(`mongodb://${ip}:${port}/${dbname}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });

    const listener = app.listen(app.get('port'), () => {
        console.log(`server http://localhost:${listener.address().port} started`);
    });
}

mongoose.Promise = global.Promise;

dotenv.config();
app.set('port', process.env.PORT || 3000);
connect(process.env.DB_IP, process.env.DB_POST, process.env.DB_NAME);
