import { addOrUpdateMeasure, getAllMeasure } from '../models';

export const getAllMeasureCtr = async (_, res) => {
    try {
        const users = await getAllMeasure();
        res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: 'Ha ocurrido un error interno', error });
    }
};

export const addOrUpdateMeasureCtr = async (req, res) => {
    try {
        const { id_medida, medida } = req.body;
        if (!medida) return res.status(203).json({ error: true, message: 'El nombre de la medida es obligatorio' });
        const affectedRows = await addOrUpdateMeasure(req.body);
        const title = id_medida ? 'editado' : 'agregado';
        res.status(200).json({
            error: !affectedRows > 0,
            message: `La medida ha sido ${title} exitosamente`
        });
    } catch (error) {
        return res.status(500).json({ message: 'Ha ocurrido un error interno', error });
    }
};
