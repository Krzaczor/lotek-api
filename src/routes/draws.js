import express from 'express';
import controllers from '../controllers/index';

const router = express.Router();

router.get('/', controllers.draws.showAll);
router.get('/:id', controllers.draws.show);
router.post('/', controllers.draws.addOne);

export default router;