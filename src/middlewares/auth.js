import passport from 'passport';

export const authJWT = (req, res, next) => {
    return passport.authenticate('jwt', { session: false }, (error, user) => {
        if (error || !user) {
            res.status(401).json({
                success: false
            })
        } else {
            next()
        }
    })(req, res, next);
}

export const authLocal = (req, res, next) => {
    return passport.authenticate('local', { session: false })(req, res, next);

}
