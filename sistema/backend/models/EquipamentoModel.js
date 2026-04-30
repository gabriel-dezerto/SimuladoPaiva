import { create, read, update, deleteRecord } from '../config/database.js';

class EquipamentoModel {

    // Buscar todos os equipamentos
    static async listarTodos(pagina = 1, limite = 10) {
        try {
            const offset = (pagina - 1) * limite;
            const connection = await getConnection();
            try{
                const sql = 'SELECT * FROM equipamentos ORDER BY id_equipamento DESC LIMIT ? OFFSET ?';
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
        }
    }

    // Buscar equipamento por ID
    static async buscarPorId(id) {
        try {
            const equipamentos = await read('equipamentos', `id_eqp = ${id}`);
            return equipamentos[0];
        } catch (error) {
            console.error('Erro ao buscar equipamento:', error);
        }
    }

    // Criar novo equipamento
    static async criar(dados) {
        try {
            const id = await create('equipamentos', dados);
            return { id, ...dados };
        } catch (error) {
            console.error('Erro ao criar equipamento:', error);
        }
    }

    // Atualizar equipamento
    static async atualizar(id, dados) {
        try {
            await update('equipamentos', dados, `id_eqp = ${id}`);
        } catch (error) {
            console.error('Erro ao atualizar equipamento:', error);
        }
    }

    // Excluir equipamento
    static async excluir(id) {
        try {
            await deleteRecord('equipamentos', `id_eqp= ${id}`);
        } catch (error) {
            console.error('Erro ao excluir equipamento:', error);
        }
    }
}

export default EquipamentoModel;
