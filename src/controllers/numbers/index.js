import Numbers from '../../models/numbers';
import Draws from '../../models/draws';

const showAll = async ({ res }) => {
    try {
        const numbers = await Numbers.find({}).select('id value _id').sort({ value: 'asc' });

        res.status(200).json(numbers);
    } catch (error) {
        res.status(502).json({
            message: error.message
        });
    }
}

const show = async (req, res) => {
    const { id = -1 } = req.params;

    try {
        const number = await Numbers.find({ id }).select('id value -_id');

        res.status(200).json(number);
    } catch (error) {
        res.status(502).json({
            message: error.message
        });
    }
}

const addOne = async (value, draw) => {
    try {
        let number = await Numbers.findOne({ id: value });

        if (!number) {
            const newNumber = new Numbers({ value, id: value, draws: draw });
            number = await newNumber.save();
        }

        return number

    } catch (error) {
        res.json({
            message: error.message
        })
    }
}

export default {
    show,
    showAll,
    addOne,
};
