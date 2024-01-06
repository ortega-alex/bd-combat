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
                        ORDER BY a.id_inventario`;
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
    estado
}) => {
    const strQuery = `  INSERT INTO inventario 
                            (id_inventario, id_producto, id_medida, id_color, id_usuario,
                            cantidad, precio_venta, precio_compra, descripcion) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) AS val
                        ON DUPLICATE KEY UPDATE
                        id_producto = val.id_producto,
                        id_medida = val.id_medida,
                        id_color = val.id_color,
                        id_usuario = val.id_usuario,
                        cantidad = val.cantidad,
                        precio_venta = val.precio_venta,
                        precio_compra = val.precio_compra,
                        descripcion = val.descripcion,
                        estado = ?,
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
        estado
    ]);
    if (res.error) throw res.error.sqlMessage;
    return res.affectedRows;
};
