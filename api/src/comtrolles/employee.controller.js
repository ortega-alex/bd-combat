import fs from 'fs';
import path from 'path';
import { addOrUpdateEmployee, getEmployeeById, getEmployees, getEmployeesByPositions } from '../models';

export const getAllEmployeeCtr = async (_, res) => {
    try {
        const employees = await getEmployees();
        res.status(200).json(employees);
    } catch (error) {
        return res.status(500).json({ message: 'Ha ocurrido un error interno', error });
    }
};

export const getAllEmployeeByPositionIdCtr = async (req, res) => {
    try {
        const { id } = req.params;
        const employees = await getEmployeesByPositions(id);
        res.status(200).json(employees);
    } catch (error) {
        return res.status(500).json({ message: 'Ha ocurrido un error interno', error });
    }
};

export const getAllEmployeeByIdCtr = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await getEmployeeById(id);
        res.status(200).json(employee);
    } catch (error) {
        return res.status(500).json({ message: 'Ha ocurrido un error interno', error });
    }
};

export const addOrUpdateEmployeeCtr = async (req, res) => {
    try {
        const { file, body } = req;
        const { id_empleado, id_puesto, nombre, celular, telefono, correo, dpi, nit, imagen, fecha_nacimiento } = body;
        let _imagen = null;
        if (file) {
            _imagen = `${file.path.replace(/\\/g, '/').split('public')[1]}`;
            if (imagen && imagen !== 'null') fs.unlinkSync(path.join(__dirname, `../public${imagen}`));
        } else if (imagen && imagen !== 'null') {
            _imagen = imagen;
        }

        if (!id_puesto) return res.status(203).json({ error: true, message: 'El puesto es requerido' });
        if (!celular) return res.status(203).json({ error: true, message: 'El celular es requerido' });
        if (!telefono) return res.status(203).json({ error: true, message: 'El telefono es requerido' });
        if (!nombre) return res.status(203).json({ error: true, message: 'El nombre es requerido' });
        if (!correo) return res.status(203).json({ error: true, message: 'El correo es requerido' });
        if (!dpi) return res.status(203).json({ error: true, message: 'El dpi es requerido' });
        if (!nit) return res.status(203).json({ error: true, message: 'El nit es requerido' });
        if (!nit) return res.status(203).json({ error: true, message: 'El nit es requerido' });
        if (!fecha_nacimiento) return res.status(203).json({ error: true, message: 'La fecha de nacimiento es requerida requerido' });

        const affectedRows = await addOrUpdateEmployee({ ...body, imagen: _imagen });
        const error = affectedRows > 0 ? false : true;
        const title = id_empleado ? 'editar' : 'agregar';
        res.status(200).json({
            error,
            message: error ? `No se pudo ${title} el Empleado` : `Empleado ${title} correctamente`
        });
    } catch (error) {
        return res.status(500).json({ message: 'Ha ocurrido un error interno', error });
    }
};
