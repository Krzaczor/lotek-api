import express from 'express';
import * as drawsMethods from './methods';
import isDevelopment from '../helpers/development';
import { bodyFilter } from '../middlewares/filter/body';

const api = express.Router();

api.get('/', async ({ res }) => {
    try {
        const draws = await drawsMethods.findAll();
        res.status(200).json(draws);

    } catch (error) {
        res.json({
            message: error
        });
    }
});

api.get('/:id', async (req, res) => {
    const id = Number(req.params.id);

    try {
        const draw = await drawsMethods.find(id);
        res.json(draw)

    } catch (error) {
        res.json({
            message: error.message
        });
    }
})

if (isDevelopment()) {
    api.post('/', bodyFilter, async (req, res) => {
        const draw = req.body;

        try {
            const result = await drawsMethods.create(draw);
            res.status(201).json(result);

        } catch (error) {
            res.json({
                message: error.message
            });
        }
    });
}


export default api;