import { executeQuery } from '../utilities';

export const getUsers = async () => {
    const strQuery = `  SELECT id_usuario, nombre, correo, usuario, estado, 
                            fecha_creacion, imagen,
                            IF (estado = 1, 'Actuvo', 'Inactivo') AS _estado
                        FROM usuario 
                        ORDER BY nombre;`;
    const res = await executeQuery(strQuery);
    if (res.error) throw res.error.sqlMessage;
    return res;
};

export const getUserById = async id_usuario => {
    const strQuery = `  SELECT * 
                        FROM usuario 
                        WHERE id_usuario = ?;`;
    const res = await executeQuery(strQuery, [id_usuario]);
    if (res.error) throw res.error.sqlMessage;
    return res.length > 0 ? res[0] : {};
};

export const getUserByUsername = async usuario => {
    const strQuery = `  SELECT * 
                        FROM usuario 
                        WHERE usuario = ?;`;
    const res = await executeQuery(strQuery, [usuario]);
    if (res.error) throw res.error.sqlMessage;
    return res.length > 0 ? res[0] : null;
};

export const addOrUpdateUser = async ({ id_usuario, nombre, correo, usuario, contrasenia, estado, imagen }) => {
    const strQuery = `  INSERT INTO usuario (id_usuario, nombre, correo, usuario, contrasenia,
                                             imagen, estado) 
                        VALUES (?, ?, ?, ?, ?, ?, ?) AS val
                        ON DUPLICATE KEY UPDATE
                        nombre = val.nombre,
                        correo = val.correo,
                        usuario = val.usuario,
                        contrasenia = val.contrasenia,
                        estado = val.estado,
                        imagen = val.imagen,
                        fecha_edicion = CURRENT_TIMESTAMP()`;
    const res = await executeQuery(strQuery, [id_usuario, nombre, correo, usuario, contrasenia, imagen, estado]);
    if (res.error) throw res.error.sqlMessage;
    return res;
};
