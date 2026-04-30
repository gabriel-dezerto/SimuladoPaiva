import EquipamentoModel from '../models/EquipamentoModel.js';
import { ApiError } from '../utils/ApiError.js';

class EquipamentoController {

    // GET /api/equipamentos - Listar todos os equipamentos
    static async listarTodos(req, res, next) {
        try {
            const pagina = parseInt(req.query.pagina) || 1;
            const limite = parseInt(req.query.limite) || 10;

            const resultado = await EquipamentoModel.listarTodos(pagina, limite);

            res.status(200).json({
                sucesso: true,
                mensagem: 'Equipamentos listados com sucesso',
                dados: resultado
            });
        } catch (erro) {
            next(erro);
        }
    }

    // GET /api/equipamentos/:id - Buscar equipamento por ID
    static async buscarPorId(req, res, next) {
        try {
            const { id } = req.params;

            if (!id) {
                throw new ApiError('ID do equipamento é obrigatório', 400);
            }

            const equipamento = await EquipamentoModel.buscarPorId(id);

            if (!equipamento) {
                throw new ApiError('Equipamento não encontrado', 404);
            }

            res.status(200).json({
                sucesso: true,
                mensagem: 'Equipamento encontrado',
                dados: equipamento
            });
        } catch (erro) {
            next(erro);
        }
    }

    // POST /api/equipamentos - Cadastrar novo equipamento
    static async criar(req, res, next) {
        try {
            const { nome_eqp, descricao, status_eqp } = req.body;

            // Validar campos obrigatórios
            if (!nome_eqp) {
                throw new ApiError('Nome do equipamento é obrigatório', 400);
            }

            const dadosEquipamento = {
                nome_eqp,
                descricao: descricao || null,
                status_eqp: status_eqp || 'Disponivel'
            };

            const equipamento = await EquipamentoModel.criar(dadosEquipamento);

            res.status(201).json({
                sucesso: true,
                mensagem: 'Equipamento criado com sucesso',
                dados: equipamento
            });
        } catch (erro) {
            next(erro);
        }
    }

    // PUT /api/equipamentos/:id - Atualizar dados de um equipamento
    static async atualizar(req, res, next) {
        try {
            const { id } = req.params;
            const { nome_eqp, descricao, status_eqp } = req.body;

            if (!id) {
                throw new ApiError('ID do equipamento é obrigatório', 400);
            }

            // Verificar se equipamento existe
            const equipamentoExistente = await EquipamentoModel.buscarPorId(id);
            if (!equipamentoExistente) {
                throw new ApiError('Equipamento não encontrado', 404);
            }

            // Preparar dados para atualização
            const dadosAtualizacao = {};
            if (nome_eqp) dadosAtualizacao.nome_eqp = nome_eqp;
            if (descricao) dadosAtualizacao.descricao = descricao;
            if (status_eqp) dadosAtualizacao.status_eqp = status_eqp;

            if (Object.keys(dadosAtualizacao).length === 0) {
                throw new ApiError('Nenhum dado para atualizar', 400);
            }

            await EquipamentoModel.atualizar(id, dadosAtualizacao);

            res.status(200).json({
                sucesso: true,
                mensagem: 'Equipamento atualizado com sucesso',
                dados: {
                    id_eqp: id,
                    ...dadosAtualizacao
                }
            });
        } catch (erro) {
            next(erro);
        }
    }

    // DELETE /api/equipamentos/:id - Remover um equipamento
    static async excluir(req, res, next) {
        try {
            const { id } = req.params;

            if (!id) {
                throw new ApiError('ID do equipamento é obrigatório', 400);
            }

            // Verificar se equipamento existe
            const equipamentoExistente = await EquipamentoModel.buscarPorId(id);
            if (!equipamentoExistente) {
                throw new ApiError('Equipamento não encontrado', 404);
            }

            await EquipamentoModel.excluir(id);

            res.status(200).json({
                sucesso: true,
                mensagem: 'Equipamento excluído com sucesso'
            });
        } catch (erro) {
            next(erro);
        }
    }
}

export default EquipamentoController;
