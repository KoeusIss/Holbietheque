-- Drop database
DROP DATABASE IF EXISTS holbietheque_dev_db;

-- Create database + user if doesn't exist
CREATE DATABASE IF NOT EXISTS holbietheque_dev_db;
CREATE USER IF NOT EXISTS 'holbie_dev'@'localhost';
SET PASSWORD FOR 'holbie_dev'@'localhost' = 'holbie_dev_pwd';
GRANT ALL ON holbietheque_dev_db.* TO 'holbie_dev'@'localhost';
GRANT SELECT ON performance_schema.* TO 'holbie_dev'@'localhost';
FLUSH PRIVILEGES;
