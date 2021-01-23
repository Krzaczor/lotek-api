const allowedProps = ['time', 'numbers'];

export default (req, res, next) => {
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
