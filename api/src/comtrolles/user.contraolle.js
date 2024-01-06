import bcrypt from 'bcrypt';
import fs from 'fs';
import moment from 'moment';
import { generateToken } from '../middleware';
import { addOrUpdateUser, getUserById, getUserByUsername, getUsers } from '../models/user.model';
import path from 'path';

export const login = async (req, res) => {
    try {
        const { usuario, contrasenia } = req.body;
        if (!usuario) return res.status(203).json({ error: true, message: 'El usuario es requerido' });
        if (!contrasenia) return res.status(203).json({ error: true, message: 'La contraseña es requerida' });

        const user = await getUserByUsername(usuario);

        if (user === null) return res.status(203).json({ error: true, message: 'El usuario no existe' });
        if (user?.estado === '0') return res.status(203).json({ error: true, message: 'El usuario esta suspendido' });
        const match = bcrypt.compareSync(contrasenia, user.contrasenia);
        if (!match) return res.status(203).json({ error: true, message: 'Contraseña incorecta' });

        const token = generateToken({ usuario: user.usuario, correo: user.correo });
        res.status(200).json({ session: user, token, message: 'Sesion iniciada correctamente' });
    } catch (error) {
        return res.status(500).json({ message: 'Ha ocurrido un error interno', error });
    }
};

export const getAll = async (_, res) => {
    try {
        const users = await getUsers();
        res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: 'Ha ocurrido un error interno', error });
    }
};

export const addOrUpdate = async (req, res) => {
    try {
        const { file, body } = req;
        const { id_usuario, nombre, correo, usuario, contrasenia, contrasenia_actual, imagen } = body;
        let _imagen = null;
        if (file) {
            _imagen = `${file.path.replace(/\\/g, '/').split('public')[1]}`;
            if (imagen && imagen !== 'null') fs.unlinkSync(path.join(__dirname, `../public${imagen}`));
        } else if (imagen && imagen !== 'null') {
            _imagen = imagen;
        }

        if (!nombre) return res.status(203).json({ error: true, message: 'El nombre es requerido' });
        if (!correo) return res.status(203).json({ error: true, message: 'El correo es requerido' });
        if (!usuario) return res.status(203).json({ error: true, message: 'El usuario es requerido' });

        let encodePass = null;
        if (id_usuario) {
            const user = await getUserById(id_usuario);
            encodePass = user.contrasenia;
            if (!_imagen) _imagen = user.imagen;
            if (contrasenia_actual) {
                const match = bcrypt.compareSync(contrasenia_actual, encodePass);
                if (!match) return res.status(203).json({ error: true, message: 'Contraseña actual incorecta' });
            }
            if (contrasenia) {
                const match = bcrypt.compareSync(contrasenia, encodePass);
                if (!match) encodePass = bcrypt.hashSync(contrasenia, 8);
            }
        } else {
            encodePass = bcrypt.hashSync(contrasenia ?? `combat-${moment().format('YYYY')}`, 8);
        }

        const _user = {
            ...body,
            contrasenia: encodePass,
            imagen: _imagen
        };
        const affectedRows = await addOrUpdateUser(_user);
        const error = affectedRows > 0 ? false : true;
        const title = id_usuario ? 'editar' : 'agregar';
        res.status(200).json({
            error,
            usuario: _user,
            message: error ? `No se pudo ${title} el usuario` : `Usuario ${title} correctamente`
        });
    } catch (error) {
        return res.status(500).json({ message: 'Ha ocurrido un error interno', error });
    }
};
