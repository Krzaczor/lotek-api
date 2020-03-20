import express from 'express';
import controllers from '../controllers/index';

const router = express.Router();

router.get('/', controllers.numbers.showAll);
router.get('/:id', controllers.numbers.show);
router.post('/', controllers.numbers.addOne);

export default router;