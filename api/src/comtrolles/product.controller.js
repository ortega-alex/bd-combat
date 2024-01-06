import { addOrUpdateProduct, getAllProduts } from '../models';

export const getAllProductsCtr = async (_, res) => {
    try {
        const users = await getAllProduts();
        res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: 'Ha ocurrido un error interno', error });
    }
};

export const addOrUpdateProductCtr = async (req, res) => {
    try {
        const { id_producto, producto } = req.body;
        if (!producto) return res.status(203).json({ error: true, message: 'El nombre del producto es obligatorio' });
        const affectedRows = await addOrUpdateProduct(req.body);
        const title = id_producto ? 'editado' : 'agregado';
        res.status(200).json({
            error: !affectedRows > 0,
            message: `El producto ha sido ${title} exitosamente`
        });
    } catch (error) {
        return res.status(500).json({ message: 'Ha ocurrido un error interno', error });
    }
};
