import Draws from './model';
import createId from '../helpers/createId';

export const findAll = async (props = {}) => {
    const year = props.year ?? (new Date()).getFullYear();
    const month = props.month ?? (new Date()).getMonth() + 1;

    const startTime = new Date(year, month, 0);
    const endTime = new Date(year, month - 6, 0);

    const drawsPromise = Draws
        .find({})
        .select('id time numbers range -_id')
        .where('time').lte(startTime).gt(endTime)
        .sort({ time: 'desc' });

    const hasNextPromise = Draws
        .find({})
        .where('time').lte(endTime)
        .limit(1);

    const [draws, nextDraws] = await Promise.all([drawsPromise, hasNextPromise]);

    const result = {};
    result.results = draws;
    result.hasNext = nextDraws.length > 0;
    result.next = {
        year: endTime.getFullYear(),
        month: endTime.getMonth() + 1
    }

    return result;
}

export const findFirst = () => {
    return Draws
        .findOne({})
        .select('id time numbers range -_id')
        .sort({ time: 'desc' })
        .limit(1);
}

export const findOne = (id) => {
    return Draws
        .findOne({ id })
        .select('id time numbers -_id')
}

export const create = async (draw) => {
    const newDraw = {
        ...draw,
        time: new Date(draw.time),
        id: createId(draw.time)
    };

    const result = await Draws.create(newDraw);
    return result.save();
}
