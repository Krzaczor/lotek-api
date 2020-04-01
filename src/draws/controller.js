import express from 'express';
import Draws from './model';
import * as drawsMethods from './method';

const api = express.Router();

api.get('/', async ({ res }) => {
    try {
        const draws = await Draws.find({}).select('id time numbers  -_id').sort({ time: 'desc' });
        res.status(200).json(draws);

    } catch (error) {
        res.status(502).json({
            message: error.message
        });
    }
});

api.get('/:id', async (req, res) => { })

api.post('/', async (req, res) => { });

export default api;