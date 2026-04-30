import { create, read, update, getConnection } from '../config/database.js';

class EmprestimoModel {

    // Buscar todos os empréstimos
    static async listarTodos(pagina = 1, limite = 10) {
        try {
            const offset = (pagina - 1) * limite;
            const connection = await getConnection();
            try {
                const sql = `
                    SELECT 
                        e.id_empr,
                        e.data_saida,
                        e.data_dev_prevista,
                        e.data_dev_real,
                        e.status_empr,
                        u.id_user,
                        u.nome_usuario,
                        eq.id_eqp,
                        eq.nome_eqp
                    FROM emprestimos e
                    JOIN usuarios u ON e.usuario_id = u.id_user
                    JOIN equipamentos eq ON e.eqp_id = eq.id_eqp
                    ORDER BY e.id_empr DESC
                    LIMIT ? OFFSET ?
                `;
                const [emprestimos] = await connection.execute(sql, [limite, offset]);

                const [totalResult] = await connection.execute('SELECT COUNT(*) as total FROM emprestimos');
                const total = totalResult[0].total;

                return {
                    emprestimos,
                    total,
                    pagina,
                    limite,
                    totalPaginas: Math.ceil(total / limite)
                };
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error('Erro ao listar empréstimos:', error);
            throw error;
        }
    }

    // Buscar empréstimos em aberto (sem devolução registrada)
    static async listarEmAberto() {
        try {
            const connection = await getConnection();
            try {
                const sql = `
                    SELECT 
                        e.id_empr,
                        e.data_saida,
                        e.data_dev_prevista,
                        e.data_dev_real,
                        e.status_empr,
                        u.id_user,
                        u.nome_usuario,
                        eq.id_eqp,
                        eq.nome_eqp
                    FROM emprestimos e
                    JOIN usuarios u ON e.usuario_id = u.id_user
                    JOIN equipamentos eq ON e.eqp_id = eq.id_eqp
                    WHERE e.data_dev_real IS NULL
                    ORDER BY e.data_dev_prevista ASC
                `;
                const [emprestimos] = await connection.execute(sql);
                return emprestimos;
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error('Erro ao listar empréstimos em aberto:', error);
            throw error;
        }
    }

    // Buscar empréstimo por ID
    static async buscarPorId(id) {
        try {
            const connection = await getConnection();
            try {
                const sql = `
                    SELECT 
                        e.id_empr,
                        e.data_saida,
                        e.data_dev_prevista,
                        e.data_dev_real,
                        e.status_empr,
                        u.id_user,
                        u.nome_usuario,
                        eq.id_eqp,
                        eq.nome_eqp
                    FROM emprestimos e
                    JOIN usuarios u ON e.usuario_id = u.id_user
                    JOIN equipamentos eq ON e.eqp_id = eq.id_eqp
                    WHERE e.id_empr = ?
                `;
                const [emprestimos] = await connection.execute(sql, [id]);
                return emprestimos[0] || null;
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error('Erro ao buscar empréstimo por ID:', error);
            throw error;
        }
    }

    // Criar novo empréstimo (registrar saída)
    static async criar(dados) {
        try {
            const id = await create('emprestimos', dados);
            return { id_empr: id, ...dados };
        } catch (error) {
            console.error('Erro ao criar empréstimo:', error);
            throw error;
        }
    }

    // Atualizar empréstimo (ex: registrar devolução)
    static async atualizar(id, dados) {
        try {
            const resultado = await update('emprestimos', dados, `id_empr = ${id}`);
            return resultado;
        } catch (error) {
            console.error('Erro ao atualizar empréstimo:', error);
            throw error;
        }
    }
}

export default EmprestimoModel;
