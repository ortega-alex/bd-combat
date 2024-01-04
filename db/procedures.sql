-- usuarios por id o estado
DELIMITER //
CREATE PROCEDURE sel_usuario(IN p_id_usuario INT, IN p_estado CHAR(1))
BEGIN
    IF p_id_usuario IS NOT NULL THEN
        -- Recuperar por ID
        SELECT * FROM bd_combat.usuario WHERE id_usuario = p_id_usuario;
    ELSE
        IF p_estado IS NOT NULL THEN
            -- Recuperar por estado
            SELECT * FROM bd_combat.usuario WHERE estado = p_estado;
        ELSE
            -- Recuperar todos los registros
            SELECT * FROM bd_combat.usuario;
        END IF;
    END IF;
END //

DELIMITER ;