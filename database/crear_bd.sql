--ingresar a postgres
--sudo su - postgres
--psql

--crear usuario
CREATE USER inge_dos WITH PASSWORD 'ingedos';
--crear base de datos
CREATE DATABASE inge_dos;
--dar privilegios al usuario
GRANT ALL PRIVILEGES ON DATABASE inge_dos to inge_dos;
