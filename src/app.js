import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { notFound, errorMessage } from './middlewares/errors';
import drawsController from './draws/controller';
import usersController from './users/controller';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const origin = '*';

app.use('/draws', cors({
    origin,
    methods: 'GET POST',
    exposedHeaders: 'next'
}), drawsController);

app.use('/auth', cors({
    origin,
    methods: 'GET POST'
}), usersController);

app.use(notFound);
app.use(errorMessage);

module.exports = app;
