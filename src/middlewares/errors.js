// code copy from  overment: https://www.youtube.com/channel/UC_MIaHmSkt9JHNZfQ_gUmrg
export function notFound(req, res, next) {
    const err = new Error('404 page not found');
    err.status = 404;
    next(err);
}

export function asyncFn(fn) {
    return (req, res, next) => {
        fn(req, res, next).catch(err => next(err));
    }
}

export function errorMessage(err, req, res, next) {
    res.status(err.status || 500).json({
        message: err.message
    });
}