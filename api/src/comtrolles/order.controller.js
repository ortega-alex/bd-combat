import {
    addOrUpdateInventory,
    addOrUpdateOrder,
    addOrderDetailByOrderId,
    getAllOrders,
    getDetailByOrderId,
    getInventoryByProductId
} from '../models';

export const getAllOrderCtr = async (_, res) => {
    try {
        const orders = await getAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json({ message: 'Ha ocurrido un error interno', error });
    }
};

export const getOrderDetailCtr = async (req, res) => {
    try {
        const { id } = req.params;
        const detail = await getDetailByOrderId(id);
        res.status(200).json(detail);
    } catch (error) {
        return res.status(500).json({ message: 'Ha ocurrido un error interno', error });
    }
};

export const addOrUpdateOrderCtr = async (req, res) => {
    try {
        const { id_orden, id_vendedor, no_factura, nit, nombre, direccion, detalle = [] } = req.body;
        if (!id_vendedor) return res.status(203).json({ error: true, message: 'El vendedor obligatorio' });
        if (!no_factura) return res.status(203).json({ error: true, message: 'El numero de factura obligatorio' });
        if (!nit) return res.status(203).json({ error: true, message: 'El NIT obligatorio' });
        if (!nombre) return res.status(203).json({ error: true, message: 'El nombre del clientees obligatorio' });
        if (!direccion) return res.status(203).json({ error: true, message: 'La direccion es obligatorio' });
        if (!detalle || detalle.length <= 0) return res.status(203).json({ error: true, message: 'El detalle es obligatorio' });

        const response = await addOrUpdateOrder(req.body);
        if ((response.insertId || id_orden) && detalle.length > 0) {
            const success = await addOrderDetailByOrderId(response.insertId ?? id_orden, detalle);
            if (success === 1) {
                detalle.forEach(async element => {
                    let cantidad = element.cantidad;
                    if (cantidad > 0) {
                        const products = await getInventoryByProductId(element.id_producto);
                        products.forEach(async item => {
                            let disponible = item.disponible;
                            if (disponible <= cantidad) {
                                cantidad -= disponible;
                                disponible = 0;
                            } else if (cantidad > 0) {
                                disponible -= cantidad;
                                cantidad = 0;
                            }
                            if (disponible != item.disponible) {
                                await addOrUpdateInventory({ ...item, disponible });
                            }
                            if (cantidad <= 0) return false;
                        });
                    }
                });
            }
        }

        const title = id_orden ? 'editado' : 'agregado';
        res.status(200).json({
            error: !response.affectedRows > 0,
            message: `El color ha sido ${title} exitosamente`
        });
    } catch (error) {
        return res.status(500).json({ message: 'Ha ocurrido un error interno', error });
    }
};
