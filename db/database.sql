-- MySQL Script generated by MySQL Workbench
-- Fri Jan  5 18:04:43 2024
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema bd_combat
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema bd_combat
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bd_combat` DEFAULT CHARACTER SET utf8 ;
USE `bd_combat` ;

-- -----------------------------------------------------
-- Table `bd_combat`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_combat`.`usuario` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(200) NOT NULL,
  `correo` VARCHAR(100) NOT NULL,
  `usuario` VARCHAR(45) NOT NULL,
  `contrasenia` VARCHAR(100) NOT NULL,
  `imagen` VARCHAR(200) NULL,
  `estado` CHAR(1) NULL DEFAULT 1,
  `fecha_creacion` DATETIME NULL DEFAULT current_timestamp(),
  `fecha_edicion` DATETIME NULL,
  PRIMARY KEY (`id_usuario`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
