/*
    For example
    req.body = {time, numbers, _id, sth, nth} -> {time, numbers}
    req.body = {foo, bar, __v} -> {}
    req.body = {foo, numbers, bar} -> {numbers}
*/

export const bodyFilter = (req, res, next) => {
    const allowedProps = ['time', 'numbers'];
    const keysReq = Object.keys(req.body);
    const allowProps = {};

    keysReq.forEach((key) => {
        if (allowedProps.includes(key)) {
            allowProps[key] = req.body[key];
        }
    });

    req.body = allowProps;
    next();
}