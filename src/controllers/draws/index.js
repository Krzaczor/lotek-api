import Draws from '../../models/draws';
// import Numbers from '../../models/numbers';
import numbersController from '../../controllers/numbers/index';

const showAll = async ({ res }) => {
    try {
        const draws = await Draws.find({}).populate('numbers', 'value -_id').select('id time numbers  -_id').sort({ time: 'desc' });

        res.status(200).json(draws);

    } catch (error) {
        res.status(502).json({
            message: error.message
        });
    }
}

const show = async (req, res) => {
    const { id = -1 } = req.params;

    try {
        const draws = await Draws.find({ id }).populate('numbers', 'value -_id').select('id time numbers -_id');

        res.status(200).json(draws);

    } catch (error) {
        res.status(502).json({
            message: error.message
        });
    }
}

const addOne = async (req, res) => {
    const { time = null, numbers = [] } = req.body;
    const id = new Date();

    try {
        const numbersArray = await Promise.all(numbers.map(numbersController.addOne));
        const draw = new Draws({ id, time, numbers: numbersArray });
        const result = await draw.save();

        res.status(201).json(result);

    } catch (error) {
        res.json({
            message: error.message
        })
    }
}

export default {
    addOne,
    show,
    showAll
};
