import express from 'express';
import * as drawsMethods from '../methods';
import { asyncFn } from '../../middlewares/errors';
import { authJWT } from '../../middlewares/auth';
import filterBody from '../../middlewares/filters/body';
import filterParams from '../../middlewares/filters/params';
import validateBody from '../../middlewares/validators/body';

const drawsAdminRoutes = express.Router();

drawsAdminRoutes.get('/', [authJWT, filterParams('admin')], asyncFn(async (req, res) => {
    const draws = await drawsMethods.show(req.query);

    res.set('Content-Range', 'draws 0-10/30');
    res.set('Access-Control-Expose-Headers', 'Content-Range');

    res.status(200).json(draws);
}));

drawsAdminRoutes.get('/:id', asyncFn(async (req, res) => {
    const id = req.params.id.toString();
    const draw = await drawsMethods.findOne(id);

    if (!draw) next();

    res.status(200).json(draw);
}));

drawsAdminRoutes.post('/', [authJWT, filterBody], asyncFn(async (req, res) => {
    const newDraw = await validateBody(req.body);
    const draw = await drawsMethods.create(newDraw);

    if (!draw) next();

    res.status(201).json(draw);
}));

drawsAdminRoutes.put('/:id', [authJWT], asyncFn(async (req, res) => {
    res.status(204).json({
        message: 'Zaktualizowano'
    })
}));

drawsAdminRoutes.delete('/:id', [authJWT], asyncFn(async (req, res) => {
    const id = req.params.id.toString();
    const draw = await drawsMethods.remove(id);

    if (!draw) {
        res.status(404).json({
            success: false,
            message: 'Nie znaleziono danych do usunięcia'
        })
    }

    res.status(200).json({
        success: true,
        message: 'usuwanie przeszło pomyślnie'
    });
}));


export default drawsAdminRoutes;
