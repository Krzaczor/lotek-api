import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import drawsController from './draws/controller';
import numbersController from './numbers/controller';

const app = express();
const optionsCors = {
    origin: 'http://localhost:3001',
    methods: 'GET',
    exposedHeaders: 'Content-Length'
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/draws', cors(optionsCors), drawsController);
app.use('/numbers', cors(optionsCors), numbersController);

module.exports = app;
