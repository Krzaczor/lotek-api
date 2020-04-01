import Draws from '../draws/model';

const selectProps = 'id time numbers -_id';
// const selectProps = 'numbers -_id';

export const findAll = () => {
    return Draws.find({}).select(selectProps).sort({ time: 'desc' });
};

export const find = (value) => {
    const number = Draws.find({ numbers: value }).select(selectProps);
    return number;
};