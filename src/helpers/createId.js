function correct(value) {
    return value >= 10 ? value : `0${value}`;
}

export default (time) => {
    const date = new Date(time);

    const year = date.getFullYear();
    const month = correct(date.getMonth() + 1);
    const day = correct(date.getDate());

    return Number(`${year}${month}${day}`);
}