create database simulado;
use simulado;

create table usuarios (
	id_user int primary key auto_increment,
    nome_usuario varchar(50) not null,
    email varchar(100) not null,
    telefone varchar(20),
    senha_hash varchar(255) not null,
    criado_em datetime
);

create table equipamentos(
	id_eqp int primary key auto_increment,
    nome_eqp varchar(50) not null,
    descricao text,
    status_eqp enum('Disponivel', 'Emprestado') not null
);

create table emprestimos(
	id_empr int primary key not null,
    data_saida date not null,
    data_dev_prevista date not null,
    data_dev_real date not null,
    status_empr enum('Aberto', 'Devolvido'),
    
    usuario_id int not null,
    eqp_id int not null,
    foreign key (usuario_id) references usuarios(id_user),
    foreign key (eqp_id) references equipamentos(id_eqp)
);

-- População inicial

-- Usuários
insert into usuarios(nome_usuario, email, senha_hash) values
('Joana Almeida', 'joana@email.com', 'senha_hashed_1'),
('Rafael Correa', 'rafael@email.com', 'senha_hashed_2'),
('Carlos Anselmo', 'carlos@email.com', 'senha_hashed_3');

-- Equipamentos
insert into equipamentos(nome_eqp, descricao, status_eqp) values
('Notebook Dell', 'Notebook Dell ideal para trabalho.', 'Disponivel'),
('Monitor Dell', 'Monitor Dell ideal para jogos.', 'Emprestado'),
('Projetor Epson', 'Projetos Epson ideal para apresentações', 'Disponivel');

-- Emprestimos
