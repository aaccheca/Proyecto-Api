-- crear tabla items
drop table if exists items;

create table items (
    id serial primary key,
    name varchar(100) not null,
    description text
);

-- datos de ejemplo
insert into items (name, description) values
('Primer item', 'Descripción del primer item'),
('Segundo item', 'Descripción del segundo item');