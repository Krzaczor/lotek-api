import Draws from '../../models/draws';

const showAll = async ({ res }) => {
    try {
        const draws = await Draws.find({}).select('id time numbers -_id').sort({ time: 'desc' });

        res.status(200).json(draws);
    } catch (error) {
        res.status(502).json({
            msg: error
        });
    }
}

const addOne = async (req, res) => {
    const id = new Date();
    const { time = null, numbers = [] } = req.body;

    try {
        const draw = new Draws({ id, time, numbers });
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
    showAll
};
