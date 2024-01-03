import bcrypt from 'bcrypt';
import { getUserByUsername } from '../models/user.model';
import { generateToken } from '../middleware';

export const login = async (req, res) => {
    try {
        const { usuario, contrasenia } = req.body;
        if (!usuario) return res.status(203).json({ error: true, message: 'El usuario es requerido' });
        if (!contrasenia) return res.status(203).json({ error: true, message: 'La contraseña es requerida' });
        // const encodePass = bcrypt.hashSync(contrasenia, 8);
        // console.log(encodePass);
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
