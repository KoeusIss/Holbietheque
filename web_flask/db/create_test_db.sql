-- Drop database
DROP DATABASE IF EXISTS holbietheque_test_db;

-- Create database + user if doesn't exist
CREATE DATABASE IF NOT EXISTS holbietheque_test_db;
CREATE USER IF NOT EXISTS 'holbie_test'@'localhost';
SET PASSWORD FOR 'holbie_test'@'localhost' = 'holbie_test_pwd';
GRANT ALL ON holbietheque_test_db.* TO 'holbie_test'@'localhost';
GRANT SELECT ON performance_schema.* TO 'holbie_test'@'localhost';
FLUSH PRIVILEGES;
