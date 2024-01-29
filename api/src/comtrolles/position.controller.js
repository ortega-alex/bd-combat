import { addOrUpdatePosition, getAllPositions } from '../models';

export const getAllPositionsCtr = async (_, res) => {
    try {
        const users = await getAllPositions();
        res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: 'Ha ocurrido un error interno', error });
    }
};

export const addOrUpdatePositionCtr = async (req, res) => {
    try {
        const { id_puesto, puesto } = req.body;
        if (!puesto) return res.status(203).json({ error: true, message: 'El nombre del puesto es obligatorio' });
        const affectedRows = await addOrUpdatePosition(req.body);
        const title = id_puesto ? 'editado' : 'agregado';
        res.status(200).json({
            error: !affectedRows > 0,
            message: `El puesto ha sido ${title} exitosamente`
        });
    } catch (error) {
        return res.status(500).json({ message: 'Ha ocurrido un error interno', error });
    }
};
