function correct(value) {
    return value >= 10 ? value : `0${value}`;
}

export default (time) => {
    time = new Date(time);

    const year = correct(time.getFullYear());
    const month = correct(time.getMonth() + 1);
    const day = correct(time.getDate());

    return Number(`${year}${month}${day}`);
}