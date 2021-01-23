import passport from 'passport';

export const authJWT = (req, res, next) => {
    return passport.authenticate('jwt', { session: false })(req, res, next);
}

export const authLocal = (req, res, next) => {
    return passport.authenticate('local', { session: false })(req, res, next);

}
