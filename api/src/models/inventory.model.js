import { executeQuery } from '../utilities';

export const getAllInventory = async () => {
    const strQuery = `  SELECT a.*,
                            IF (a.estado = 1, 'Activo', 'Inactivo') AS _estado,
                            b.producto,
                            c.medida,
                            d.color
                        FROM inventario a
                        INNER JOIN producto b ON a.id_producto = b.id_producto
                        INNER JOIN medida c ON a.id_medida = c.id_medida
                        INNER JOIN color d ON a.id_color = d.id_color
                        ORDER BY a.fecha_creacion DESC, a.disponible DESC`;
    const res = await executeQuery(strQuery);
    if (res.error) throw res.error.sqlMessage;
    return res;
};

export const getStock = async () => {
    const strQuery = `  SELECT a.id_producto, SUM(a.disponible) AS disponible, a.precio_venta,
                            b.producto,
                            c.medida,
                            d.color,
                            CONCAT(b.producto, ' | ', c.medida , ' | ', d.color) AS detalle
                        FROM inventario a
                        INNER JOIN producto b ON a.id_producto = b.id_producto
                        INNER JOIN medida c ON a.id_medida = c.id_medida
                        INNER JOIN color d ON a.id_color = d.id_color
                        WHERE a.disponible > 0
                        AND a.estado = 1
                        GROUP BY a.id_producto, a.precio_venta, c.id_medida, d.id_color
                        ORDER BY b.producto`;
    const res = await executeQuery(strQuery);
    if (res.error) throw res.error.sqlMessage;
    return res;
};

export const getInventoryByProductId = async id => {
    const strQuery = `SELECT * 
                        FROM inventario 
                        WHERE id_producto = 1 
                        AND disponible > 0 
                        ORDER BY fecha_creacion ASC;`;
    const res = await executeQuery(strQuery);
    if (res.error) throw res.error.sqlMessage;
    return res;
};

export const addOrUpdateInventory = async ({
    id_inventario,
    id_producto,
    id_medida,
    id_color,
    id_usuario,
    cantidad,
    precio_venta,
    precio_compra,
    descripcion,
    estado = 1,
    disponible
}) => {
    const strQuery = `  INSERT INTO inventario 
                            (id_inventario, id_producto, id_medida, id_color, id_usuario,
                            cantidad, precio_venta, precio_compra, descripcion, disponible, estado) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) AS val
                        ON DUPLICATE KEY UPDATE
                        id_producto = val.id_producto,
                        id_medida = val.id_medida,
                        id_color = val.id_color,
                        id_usuario = val.id_usuario,
                        cantidad = val.cantidad,
                        disponible = val.disponible,
                        precio_venta = val.precio_venta,
                        precio_compra = val.precio_compra,
                        descripcion = val.descripcion,
                        estado = val.estado,
                        fecha_edicion = CURRENT_TIMESTAMP()`;
    const res = await executeQuery(strQuery, [
        id_inventario,
        id_producto,
        id_medida,
        id_color,
        id_usuario,
        cantidad,
        precio_venta,
        precio_compra,
        descripcion,
        disponible,
        estado
    ]);
    if (res.error) throw res.error.sqlMessage;
    return res.affectedRows;
};
