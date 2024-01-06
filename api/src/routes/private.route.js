import { Router } from 'express';
import { addOrUpdate, getAll } from '../comtrolles';
import { imagenUpload } from '../middleware';
const route = Router();

route.get('/user', getAll);
route.post('/user', imagenUpload.single('nueva_imagen'), addOrUpdate);

export default route;
