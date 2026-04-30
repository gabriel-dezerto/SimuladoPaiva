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