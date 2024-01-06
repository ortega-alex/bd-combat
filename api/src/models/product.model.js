import { executeQuery } from '../utilities';

export const getAllProduts = async () => {
    const strQuery = `  SELECT *,
                            IF (estado = 1, 'Activo', 'Inactivo') AS _estado 
                        FROM producto 
                        ORDER BY producto`;
    const res = await executeQuery(strQuery);
    if (res.error) throw res.error.sqlMessage;
    return res;
};

export const addOrUpdateProduct = async ({ id_producto, producto, estado }) => {
    const strQuery = `  INSERT INTO producto (id_producto, producto) 
                        VALUES (?, ?) AS val
                        ON DUPLICATE KEY UPDATE
                        producto = val.producto,
                        estado = ?,
                        fecha_edicion = CURRENT_TIMESTAMP()`;
    const res = await executeQuery(strQuery, [id_producto, producto, estado]);
    if (res.error) throw res.error.sqlMessage;
    return res.affectedRows;
};
