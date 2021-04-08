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
CREATE OR REPLACE VIEW public.rol_permiso_view
AS SELECT rp.id AS rol_permiso_id,
    rp.rol_id,
    rp.permiso_id,
    p.nombre AS permiso_nombre,
    p.descripcion AS permiso_descripcion,
    rp.activo AS rol_permiso_activo
   FROM rol_permiso rp
     JOIN permiso p ON rp.permiso_id = p.id;

CREATE OR REPLACE VIEW public.usuario_rol_view
AS SELECT ur.id AS usuario_rol_id,
    ur.rol_id,
    ur.usuario_id,
    r.nombre,
    ur.activo 
   FROM usuario_rol ur
     JOIN rol r ON r.id = ur.rol_id;
