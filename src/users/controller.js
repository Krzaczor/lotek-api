import express from 'express';
import { asyncFn } from '../middlewares/errors';
import { authJWT, authLocal } from '../middlewares/auth';
import * as Users from './methods';

const api = express.Router();

/**
 * @Route("/auth/register")
 * @Method("POST")
 * @Body(["username", "password"])
 * 
 * return Object
 * 
 * register new user and return message.
 */
api.post('/register', authJWT, asyncFn(async (req, res, next) => {
    await Users.create(req.body);

    res.status(201).json({
        message: 'utworzono nowego użytkownika'
    })
}));

/**
 * @Route("/auth/login")
 * @Method("POST")
 * @Body()
 * 
 * return Object
 * 
 * login user and return token or message fail.
 */
api.post('/login', authLocal, (req, res) => {
    if (req.user) {
        const token = Users.login(req.user.id)
        res.status(200).json({ token })
    } else {
        req.status(401).json({ message: 'chujnia' })
    }

});

/**
 * @Route("/auth/veryfication")
 * @Method("GET")
 * @Headers("Authorization")
 * 
 * return Object
 * 
 * checks if the user is logged in and if it exists.
 */
api.get('/veryfication', authJWT, asyncFn(async (req, res) => {
    res.status(200).json({ success: true });
}));

/**
 * @Route("/auth/logout")
 * @Method("GET")
 * 
 * return Object
 * 
 * logout user.
 */
api.get('/logout', asyncFn(async (req, res) => {
    req.logout();
    res.status(200).json({
        message: 'wylogowano użytkownika'
    })
}));

export default api;