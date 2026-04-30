create table equipamentos(
	id_eqp int primary key auto_increment,
    nome_eqp varchar(50) not null,
    descricao text,
    status_eqp enum('Disponivel', 'Emprestado') not null
);