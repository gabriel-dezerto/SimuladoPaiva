import { create, read, update, deleteRecord, getConnection } from '../config/database.js';

class EquipamentoModel {

    // Buscar todos os equipamentos
    static async listarTodos(pagina = 1, limite = 10) {
        try {
            const offset = (pagina - 1) * limite;
            const connection = await getConnection();
            try {
                const sql = 'SELECT * FROM equipamentos ORDER BY id_eqp DESC LIMIT ? OFFSET ?';
                const [equipamentos] = await connection.execute(sql, [limite, offset]);

                const [totalResult] = await connection.execute('SELECT COUNT(*) as total FROM equipamentos');
                const total = totalResult[0].total;

                return {
                    equipamentos,
                    total,
                    pagina,
                    limite,
                    totalPaginas: Math.ceil(total / limite)
                };
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error('Erro ao listar equipamentos:', error);
            throw error;
        }
    }

    // Buscar equipamento por ID
    static async buscarPorId(id) {
        try {
            const equipamentos = await read('equipamentos', `id_eqp = ${id}`);
            return equipamentos[0] || null;
        } catch (error) {
            console.error('Erro ao buscar equipamento:', error);
            throw error;
        }
    }

    // Criar novo equipamento
    static async criar(dados) {
        try {
            const id = await create('equipamentos', dados);
            return { id_eqp: id, ...dados };
        } catch (error) {
            console.error('Erro ao criar equipamento:', error);
            throw error;
        }
    }

    // Atualizar equipamento
    static async atualizar(id, dados) {
        try {
            const resultado = await update('equipamentos', dados, `id_eqp = ${id}`);
            return resultado;
        } catch (error) {
            console.error('Erro ao atualizar equipamento:', error);
            throw error;
        }
    }

    // Excluir equipamento
    static async excluir(id) {
        try {
            const resultado = await deleteRecord('equipamentos', `id_eqp = ${id}`);
            return resultado;
        } catch (error) {
            console.error('Erro ao excluir equipamento:', error);
            throw error;
        }
    }
}

export default EquipamentoModel;
