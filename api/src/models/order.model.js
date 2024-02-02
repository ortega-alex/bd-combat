import { executeQuery } from '../utilities';

export const getAllOrders = async () => {
    const strQuery = `  SELECT a.*,
                            IF (a.estado = 1, 'Activo', 'Inactivo') AS _estado,
                            b.nombre AS vendedor,
                            (SELECT SUM(subtotal) AS total FROM detalle_orden WHERE id_orden = a.id_orden) AS total 
                        FROM orden a
                        INNER JOIN empleado b ON a.id_vendedor = b.id_empleado
                        ORDER BY a.fecha_creacion`;
    const res = await executeQuery(strQuery);
    if (res.error) throw res.error.sqlMessage;
    return res;
};

export const addOrUpdateOrder = async ({ id_orden, id_vendedor, no_factura, nit, nombre, direccion, estado = 1, fecha }) => {
    const strQuery = `  INSERT INTO orden (id_orden, id_vendedor, no_factura, nit, nombre, 
                                            direccion, estado, fecha) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?) AS val
                        ON DUPLICATE KEY UPDATE
                        id_vendedor = val.id_vendedor,
                        no_factura = val.no_factura,
                        nit = val.nit,
                        nombre = val.nombre,
                        direccion = val.direccion,
                        estado = val.estado,
                        fecha = val.fecha,
                        fecha_edicion = CURRENT_TIMESTAMP()`;
    const res = await executeQuery(strQuery, [id_orden, id_vendedor, no_factura, nit, nombre, direccion, estado, fecha]);
    if (res.error) throw res.error.sqlMessage;
    return res;
};
