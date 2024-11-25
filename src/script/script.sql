--criação das tabelas (será salvo depois)

DROP TABLE IF EXISTS tb_user, tb_job, tb_application, tb_skill, tb_user_skill;

CREATE TABLE IF NOT EXISTS tb_user (
	ID serial PRIMARY KEY,
	name varchar(80),
	email varchar(80),
	password varchar(80),
	type varchar(20)
);

CREATE TABLE IF NOT EXISTS tb_job (
	ID serial PRIMARY KEY,
	title varchar(80),
	description varchar(300),
	phase varchar(30),
	model varchar(30),
	salary varchar(30),
	"location" varchar(50),
	openingdate timestamptz,
	closingdate timestamptz,
	open_by integer references tb_user(ID)
);

CREATE TABLE tb_skill (
	ID serial PRIMARY KEY,
	name varchar(80)
);

CREATE TABLE tb_application (
	ID serial PRIMARY KEY,
	"user" integer references tb_user(ID),
	job integer references tb_job(ID),
	date timestamptz
);

CREATE TABLE tb_user_skill(
	"user" integer references tb_user(ID),
	skill integer references tb_skill(ID)
);

insert into tb_user (name, email, password, type) values ('Lucas Bot', 'lucas@bot.com', '1234', 'admin');
insert into tb_user (name, email, password, type) values ('Mario Bot', 'mario@bot.com', '1234', 'candidate');
insert into tb_user (name, email, password, type) values ('Pedro Bot', 'pedro@bot.com', '1234', 'candidate');
insert into tb_user (name, email, password, type) values ('Carol Bot', 'carol@bot.com', '1234', 'candidate');
insert into tb_user (name, email, password, type) values ('Victoria Bot', 'victoria@bot.com', '1234', 'recruiter');
insert into tb_user (name, email, password, type) values ('Larissa Bot', 'larissa@bot.com', '1234', 'recruiter');

insert into tb_job (title, description, phase, open_by) values ('Desenvolvedor front-end junior', 'tb_job de desenvolvedor front-end junior', 'open', 5);
insert into tb_job (title, description, phase, open_by) values ('Ux designer pleno', 'tb_job de analista ux designer pleno', 'open', 6);

insert into tb_skill(name) values ('java');
insert into tb_skill(name) values ('javascript');
insert into tb_skill(name) values ('php');
insert into tb_skill(name) values ('html');
insert into tb_skill(name) values ('css');
insert into tb_skill(name) values ('typescript');

insert into tb_user_skill values (1, 1);
insert into tb_user_skill values (1, 3);
insert into tb_user_skill values (1, 5);
insert into tb_user_skill values (2, 2);
insert into tb_user_skill values (2, 4);
insert into tb_user_skill values (3, 1);
insert into tb_user_skill values (3, 5);
insert into tb_user_skill values (3, 6);

insert into tb_application("user", job) values (2, 1);
insert into tb_application("user", job) values (2, 2);
insert into tb_application("user", job) values (3, 1);
insert into tb_application("user", job) values (4, 2);

-- valores de teste

select * from tb_skill;

select * from tb_application;

select * from tb_user_skill;

select tb_user.id, tb_user.name, tb_user.email, tb_user.password from tb_user ORDER BY tb_user.id;

select tb_job.id, tb_job.title, tb_job.description, tb_job.phase, tb_job.open_by, tb_user.name from tb_job INNER JOIN tb_user ON tb_job.open_by = tb_user.ID;
