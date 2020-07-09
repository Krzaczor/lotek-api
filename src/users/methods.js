import passport from 'passport';
import Users from './model';

export const create = async (data) => {
    const { username, password } = data;
    const user = new Users({ username });

    await Users.register(user, password);
}

export const login = () => {
    passport.use(Users.createStrategy())
}

export const findOne = (id) => {
}
