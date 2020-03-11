import jwt from 'jsonwebtoken';
import config from '../config';

export default (req, res, next) => {
    const token = req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, config.secret, (err, user) => {
            if (err) {
                res.status(403).json({ message: 'Invalid access token' });
            } else {
                req.user = user;
                // eslint-disable-next-line
                next();
            }
        });
    } else {
        res.status(401).json({ message: 'No access token' });
    }
};
