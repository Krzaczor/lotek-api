import Draws from '../../draws/model';

const ignoreProps = ['_id', '__v'];

export const bodyFilter = (req, res, next) => {
    const keysReq = Object.keys(req.body);
    const cleanProps = {};
    const keysDraws = Object
        .keys(Draws.schema.paths)
        .filter(key => !ignoreProps.includes(key));

    keysReq.forEach((key) => {
        if (keysDraws.indexOf(key) !== -1) {
            cleanProps[key] = req.body[key];
        }
    });

    req.body = cleanProps;
    next();
}