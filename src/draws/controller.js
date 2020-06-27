import express from 'express';
import * as drawsMethods from './methods';
import isDevelopment from '../helpers/development';
import { asyncFn } from '../middlewares/errors';
import { bodyFilter } from '../middlewares/filters/body';
import { paramFilter } from '../middlewares/filters/param';
import bodyValidate from '../middlewares/validators/body';

const api = express.Router();

api.get('/', paramFilter, asyncFn(async (req, res) => {
    const draws = await drawsMethods.findAll({
        year: req.query.year || null,
        month: req.query.month || null
    });

    if (draws.hasNext) {
        res.set('next', `${req.protocol}://${req.get('host')}${req.baseUrl}?year=${draws.next.year}&month=${draws.next.month}`);
    }

    res.status(200).json(draws.results);
}));

api.get('/first', asyncFn(async (req, res) => {
    const draw = await drawsMethods.findFirst();

    res.status(200).json(draw);
}));

api.get('/:id', asyncFn(async (req, res) => {
    const id = req.params.id.toString();
    const draw = await drawsMethods.findOne(id);

    if (!draw) next();

    res.status(200).json(draw);
}));

if (isDevelopment()) {
    api.post('/', bodyFilter, asyncFn(async (req, res) => {
        const newDraw = await bodyValidate(req.body);
        const draw = await drawsMethods.create(newDraw);

        // if (!draw) next();

        res.status(201).json(draw);
    }));
}

export default api;