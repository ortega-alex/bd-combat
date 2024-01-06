import { executeQuery } from '../utilities';

export const getAllMeasure = async () => {
    const strQuery = `  SELECT *,
                            IF (estado = 1, 'Activo', 'Inactivo') AS _estado 
                        FROM medida 
                        ORDER BY medida`;
    const res = await executeQuery(strQuery);
    if (res.error) throw res.error.sqlMessage;
    return res;
};

export const addOrUpdateMeasure = async ({ id_medida, medida, estado }) => {
    const strQuery = `  INSERT INTO medida (id_medida, medida) 
                        VALUES (?, ?) AS val
                        ON DUPLICATE KEY UPDATE
                        medida = val.medida,
                        estado = ?,
                        fecha_edicion = CURRENT_TIMESTAMP()`;
    const res = await executeQuery(strQuery, [id_medida, medida, estado]);
    if (res.error) throw res.error.sqlMessage;
    return res.affectedRows;
};
