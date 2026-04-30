create table usuarios (
	id_user int primary key auto_increment,
    nome_usuario varchar(50) not null,
    email varchar(100) not null,
    telefone varchar(20),
    senha_hash varchar(255) not null,
    criado_em datetime
);