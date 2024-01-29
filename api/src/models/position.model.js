import { executeQuery } from '../utilities';

export const getAllPositions = async () => {
    const strQuery = `  SELECT *,
                            IF (estado = 1, 'Activo', 'Inactivo') AS _estado 
                        FROM puesto 
                        ORDER BY puesto`;
    const res = await executeQuery(strQuery);
    if (res.error) throw res.error.sqlMessage;
    return res;
};

export const addOrUpdatePosition = async ({ id_puesto, puesto, estado }) => {
    const strQuery = `  INSERT INTO puesto (id_puesto, puesto) 
                        VALUES (?, ?) AS val
                        ON DUPLICATE KEY UPDATE
                        puesto = val.puesto,
                        estado = ?,
                        fecha_edicion = CURRENT_TIMESTAMP()`;
    const res = await executeQuery(strQuery, [id_puesto, puesto, estado ?? 1]);
    if (res.error) throw res.error.sqlMessage;
    return res.affectedRows;
};
