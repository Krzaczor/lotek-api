import Numbers from '../../models/numbers';

const showAll = async ({ res }) => {
    try {
        const numbers = await Numbers.find().select('id value -_id').sort({ value: 'asc' });

        res.status(200).json({
            numbers
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }

};

const showOne = async (req, res) => {
    const id = parseInt(req.params.id || -1) || -1;

    try {
        const result = await Numbers.findOne({ id }).select('id value -_id');

        res.status(200).json({
            number: result
        })
    } catch (error) {
        res.status(502).json({
            message: error.toString(),
            result
        });

        res.status(502).json({
            error: 'nie znaleziono takiego zasobu',
            id
        })
    }
}

const addOne = async (req, res) => {
    const number = parseInt(req.body.number || -1) || -1;

    try {
        if (number > 0) {
            let result = new Numbers({
                id: number,
                value: number
            });
            result = await result.save();

            res.status(201).json({
                data: {
                    number: result
                }
            });
        } else {
            res.status(401).json({
                error: 'dostarczono nieprawidlowe parametry. Akcja nie powiodla sie',
                number: req.body.number
            });
        }
    } catch (error) {
        res.status(502).json({
            message: error.toString(),
            number
        });
    }
}

export default {
    showAll,
    showOne,
    addOne
}
