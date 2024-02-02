import { Router } from 'express';
import {
    addOrUpdate,
    addOrUpdateColorCtr,
    addOrUpdateEmployeeCtr,
    addOrUpdateInventoryCtr,
    addOrUpdateMeasureCtr,
    addOrUpdatePositionCtr,
    addOrUpdateProductCtr,
    getAll,
    getAllColorCtr,
    getAllEmployeeByIdCtr,
    getAllEmployeeCtr,
    getAllInventoryCtr,
    getAllMeasureCtr,
    getAllPositionsCtr,
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

route.get('/position', getAllPositionsCtr);
route.post('/position', addOrUpdatePositionCtr);

route.get('/employee', getAllEmployeeCtr);
route.get('/employee/:id', getAllEmployeeByIdCtr);
route.post('/employee', imagenUpload.single('nueva_imagen'), addOrUpdateEmployeeCtr);

export default route;
