import { executeQuery } from '../utilities';

export const getUsers = async () => {
    const strQuery = `  SELECT *, 
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

export const addOrUpdateUser = async ({ id_usuario, nombre, correo, usuario, contrasenia, estado = 1 }) => {
    const strQuery = `  INSERT INTO usuario (id_usuario, nombre, correo, usuario, contrasenia) 
                        VALUES (?, ?, ?, ?, ?) AS val
                        ON DUPLICATE KEY UPDATE
                        nombre = val.nombre,
                        correo = val.correo,
                        usuario = val.usuario,
                        contrasenia = val.contrasenia,
                        estado = ?,
                        fecha_edicion = CURRENT_TIMESTAMP()`;
    console.log(strQuery);
    const res = await executeQuery(strQuery, [id_usuario, nombre, correo, usuario, contrasenia, estado]);
    if (res.error) throw res.error.sqlMessage;
    return res.affectedRows;
};
