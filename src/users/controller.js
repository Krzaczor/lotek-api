import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

import { asyncFn } from '../middlewares/errors';
import * as Users from './methods';

const api = express.Router();

api.post('/register', asyncFn(async (req, res, next) => {
    await Users.create(req.body);

    res.status(201).json({
        message: 'utworzono nowego użytkownika'
    })
}));

api.post('/login', passport.authenticate('local', { session: false }), asyncFn(async (req, res) => {
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_KEY, { expiresIn: 60 });

    res.json({ token })
}));

api.get('/logout', asyncFn(async (req, res) => {

}));

export default api;