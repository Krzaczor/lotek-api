import Draws from '../draws/model';

const selectProps = 'id time numbers -_id';
// const selectProps = 'numbers -_id';

export const findAll = () => {
    return Draws
        .find({})
        .select(selectProps)
        .sort({ time: 'desc' })
        .limit(100);
};

export const find = ({
    number = NaN,
    sort = 'desc',
    limit = Infinity
}) => {
    return Draws
        .find({ numbers: number })
        .select(selectProps)
        .sort({ time: sort })
        .limit(limit);
};