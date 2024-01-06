import { addOrUpdateColor, getAllColor } from '../models';

export const getAllColorCtr = async (_, res) => {
    try {
        const users = await getAllColor();
        res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: 'Ha ocurrido un error interno', error });
    }
};

export const addOrUpdateColorCtr = async (req, res) => {
    try {
        const { id_color, color } = req.body;
        if (!color) return res.status(203).json({ error: true, message: 'El nombre del color es obligatorio' });
        const affectedRows = await addOrUpdateColor(req.body);
        const title = id_color ? 'editado' : 'agregado';
        res.status(200).json({
            error: !affectedRows > 0,
            message: `El color ha sido ${title} exitosamente`
        });
    } catch (error) {
        return res.status(500).json({ message: 'Ha ocurrido un error interno', error });
    }
};
