

create table usuarios(
id int auto_increment,
nombre varchar(10),
password varchar(8),
primary key(id)
);

insert into usuarios( nombre, password) values ('breayan',1123);

create table evento (
id int auto_increment not null,
titulo varchar(20) not null,
fecha int not null,
horaInicio time,
horaFin time,
lugar varchar(30),
descripcion varchar(100),
usuario varchar(10),
primary key(id));

insert into evento(titulo,fecha,horaInicio,horaFin,lugar,descripcion) values ('prueba','2022-11-28','23:48','23:49','prueba','prueba');

SELECT * FROM ejemplo80640.usuarios;
SELECT * FROM ejemplo80640.evento;

select * from ejemplo80640.evento where fecha >= curdate();
select * from ejemplo80640.evento where fecha < curdate();