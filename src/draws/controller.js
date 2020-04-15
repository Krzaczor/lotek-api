import express from 'express';
import * as drawsMethods from './methods';
import isDevelopment from '../helpers/development';
import { bodyFilter } from '../middlewares/filters/body';
import { bodyValidate } from '../middlewares/validators/body';

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
        try {
            const { error, value } = bodyValidate(req.body);

            console.log(error, value);
            // const result = await drawsMethods.create(value);
            const result = 'jfidjfso';
            res.status(201).json(result);

        } catch (error) {
            res.json({
                message: error.message
            });
        }
    });
}


export default api;