export function notFound(req, res, next) {
    next({
        status: 404,
        message: 'Page not found'
    })
}

export const asyncFn = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(error => {
            if (error.details !== undefined || error.name === 'MongoError') {
                next({
                    status: 400,
                    message: error.message
                });
            }

            next();
        });
    }
}

export const errorMessage = (err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message
    });
}