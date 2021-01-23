import express from 'express';
import { asyncFn } from '../middlewares/errors';
import { authJWT, authLocal } from '../middlewares/auth';
import * as Users from './methods';

const api = express.Router();

api.post('/register', authJWT, asyncFn(async (req, res, next) => {
    await Users.create(req.body);

    res.status(201).json({
        message: 'utworzono nowego użytkownika'
    })
}));

api.post('/login', authLocal, (req, res) => {
    if (req.user) {
        const token = Users.login(req.user.id)
        res.status(200).json({ token })
    } else {
        req.status(401).json({ message: 'chujnia' })
    }
});

api.get('/veryfication', authJWT, asyncFn(async (req, res) => {
    res.status(200).json({ success: true });
}));

api.get('/logout', asyncFn(async (req, res) => {
    req.logout();
    res.status(200).json({
        message: 'wylogowano.'
    })
}));

export default api;
