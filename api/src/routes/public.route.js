import { Router } from 'express';
import { login } from '../comtrolles';
const route = Router();

route.post('/user/sing-in', login);

export default route;
