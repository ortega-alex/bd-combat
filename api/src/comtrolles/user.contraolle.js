import bcrypt from 'bcrypt';
import { addOrUpdateUser, getUserById, getUserByUsername, getUsers } from '../models/user.model';
import { generateToken } from '../middleware';
import moment from 'moment';

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
        const { id_usuario, nombre, correo, usuario, contrasenia, contrasenia_actual } = req.body;

        if (!nombre) return res.status(203).json({ error: true, message: 'El nombre es requerido' });
        if (!correo) return res.status(203).json({ error: true, message: 'El correo es requerido' });
        if (!usuario) return res.status(203).json({ error: true, message: 'El usuario es requerido' });

        if (id_usuario && contrasenia_actual) {
            const user = await getUserById(id_usuario);
            const match = bcrypt.compareSync(contrasenia_actual, user.contrasenia);
            if (!match) return res.status(203).json({ error: true, message: 'Contraseña actual incorecta' });
        }
        const encodePass = bcrypt.hashSync(contrasenia ?? `combat-${moment().format('YYYY')}`, 8);
        const affectedRows = await addOrUpdateUser({ ...req.body, contrasenia: encodePass });
        const error = affectedRows > 0 ? false : true;
        const title = id_usuario ? 'editar' : 'agregar';
        res.status(200).json({
            error,
            message: error ? `No se pudo ${title} el usuario` : `Usuario ${title} correctamente`
        });
    } catch (error) {
        return res.status(500).json({ message: 'Ha ocurrido un error interno', error });
    }
};
