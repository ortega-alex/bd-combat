import { Router } from 'express';
import { addOrUpdate, getAll } from '../comtrolles';
const route = Router();

route.get('/users', getAll);
route.put('/user', addOrUpdate);

export default route;