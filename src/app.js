import passport from 'passport';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { notFound, errorMessage } from './middlewares/errors';
import drawsUserControllers from './draws/user/controllers';
import drawsAdminControllers from './draws/admin/controllers';
import usersController from './users/controllers';

const app = express();

app.disable('x-powered-by');
app.disable('etag');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());

app.use('/draws', cors({
    origin: '*',
    methods: 'GET',
    exposedHeaders: 'Next, Content-Range'
}), drawsUserControllers);

app.use('/admin/draws', cors({
    origin: '*',
    methods: 'GET, POST, PUT, DELETE',
    exposedHeaders: 'Content-Range'
}), drawsAdminControllers);

app.use('/auth', cors({
    origin: '*',
    methods: 'GET, POST'
}), usersController);

app.use(notFound);
app.use(errorMessage);

export default app;
