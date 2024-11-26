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