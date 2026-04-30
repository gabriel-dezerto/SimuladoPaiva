import UsuarioModel from '../models/UsuarioModel.js';

class ClienteController {

    // GET /api/clientes - Listar todos os clientes
    static async listarTodos(req, res) {
        // TODO: Buscar todos os usuários no banco de dados
        
        // TODO: Retornar a lista com status 200
    }

    // GET /api/usuarios/:id - Buscar usuário por ID
    static async buscarPorId(req, res) {
        // TODO: Obter o :id da URL → req.params.id
        // TODO: Buscar o usuário no banco de dados
        // TODO: Retornar 404 se não encontrado
        // TODO: Retornar o usuário com status 200 se encontrado
    }

    // POST /api/usuarios - Cadastrar novo usuário
    static async criar(req, res) {
        // TODO: Obter os dados do body → req.body
        // TODO: Validar os campos obrigatórios (ex: nome, cpf_cnpj)
        // TODO: Criar o usuário no banco de dados
        // TODO: Retornar o usuário criado com status 201
    }

    // PUT /api/usuarios/:id - Atualizar dados de um usuário
    static async atualizar(req, res) {
        // TODO: Obter o :id da URL e os dados do body
        // TODO: Verificar se o usuário existe (retornar 404 se não)
        // TODO: Atualizar os dados no banco de dados
        // TODO: Retornar confirmação com status 200
    }

    // DELETE /api/usuarios/:id - Remover um usuário
    static async excluir(req, res) {
        // TODO: Obter o :id da URL
        // TODO: Verificar se o usuário existe (retornar 404 se não)
        // TODO: Excluir o usuário do banco de dados
        // TODO: Retornar confirmação com status 200
    }
}

export default ClienteController;
