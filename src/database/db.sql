CREATE DATABASE database_Notas;

--TABLA DE USUARIOS
USE database_Notas;

CREATE TABLE users(
    id INT(11) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(60) NOT NULL,
    name VARCHAR(50) NOT NULL,
    UNIQUE KEY (email)
);

ALTER TABLE users
ADD PRIMARY KEY (id);

ALTER TABLE users
MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

DESCRIBE users;

--TABLA DE NOTAS

CREATE TABLE notas(
    id INT(11) NOT NULL,
    title VARCHAR(150) NOT NULL,    
    description TEXT,
    user_id INT(11),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
    );

    ALTER TABLE notas
    ADD PRIMARY KEY (id);

    ALTER TABLE notas
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

    DESCRIBE notas;

--TABLA DE ANALISIS
CREATE TABLE analisis(
    id INT(11) NOT NULL,
    title VARCHAR(150) NOT NULL,    
    description TEXT,
    user_id INT(11),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
    );

    ALTER TABLE notas
    ADD PRIMARY KEY (id);

    ALTER TABLE notas
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

    DESCRIBE notas;
