import mongoose from 'mongoose';
import dotenv from 'dotenv';
import routes from './src/routes';
import app from './src/app';
import bodyParser from 'body-parser';
import cors from 'cors';

app.set('port', process.env.PORT || 8080);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/draws', routes.draws);

dotenv.config();

const connect = async (ip, port, dbname) => {
    await mongoose.connect(`mongodb://${ip}:${port}/${dbname}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });

    app.listen(app.get('port'), () => {
        console.log('server start');
    });
}

connect(
    process.env.DB_IP,
    process.env.DB_POST,
    process.env.DB_NAME
)


