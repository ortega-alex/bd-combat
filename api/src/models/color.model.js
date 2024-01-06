import { executeQuery } from '../utilities';

export const getAllColor = async () => {
    const strQuery = `  SELECT *,
                            IF (estado = 1, 'Activo', 'Inactivo') AS _estado 
                        FROM color 
                        ORDER BY color`;
    const res = await executeQuery(strQuery);
    if (res.error) throw res.error.sqlMessage;
    return res;
};

export const addOrUpdateColor = async ({ id_color, color, estado }) => {
    const strQuery = `  INSERT INTO color (id_color, color) 
                        VALUES (?, ?) AS val
                        ON DUPLICATE KEY UPDATE
                        color = val.color,
                        estado = ?,
                        fecha_edicion = CURRENT_TIMESTAMP()`;
    const res = await executeQuery(strQuery, [id_color, color, estado]);
    if (res.error) throw res.error.sqlMessage;
    return res.affectedRows;
};
