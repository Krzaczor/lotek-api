import express from 'express';
import controllers from '../controllers/index';

const router = express.Router();

router.get('/', controllers.numbers.showAll);
router.post('/', controllers.numbers.addOne);
router.get('/:id', controllers.numbers.showOne);

export default router;
