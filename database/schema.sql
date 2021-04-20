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

CREATE TABLE public.proyecto (
	id serial NOT NULL,
	nombre varchar NOT NULL,
	descripcion varchar NULL,
	activo bool NOT NULL
);

CREATE TABLE public.tarea (
	id serial NOT NULL,
	estado varchar NOT NULL,
	descripcion varchar NOT NULL,
	id_tarea_padre int4 NULL,
	activo bool NOT NULL
);

CREATE TABLE public.proyecto_tarea (
	id serial NOT NULL,
	proyecto_id int4 NOT NULL,
	tarea_id int4 NOT NULL,
	activo bool NOT NULL
);

CREATE TABLE public.linea_base (
	id serial NOT NULL,
	nombre varchar NOT NULL,
	estado varchar NOT NULL,
	activo bool NOT NULL
);

CREATE TABLE public.linea_base_tarea (
	id serial NOT NULL,
	linea_base_id int4 NOT NULL,
	tarea_id int4 NOT NULL,
	activo bool NOT NULL
);

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

CREATE OR REPLACE VIEW public.proyecto_tarea_view
AS SELECT pt.id AS proyecto_tarea_id,
    pt.proyecto_id,
    pt.tarea_id,
    t.descripcion as tarea_descripcion,
	t.estado as tarea_estado,
    pt.activo AS proyecto_tarea_activo
   FROM proyecto_tarea pt
     JOIN tarea t ON pt.tarea_id = t.id

CREATE OR REPLACE VIEW public.linea_base_tarea_view
AS SELECT lbt.id AS linea_base_tarea_id,
    lb.id AS linea_base_id,
    lb.nombre AS linea_base_nombre,
    lb.estado AS linea_base_estado,
    t.id AS tarea_id,
    t.descripcion AS tarea_descripcion,
    t.estado AS tarea_estado,
    lbt.activo AS linea_base_tarea_activo
   FROM linea_base_tarea lbt
     JOIN linea_base lb ON lbt.linea_base_id = lb.id
     JOIN tarea t ON lbt.tarea_id = t.id;