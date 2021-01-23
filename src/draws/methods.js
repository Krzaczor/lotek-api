import Draws from './model';
import { getDate } from '../helpers/datetime';
import createId from '../helpers/createId';

const total = Draws.countDocuments();

export const find = async (query) => {
    const getYear = query.year ?? getDate().year;
    const getMonth = query.month ?? getDate().month;

    const startTime = getDate(getYear, getMonth, 0);
    const endTime = getDate(getYear, getMonth - 6, 0);

    const drawsPromise = Draws
        .find({})
        .select('id time numbers -_id')
        .where('time')
        .lte(startTime.original)
        .gt(endTime.original)
        .sort({ time: 'desc' });

    const hasNextPromise = Draws
        .find({})
        .where('time')
        .lte(endTime.original)
        .limit(1);

    const [draws, nextDraws, totalDraws] = await Promise.all([drawsPromise, hasNextPromise, total]);

    const result = {};
    result.total = totalDraws;
    result.results = draws;
    result.hasNext = nextDraws.length > 0;
    result.next = {
        year: endTime.year,
        month: endTime.month,
    }

    return result;
}

export const show = (params) => {
    const {range = [], sort = ['time', 'desc']} = params;
    const [start = 0, end = 9] = range;

    return Draws
        .find({})
        .select('-_id')
        .skip(start)
        .sort([sort])
        .limit(end - start + 1);
}

export const findFirst = () => {
    return Draws
        .findOne({})
        .select('-_id')
        .sort({ time: 'desc' })
        .limit(1);
}

export const findOne = (id) => {
    return Draws
        .findOne({ id })
        .select('-_id')
}

export const create = async (draw) => {
    const { time, numbers } = draw;

    const newDraw = {
        numbers,
        id: createId(time),
        time: new Date(time),
    };

    const result = await Draws.create(newDraw);
    return result.save();
}

export const remove = (id) => {
    return Draws.deleteOne({id});
}
