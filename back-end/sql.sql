CREATE DATABASE `funil`;
use `funil`;

CREATE TABLE `colunas` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(50) NOT NULL,
    `ordem` INT NOT NULL,
    `status` TINYINT(1) NOT NULL DEFAULT '1',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;

CREATE TABLE `coluna_item` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(50) NOT NULL,
    `ordem` INT NOT NULL,
    `status` TINYINT(1) NOT NULL  DEFAULT '1',
    `coluna` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`coluna`) REFERENCES colunas(`id`)
) ENGINE = InnoDB;

INSERT INTO `colunas` (`id`, `descricao`, `ordem`, `status`)
VALUES
    (1, 'coluna 1', 1, 1),
    (2, 'coluna 2', 2, 1);

INSERT INTO `coluna_item` (`id`, `descricao`, `ordem`, `status`, `coluna`)
VALUES
    (1, 'item - 1', 1, 1, 1),
    (2, 'item - 2', 2, 1, 1),
    (4, 'item - 4', 3, 1, 2),
    (3, 'item - 3', 4, 1, 2);