import express from 'express';
import { find, findFirst } from '../methods';
import { asyncFn } from '../../middlewares/errors';
import filterParams from '../../middlewares/filters/params';

const drawsUserRoutes = express.Router();

drawsUserRoutes.get('/', filterParams('user'), asyncFn(async (req, res) => {
    const result = await find(req.query);

    if (result.hasNext) {
        res.set('Next', `${req.baseUrl}?year=${result.next.year}&month=${result.next.month}`);
    }

    if (result.total !== undefined) {
        res.set('Content-Range', `draws */${result.total}`);
    }

    res.status(200).json(result.results);
}));

drawsUserRoutes.get('/first', asyncFn(async (req, res) => {
    const draw = await findFirst();

    res.status(200).json(draw);
}));

export default drawsUserRoutes;
