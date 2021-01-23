import jwt from 'jsonwebtoken';
import Users from './model';

export const create = async (data) => {
    const { username, password } = data;
    const user = new Users({ username });

    await Users.register(user, password);
}

export const login = (id) => {
    return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: 1200 });
}
