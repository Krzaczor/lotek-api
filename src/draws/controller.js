import express from 'express';
import * as drawsMethods from './methods';
import isDevelopment from '../helpers/development';
import { asyncFn, validProps } from '../middlewares/errors';
import { bodyFilter } from '../middlewares/filters/body';
import bodyValidate from '../middlewares/validators/body';

const api = express.Router();

api.get('/', asyncFn(async ({ res }) => {
    const draws = await drawsMethods.findAll();

    res.status(200).json(draws);
}));

api.get('/:id', asyncFn(async (req, res) => {
    const id = req.params.id.toString();
    const draw = await drawsMethods.find(id) || [];

    res.status(200).json(draw)
}));

if (isDevelopment()) {
    api.post('/', bodyFilter, asyncFn(async (req, res) => {
        const newDraw = await bodyValidate(req.body);
        const draw = await drawsMethods.create(newDraw);

        res.status(201).json(draw);
    }));
}

export default api;