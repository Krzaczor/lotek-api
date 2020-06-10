import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { notFound, errorMessage } from './middlewares/errors';
import drawsController from './draws/controller';

const app = express();
const optionsCors = {
    origin: '*',
    methods: 'GET',
    exposedHeaders: 'next'
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/draws', cors(optionsCors), drawsController);

app.use(notFound);
app.use(errorMessage);

module.exports = app;
