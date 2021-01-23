// import express from 'express';
// import * as drawsMethods from './methods';
// import { asyncFn } from '../middlewares/errors';
// import { authJWT } from '../middlewares/auth';
// import { bodyFilter } from '../middlewares/filters/body';
// import { paramFilter } from '../middlewares/filters/param';
// import bodyValidate from '../middlewares/validators/body';

// const drawsRoutes = express.Router();

// drawsRoutes.get('/', paramFilter, asyncFn(async (req, res) => {
//     const result = await drawsMethods.find({
//         year: req.query?.year,
//         month: req.query?.month
//     });

//     if (result.hasNext) {
//         res.set('Next', `${req.baseUrl}?year=${result.next.year}&month=${result.next.month}`);
//     }

//     console.log('total', result.total)

//     if (result.total !== undefined) {
//         res.set('Content-Range', `draws */${result.total}`);
//     }

//     res.status(200).json(result.results);
// }));

// drawsRoutes.get('/admin/draws', [authJWT, paramFilter], asyncFn(async (req, res) => {
//     const params = req.query;
//     const draws = await drawsMethods.show(params);

//     res.set('Content-Range', 'draws 0-10/30');
//     res.set('Access-Control-Expose-Headers', 'Content-Range');

//     res.status(200).json(draws);
// }));

// drawsRoutes.get('/first', asyncFn(async (req, res) => {
//     const draw = await drawsMethods.findFirst();

//     res.status(200).json(draw);
// }));

// drawsRoutes.get('/:id', asyncFn(async (req, res) => {
//     const id = req.params.id.toString();
//     const draw = await drawsMethods.findOne(id);

//     if (!draw) next();

//     res.status(200).json(draw);
// }));

// drawsRoutes.post('/', [authJWT, bodyFilter], asyncFn(async (req, res) => {
//     const newDraw = await bodyValidate(req.body);
//     const draw = await drawsMethods.create(newDraw);

//     if (!draw) next();

//     res.status(201).json(draw);
// }));

// drawsRoutes.put('/:id', [authJWT], asyncFn(async (req, res) => {
//     res.status(204).json({
//         message: 'Zaktualizowano'
//     })
// }));

// drawsRoutes.delete('/:id', [authJWT], asyncFn(async (req, res) => {
//     const id = req.params.id.toString();
//     const draw = await drawsMethods.remove(id);

//     if (!draw) {
//         res.status(404).json({
//             success: false,
//             message: 'Nie znaleziono danych do usunięcia'
//         })
//     }

//     res.status(200).json({
//         success: true,
//         message: 'usuwanie przeszło pomyślnie'
//     });
// }));


// export default drawsRoutes;
