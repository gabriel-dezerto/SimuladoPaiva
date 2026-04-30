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