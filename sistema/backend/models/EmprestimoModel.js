import { create, read, update, getConnection } from '../config/database.js';

class EmprestimoModel {

    // Buscar todos os empréstimos
    static async listarTodos() {
        // TODO: Implementar a busca de todos os empréstimos
        // Dica: use a função read('emprestimos')
        // Dica extra: você pode fazer um JOIN com Clientes e Equipamentos
        //             para retornar os nomes em vez de apenas os IDs
    }

    // Buscar empréstimos em aberto (sem devolução registrada)
    static async listarEmAberto() {
        // TODO: Implementar a busca de empréstimos ainda não devolvidos
        // Dica: use a função read('emprestimos', 'data_devolucao_real IS NULL')
    }

    // Buscar empréstimo por ID
    static async buscarPorId(id) {
        // TODO: Implementar a busca por ID
        // Dica: use a função read('emprestimos', `id_emprestimo = ${id}`)
        //       e retorne apenas o primeiro resultado (rows[0])
    }

    // Criar novo empréstimo (registrar saída)
    static async criar(dados) {
        // TODO: Implementar a criação do empréstimo
        // Dica: use a função create('emprestimos', dados)
        //       ela retorna o ID do registro inserido
    }

    // Atualizar empréstimo (ex: registrar devolução)
    static async atualizar(id, dados) {
        // TODO: Implementar a atualização do empréstimo
        // Dica: use a função update('emprestimos', dados, `id_emprestimo = ${id}`)
    }
}

export default EmprestimoModel;
