import { addOrUpdateInventory, getAllInventory } from '../models';

export const getAllInventoryCtr = async (_, res) => {
    try {
        const users = await getAllInventory();
        res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: 'Ha ocurrido un error interno', error });
    }
};

export const addOrUpdateInventoryCtr = async (req, res) => {
    try {
        const { id_inventario, id_producto, id_medida, id_usuario, cantidad, precio_venta, precio_compra, descripcion } = req.body;
        if (!id_producto) return res.status(203).json({ error: true, message: 'El producto es obligatorio' });
        if (!id_medida) return res.status(203).json({ error: true, message: 'La medida es obligatorio' });
        if (!id_usuario) return res.status(203).json({ error: true, message: 'El usuario es obligatorio' });
        if (!cantidad) return res.status(203).json({ error: true, message: 'La cantidad es obligatorio' });
        if (!precio_venta) return res.status(203).json({ error: true, message: 'El Precio de venta es obligatorio' });
        if (!precio_compra) return res.status(203).json({ error: true, message: 'El Precio de compra es obligatorio' });
        if (!descripcion) return res.status(203).json({ error: true, message: 'La descripcion  es obligatorio' });

        const affectedRows = await addOrUpdateInventory(req.body);
        const title = id_inventario ? 'actualizado' : 'agregado';
        res.status(200).json({
            error: !affectedRows > 0,
            message: `El inventario ha sido ${title} exitosamente`
        });
    } catch (error) {
        return res.status(500).json({ message: 'Ha ocurrido un error interno', error });
    }
};
