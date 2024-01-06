import { Router } from 'express';
import {
    addOrUpdate,
    addOrUpdateColorCtr,
    addOrUpdateInventoryCtr,
    addOrUpdateMeasureCtr,
    addOrUpdateProductCtr,
    getAll,
    getAllColorCtr,
    getAllInventoryCtr,
    getAllMeasureCtr,
    getAllProductsCtr
} from '../comtrolles';
import { imagenUpload } from '../middleware';
const route = Router();

route.get('/user', getAll);
route.post('/user', imagenUpload.single('nueva_imagen'), addOrUpdate);

route.get('/product', getAllProductsCtr);
route.post('/product', addOrUpdateProductCtr);

route.get('/measure', getAllMeasureCtr);
route.post('/measure', addOrUpdateMeasureCtr);

route.get('/color', getAllColorCtr);
route.post('/color', addOrUpdateColorCtr);

route.get('/inventory', getAllInventoryCtr);
route.post('/inventory', addOrUpdateInventoryCtr);

export default route;
