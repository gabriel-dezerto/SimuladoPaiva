import { create, read, update, deleteRecord } from '../config/database.js';

class ClienteModel {

    // Buscar todos os clientes
    static async listarTodos() {
        try {
            const clientes = await read('clientes');
            return clientes;
        } catch (error) {
            console.error('Erro ao listar clientes:', error);
        }
    }

    // Buscar cliente por ID
    static async buscarPorId(id) {
        try {
            const clientes = await read('clientes', `id_cliente = ${id}`);
            return clientes[0];
        } catch (error) {
            console.error('Erro ao buscar cliente:', error);
        }
    }

    // Criar novo cliente
    static async criar(dados) {
        try {
            const id = await create('clientes', dados);
            return { id, ...dados };
        } catch (error) {
            console.error('Erro ao criar cliente:', error);
        }
    }

    // Atualizar cliente
    static async atualizar(id, dados) {
        try {
            await update('clientes', dados, `id_cliente = ${id}`);
        } catch (error) {
            console.error('Erro ao atualizar cliente:', error);
        }
    }

    // Excluir cliente
    static async excluir(id) {
        try {
            await deleteRecord('clientes', `id_cliente = ${id}`);
        } catch (error) {
            console.error('Erro ao excluir cliente:', error);
        }
    }
}

export default ClienteModel;
