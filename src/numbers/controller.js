import express from 'express';
import * as Numbers from './methods';
import { allNumbers } from '../setting';

const api = express.Router();

api.get('/', async ({ res }) => {
    try {
        res.status(200).json(allNumbers);

    } catch (error) {
        res.status(502).json({
            message: error.message
        });
    }
});

api.get('/:number', async (req, res) => {
    const number = Number(req.params.number);

    try {
        const draws = await Numbers.find({ number, limit: 100 });
        const count = await Numbers.find({ number }).countDocuments();

        res.status(200).json({
            number,
            count,
            draws
        });

    } catch (error) {
        res.status(502).json({
            message: error.message
        });
    }
})

// api.get('/:value/count', async (req, res) => {
//     const value = Number(req.params.value);

//     try {
//         const draws = await Numbers.find(value).countDocuments();

//         res.status(200).json({
//             number: value,
//             count: draws
//         });

//     } catch (error) {
//         res.status(502).json({
//             message: error.message
//         });
//     }
// })

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