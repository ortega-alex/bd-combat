import jwtoken from 'jsonwebtoken';
import { TOKEN } from '../utilities/envirinment.utility';

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.Authorization || req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    jwtoken.verify(token, TOKEN, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

export const generateToken = payload => jwtoken.sign(payload, TOKEN);
