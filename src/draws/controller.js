import express from 'express';
import * as drawsMethods from './methods';
import { asyncFn } from '../middlewares/errors';
import { authJWT } from '../middlewares/auth';
import { bodyFilter } from '../middlewares/filters/body';
import { paramFilter } from '../middlewares/filters/param';
import bodyValidate from '../middlewares/validators/body';

const api = express.Router();

/**
 * @Route("/draws")
 * @Method("GET")
 * @Params(["year", "month"])
 * 
 * return object[]
 * 
 * Get list draws beatween two date. If are't draws find older.
 */
api.get('/', paramFilter, asyncFn(async (req, res) => {
    let draws = null;

    do {
        const result = await drawsMethods.findAll({
            year: draws?.next?.year || req.query.year || null,
            month: draws?.next?.month || req.query.month || null
        });

        draws = result;
    } while (draws.results.length === 0 && draws.hasNext);

    if (draws.hasNext) {
        res.set('Next', `${req.baseUrl}?year=${draws.next.year}&month=${draws.next.month}`);
    }

    console.log(`${req.protocol}://${req.get('host')}${req.baseUrl}?year=${draws.next.year}&month=${draws.next.month}`);


    res.status(200).json(draws.results);
}));

/**
 * @Route("/draws/first")
 * @Method("GET")
 * 
 * return Object[]
 * 
 * Get newset draw from all draws.
 */
api.get('/first', asyncFn(async (req, res) => {
    const draw = await drawsMethods.findFirst();

    res.status(200).json(draw);
}));

/**
 * @Route("/draws/:id")
 * @Method("GET")
 * @Params("id")
 * 
 * return Object
 * 
 * Get once draw with id as param.
 */
api.get('/:id', asyncFn(async (req, res) => {
    const id = req.params.id.toString();
    const draw = await drawsMethods.findOne(id);

    if (!draw) next();

    res.status(200).json(draw);
}));

/**
 * @Route("/draws")
 * @Method("POST")
 * @Body(Object[])
 * 
 * return Object
 * 
 * Create new draw.
 */
api.post('/', [authJWT, bodyFilter], asyncFn(async (req, res) => {
    const newDraw = await bodyValidate(req.body);
    const draw = await drawsMethods.create(newDraw);

    if (!draw) next();

    res.status(201).json(draw);
}));


export default api;
