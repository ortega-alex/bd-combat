import { executeQuery } from '../utilities';

export const getEmployees = async () => {
    const strQuery = `  SELECT a.*,
                            b.puesto,
                            IF (a.estado = 1, 'Actuvo', 'Inactivo') AS _estado
                        FROM empleado a
                        INNER JOIN puesto b ON a.id_puesto = b.id_puesto
                        ORDER BY a.nombre;`;
    const res = await executeQuery(strQuery);
    if (res.error) throw res.error.sqlMessage;
    return res;
};

export const getEmployeeById = async id => {
    const strQuery = `  SELECT *
                        FROM empleado
                        WHERE id_empleado = ?`;
    const res = await executeQuery(strQuery, [id]);
    if (res.error) throw res.error.sqlMessage;
    return res.length > 0 ? res[0] : {};
};

export const getEmployeesByPositions = async id => {
    const strQuery = `  SELECT a.id_empleado, a.nombre, 
                            b.id_puesto, b.puesto 
                        FROM empleado a 
                        INNER JOIN puesto b ON a.id_puesto = b.id_puesto 
                        WHERE a.id_puesto = ?
                        ORDER BY a.nombre;`;
    const res = await executeQuery(strQuery, [id]);
    if (res.error) throw res.error.sqlMessage;
    return res;
};

export const addOrUpdateEmployee = async ({
    id_empleado,
    id_puesto,
    nombre,
    imagen,
    celular,
    telefono,
    correo,
    dpi,
    nit,
    estado = 1,
    fecha_nacimiento,
    id_usuario
}) => {
    const _id_usuario = id_usuario === null || id_usuario === 'null' || !id_usuario ? null : id_usuario;
    const strQuery = `  INSERT INTO empleado (id_empleado, id_puesto, nombre, imagen, celular,
                                             telefono, correo, dpi, nit, estado,
                                             fecha_nacimiento, id_usuario) 
                        VALUES (?, ?, ?, ?, ?,
                                ?, ?, ?, ?, ?,
                                ?, ?) AS val
                        ON DUPLICATE KEY UPDATE
                        id_puesto = val.id_puesto,
                        id_usuario = val.id_usuario,
                        nombre = val.nombre,
                        imagen = val.imagen,
                        celular = val.celular,
                        telefono = val.telefono,
                        correo = val.correo,
                        dpi = val.dpi,
                        nit = val.nit,
                        estado = val.estado,
                        fecha_nacimiento = val.fecha_nacimiento,
                        fecha_edicion = CURRENT_TIMESTAMP()`;
    const res = await executeQuery(strQuery, [
        id_empleado,
        id_puesto,
        nombre,
        imagen,
        celular,
        telefono,
        correo,
        dpi,
        nit,
        estado,
        fecha_nacimiento,
        (id_usuario = _id_usuario)
    ]);
    if (res.error) throw res.error.sqlMessage;
    return res.affectedRows;
};
