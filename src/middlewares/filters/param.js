export const paramFilter = (req, res, next) => {
    const reqParams = req.query;
    const params = {};

    if (Number(reqParams.year) === parseInt(reqParams.year)) {
        params.year = reqParams.year;
    }

    if (Number(reqParams.month) === parseInt(reqParams.month)) {
        params.month = reqParams.month;
    }

    req.query = params;

    next();
}