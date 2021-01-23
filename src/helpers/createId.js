import { getDate } from "./datetime";

const correct = (value) => {
    return value >= 10 ? value : `0${value}`;
}

export default (time) => {
    let { year, month, day } = getDate(time);

    month = correct(month);
    day = correct(day);

    return Number(`${year}${month}${day}`);
}