-- Role
insert into roles (name)
values ('ROLE_ADMIN');
insert
into roles (name)
values ('ROLE_USER');
-- pass: 123
insert into users (name, lastname, age, email, password)
values ('admin', 'adminov', '40', 'admin@m.ru', '$2y$10$Nt0VFHM7MT/GvOPuCDS12OMrIibd3ChkRIEc7.8jSkWStRgM9qufu');
insert into users (name, lastname, age, email, password)
values ('user', 'userov', '20', 'user@m.ru', '$2y$10$Nt0VFHM7MT/GvOPuCDS12OMrIibd3ChkRIEc7.8jSkWStRgM9qufu');
-- role/user
insert into users_roles (user_id,  role_id) values ('1', '1');
insert into users_roles (user_id, role_id) values ('2', '2');
--






