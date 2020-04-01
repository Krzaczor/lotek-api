import express from 'express';
import * as Numbers from './method';
import { allNumbers } from '../setting';

const api = express.Router();

api.get('/', async ({ res }) => {
    try {
        const numbers = await Promise.all(allNumbers.map(async number => {
            const count = await Numbers.find(number).countDocuments();

            return { number, count };
        }));

        res.status(200).json(numbers);

    } catch (error) {
        res.status(502).json({
            message: error.message
        });
    }
});

api.get('/:value', async (req, res) => {
    const value = Number(req.params.value);

    try {
        const draws = await Numbers.find(value);

        res.status(200).json({
            number: value,
            count: draws.length,
            draws
        });

    } catch (error) {
        res.status(502).json({
            message: error.message
        });
    }
})

// api.post('/', async (req, res) => {
//     let draws = req.body;

//     if (Array.isArray(draws)) {
//         draws = draws.map(draw => ({ ...draw, id: draw.time }));
//     } else {
//         draws = { ...draws, id: draws.time };
//     }

//     try {
//         const result = await drawsMethods.setDarws(draws);

//         res.status(201).json(result);

//     } catch (error) {
//         res.json({
//             message: error.message
//         })
//     }
// });

export default api;