import express from 'express';
import controllers from '../controllers/index';

const router = express.Router();

router.post('/', controllers.draws.addOne);
router.get('/', controllers.draws.showAll);
// router.get('/:id', controllers.numbers.showOne);

export default router;