import passport from 'passport';
import passportJWT from 'passport-jwt';
import Users from '../users/model';

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

// const cb = async (payload, done) => {
//     try {
//         const user = await Users.findOne({ _id: payload.id });
//         return done(null, user);
//     } catch (error) {
//         return done(error);
//     }
// }

const cb = async (payload, done) => {
    try {
        const user = await Users.findOne({ _id: payload.id });
        
        if (user) return done(null, user);
        return done(null, false);
        
    } catch (error) {
        return done(error);
    }
}

export default () => {
    const config = {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_KEY
    }

    passport.use(Users.createStrategy());
    passport.use(new JWTStrategy(config, cb))
}