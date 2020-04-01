import mongoose from 'mongoose';
import dotenv from 'dotenv';
import drawsController from './src/draws/controller';
import numbersController from './src/numbers/controller';
import app from './src/app';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config();

app.set('port', process.env.PORT || 8080);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/draws', drawsController);
app.use('/numbers', numbersController);

(async (ip, port, dbname) => {
    await mongoose.connect(`mongodb://${ip}:${port}/${dbname}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });

    app.listen(app.get('port'), () => {
        console.log('server start');
    });
})(
    process.env.DB_IP,
    process.env.DB_POST,
    process.env.DB_NAME
);
