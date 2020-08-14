import express from 'express';
import passport from 'passport';
import cors from 'cors';
import bodyParser from 'body-parser';
import { notFound, errorMessage } from './middlewares/errors';
import drawsController from './draws/controller';
import usersController from './users/controller';

const app = express();

app.disable('x-powered-by');
app.disable('etag');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

const CORS = cors({
    origin: '*',
    methods: 'GET,POST',
    exposedHeaders: 'Next'
});

app.use('/draws', CORS, drawsController);

app.use('/auth', CORS, usersController);

app.use(notFound);
app.use(errorMessage);

module.exports = app;
