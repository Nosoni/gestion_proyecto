--tables
CREATE TABLE public.usuario (
	id serial NOT NULL,
	usuario varchar NOT NULL,
	"password" varchar NOT NULL,
	activo bool NOT NULL
);

CREATE TABLE public.rol (
	id serial NOT NULL,
	nombre varchar NOT NULL,
	activo bool NOT NULL
);

CREATE TABLE public.permiso (
	id serial NOT NULL,
	nombre varchar NOT NULL,
	descripcion varchar NOT NULL,
	activo bool NOT NULL
);

CREATE TABLE public.rol_permiso (
	id serial NOT NULL,
	rol_id int4 NOT NULL,
	permiso_id int4 NOT NULL,
	activo bool NOT NULL
);
COMMENT ON TABLE public.rol_permiso IS 'permisos asignados a los roles';

CREATE TABLE public.usuario_rol (
	id serial NOT NULL,
	usuario_id int NOT NULL,
	rol_id int NOT NULL,
	activo bool NOT NULL
);
COMMENT ON TABLE public.usuario_rol IS 'roles asignados a usuarios';

--views
create or replace
view rol_permiso_view as
select
	rp.id as rol_permiso_id,
	rp.rol_id,
	p.id as permiso_id,
	p.nombre as permiso_nombre ,
	p.descripcion as permiso_descripcion,
	rp.activo as rol_permiso_activo
from
	rol_permiso rp
join permiso p on
	rp.permiso_id = p.id