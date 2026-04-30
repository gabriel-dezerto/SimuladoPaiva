import UsuarioModel from '../models/UsuarioModel.js';
import { ApiError } from '../utils/ApiError.js';

class ClienteController {

    // GET /api/clientes - Listar todos os clientes
    static async listarTodos(req, res, next) {
        try {
            const pagina = parseInt(req.query.pagina) || 1;
            const limite = parseInt(req.query.limite) || 10;

            const resultado = await UsuarioModel.listarTodos(pagina, limite);
            
            res.status(200).json({
                sucesso: true,
                mensagem: 'Clientes listados com sucesso',
                dados: resultado
            });
        } catch (erro) {
            next(erro);
        }
    }

    // GET /api/clientes/:id - Buscar cliente por ID
    static async buscarPorId(req, res, next) {
        try {
            const { id } = req.params;

            if (!id) {
                throw new ApiError('ID do cliente é obrigatório', 400);
            }

            const cliente = await UsuarioModel.buscarPorId(id);

            if (!cliente) {
                throw new ApiError('Cliente não encontrado', 404);
            }

            res.status(200).json({
                sucesso: true,
                mensagem: 'Cliente encontrado',
                dados: cliente
            });
        } catch (erro) {
            next(erro);
        }
    }

    // POST /api/clientes - Cadastrar novo cliente
    static async criar(req, res, next) {
        try {
            const { nome_usuario, email, telefone, senha } = req.body;

            // Validar campos obrigatórios
            if (!nome_usuario || !email || !senha) {
                throw new ApiError('Nome, email e senha são obrigatórios', 400);
            }

            // Verificar se email já existe
            const clienteExistente = await UsuarioModel.buscarPorEmail(email);
            if (clienteExistente) {
                throw new ApiError('Email já cadastrado', 409);
            }

            const dadosCliente = {
                nome_usuario,
                email,
                telefone: telefone || null,
                senha
            };

            const clienteId = await UsuarioModel.criar(dadosCliente);

            res.status(201).json({
                sucesso: true,
                mensagem: 'Cliente criado com sucesso',
                dados: {
                    id_user: clienteId,
                    nome_usuario,
                    email,
                    telefone
                }
            });
        } catch (erro) {
            next(erro);
        }
    }

    // PUT /api/clientes/:id - Atualizar dados de um cliente
    static async atualizar(req, res, next) {
        try {
            const { id } = req.params;
            const { nome_usuario, email, telefone, senha } = req.body;

            if (!id) {
                throw new ApiError('ID do cliente é obrigatório', 400);
            }

            // Verificar se cliente existe
            const clienteExistente = await UsuarioModel.buscarPorId(id);
            if (!clienteExistente) {
                throw new ApiError('Cliente não encontrado', 404);
            }

            // Preparar dados para atualização
            const dadosAtualizacao = {};
            if (nome_usuario) dadosAtualizacao.nome_usuario = nome_usuario;
            if (email) dadosAtualizacao.email = email;
            if (telefone) dadosAtualizacao.telefone = telefone;
            if (senha) dadosAtualizacao.senha = senha;

            if (Object.keys(dadosAtualizacao).length === 0) {
                throw new ApiError('Nenhum dado para atualizar', 400);
            }

            await UsuarioModel.atualizar(id, dadosAtualizacao);

            res.status(200).json({
                sucesso: true,
                mensagem: 'Cliente atualizado com sucesso',
                dados: {
                    id_user: id,
                    ...dadosAtualizacao
                }
            });
        } catch (erro) {
            next(erro);
        }
    }

    // DELETE /api/clientes/:id - Remover um cliente
    static async excluir(req, res, next) {
        try {
            const { id } = req.params;

            if (!id) {
                throw new ApiError('ID do cliente é obrigatório', 400);
            }

            // Verificar se cliente existe
            const clienteExistente = await UsuarioModel.buscarPorId(id);
            if (!clienteExistente) {
                throw new ApiError('Cliente não encontrado', 404);
            }

            await UsuarioModel.excluir(id);

            res.status(200).json({
                sucesso: true,
                mensagem: 'Cliente excluído com sucesso'
            });
        } catch (erro) {
            next(erro);
        }
    }
}

export default ClienteController;
