import { executeQuery } from '../utilities';

export const getDetailByOrderId = async id => {
    const strQuery = `  SELECT *
                        FROM  detalle_orden
                        WHERE id_orden = ?`;
    const res = await executeQuery(strQuery, [id]);
    if (res.error) throw res.error.sqlMessage;
    return res;
};

export const addOrderDetailByOrderId = async (id_orden, arr) => {
    let strQuery = `DELETE FROM detalle_orden WHERE id_orden = ?`;
    const res = await executeQuery(strQuery, [id_orden]);
    if (res.error) throw res.error.sqlMessage;

    const values = [];
    arr.forEach(element => {
        values.push(
            `(${id_orden}, ${element.id_producto}, ${element.cantidad}, ${element.precio_venta}, ${element.subtotal}, 
            '${element.producto}', '${element.detalle}', '${element.color}', '${element.medida}', ${element?.estado ?? 1})`
        );
    });
    if (values.length > 0) {
        strQuery = `  INSERT INTO detalle_orden (id_orden, id_producto, cantidad, precio_venta, subtotal,
                                                     producto, detalle, color, medida, estado) 
                            VALUES ${values.toString()}`;
        console.log(strQuery);
        const res = await executeQuery(strQuery);
        if (res.error) throw res.error.sqlMessage;
        return 1;
    } else {
        return 0;
    }
};
