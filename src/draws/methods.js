import Draws from './model';
import createId from '../helpers/createId';

export const findAll = () => {
    return Draws
        .find({})
        .select('id time numbers -_id')
        .sort({ time: 'asc' })
        .limit(50)
}

export const find = (id) => {
    return Draws
        .findOne({ id })
        .select('id time numbers -_id')
}

export const create = async (draw) => {
    let newDraw = { ...draw, id: createId(draw.time) };
    newDraw = await Draws.create(newDraw);
    return newDraw.save();
}
