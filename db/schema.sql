/* check if database already exists and delete if so */
DROP DATABASE IF EXISTS `employees_db` ;

/* create new database */
CREATE SCHEMA `employees_db` ;

/* create department table */
CREATE TABLE `employees_db`.`department` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`id`));

/* create role table */
CREATE TABLE `employees_db`.`role` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(30) NOT NULL,
  `salary` DECIMAL NOT NULL,
  `department_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_role_1_idx` (`department_id` ASC) VISIBLE,
  CONSTRAINT `fk_role_1`
    FOREIGN KEY (`department_id`)
    REFERENCES `employees_db`.`department` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

/* create employee table */
CREATE TABLE `employees_db`.`employee` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(30) NOT NULL,
  `last_name` VARCHAR(30) NOT NULL,
  `role_id` INT UNSIGNED NOT NULL,
  `manager_id` INT UNSIGNED NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_employee_1_idx` (`role_id` ASC) VISIBLE,
  CONSTRAINT `fk_employee_1`
    FOREIGN KEY (`role_id`)
    REFERENCES `employees_db`.`role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


ALTER TABLE `employees_db`.`employee` 
ADD INDEX `fk_employee_2_idx` (`manager_id` ASC) VISIBLE;
;
ALTER TABLE `employees_db`.`employee` 
ADD CONSTRAINT `fk_employee_2`
  FOREIGN KEY (`manager_id`)
  REFERENCES `employees_db`.`employee` (`id`)
  ON DELETE SET NULL
  ON UPDATE NO ACTION;
