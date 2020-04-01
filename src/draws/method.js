import Draws from './model';
import { allNumbers } from '../setting';

export const findAll = async () => { }

export const find = async (id) => {

}

export const getNumberInformation = async (nr) => {
    const otherNumbers = allNumbers.filter(currentNr => currentNr !== nr);
    const statNumbers = [];

    await Promise.all(otherNumbers.map(async number => {
        const otherNumber = await Draws.find({ numbers: { $all: [nr, number] } }).select('id time numbers -_id');

        statNumbers.push({
            number,
            count: otherNumber.length,
            draws: otherNumber
        })
    }));

    statNumbers.sort((a, b) => (b.count === a.count) ? a.number - b.number : b.count - a.count);

    return statNumbers;
}


export const setDarws = async (draws) => {
    if (Array.isArray(draws)) {
        const drawsArray = await Draws.insertMany(draws);
        return drawsArray;
    }

    const draw = await Draws.create(draws);
    return draw.save();
}
