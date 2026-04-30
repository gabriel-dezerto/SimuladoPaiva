import EmprestimoModel from '../models/EmprestimoModel.js';
import EquipamentoModel from '../models/EquipamentoModel.js';
import UsuarioModel from '../models/UsuarioModel.js';
import { ApiError } from '../utils/ApiError.js';

class EmprestimoController {

    // GET /api/emprestimos - Listar todos os empréstimos
    static async listarTodos(req, res, next) {
        try {
            const pagina = parseInt(req.query.pagina) || 1;
            const limite = parseInt(req.query.limite) || 10;

            const resultado = await EmprestimoModel.listarTodos(pagina, limite);

            res.status(200).json({
                sucesso: true,
                mensagem: 'Empréstimos listados com sucesso',
                dados: resultado
            });
        } catch (erro) {
            next(erro);
        }
    }

    // GET /api/emprestimos/em-aberto - Listar empréstimos ainda não devolvidos
    static async listarEmAberto(req, res, next) {
        try {
            const emprestimos = await EmprestimoModel.listarEmAberto();

            res.status(200).json({
                sucesso: true,
                mensagem: 'Empréstimos em aberto listados com sucesso',
                dados: emprestimos
            });
        } catch (erro) {
            next(erro);
        }
    }

    // GET /api/emprestimos/:id - Buscar empréstimo por ID
    static async buscarPorId(req, res, next) {
        try {
            const { id } = req.params;

            if (!id) {
                throw new ApiError('ID do empréstimo é obrigatório', 400);
            }

            const emprestimo = await EmprestimoModel.buscarPorId(id);

            if (!emprestimo) {
                throw new ApiError('Empréstimo não encontrado', 404);
            }

            res.status(200).json({
                sucesso: true,
                mensagem: 'Empréstimo encontrado',
                dados: emprestimo
            });
        } catch (erro) {
            next(erro);
        }
    }

    // POST /api/emprestimos - Registrar saída de equipamento (novo empréstimo)
    static async registrarSaida(req, res, next) {
        try {
            const { usuario_id, eqp_id, data_dev_prevista } = req.body;

            // Validar campos obrigatórios
            if (!usuario_id || !eqp_id || !data_dev_prevista) {
                throw new ApiError('usuario_id, eqp_id e data_dev_prevista são obrigatórios', 400);
            }

            // Validar se o cliente existe
            const cliente = await UsuarioModel.buscarPorId(usuario_id);
            if (!cliente) {
                throw new ApiError('Cliente não encontrado', 404);
            }

            // Validar se o equipamento existe
            const equipamento = await EquipamentoModel.buscarPorId(eqp_id);
            if (!equipamento) {
                throw new ApiError('Equipamento não encontrado', 404);
            }

            // REGRA DE NEGÓCIO: verificar se o equipamento está disponível
            if (equipamento.status_eqp !== 'Disponivel') {
                throw new ApiError('Equipamento não está disponível para empréstimo', 400);
            }

            // Criar o registro do empréstimo
            const dadosEmprestimo = {
                usuario_id,
                eqp_id,
                data_saida: new Date().toISOString().split('T')[0],
                data_dev_prevista,
                data_dev_real: null,
                status_empr: 'Aberto'
            };

            const emprestimo = await EmprestimoModel.criar(dadosEmprestimo);

            // Atualizar o status do equipamento para 'emprestado'
            await EquipamentoModel.atualizar(eqp_id, { status_eqp: 'Emprestado' });

            res.status(201).json({
                sucesso: true,
                mensagem: 'Empréstimo registrado com sucesso',
                dados: emprestimo
            });
        } catch (erro) {
            next(erro);
        }
    }

    // PUT /api/emprestimos/:id/devolver - Registrar devolução de equipamento
    static async registrarDevolucao(req, res, next) {
        try {
            const { id } = req.params;

            if (!id) {
                throw new ApiError('ID do empréstimo é obrigatório', 400);
            }

            // Verificar se o empréstimo existe
            const emprestimo = await EmprestimoModel.buscarPorId(id);
            if (!emprestimo) {
                throw new ApiError('Empréstimo não encontrado', 404);
            }

            // REGRA DE NEGÓCIO: verificar se o empréstimo ainda está ativo
            if (emprestimo.data_dev_real !== null) {
                throw new ApiError('Este empréstimo já foi encerrado', 400);
            }

            // Registrar a data de devolução
            const dadosAtualizacao = {
                data_dev_real: new Date().toISOString().split('T')[0],
                status_empr: 'Devolvido'
            };

            await EmprestimoModel.atualizar(id, dadosAtualizacao);

            // Atualizar o status do equipamento para 'disponivel'
            await EquipamentoModel.atualizar(emprestimo.id_eqp, { status_eqp: 'Disponivel' });

            res.status(200).json({
                sucesso: true,
                mensagem: 'Devolução registrada com sucesso',
                dados: {
                    id_empr: id,
                    ...dadosAtualizacao
                }
            });
        } catch (erro) {
            next(erro);
        }
    }
}

export default EmprestimoController;
