const allowParams = {
    user: ['year', 'month'],
    admin: ['sort', 'range', 'filter'],
};

export default (role) => (req, res, next) => {
    const query = req.query;
    const newQuery = {};

    allowParams[role].forEach(value => {
        const propQuery = query[value];
        
        if (propQuery) {
            newQuery[value] = JSON.parse(propQuery);
        }
    });

    req.query = newQuery;

    next();
}
