'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Loader2, Plus } from 'lucide-react';

export default function Emprestimos() {
  const [emprestimos, setEmprestimos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [equipamentos, setEquipamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    usuario_id: '',
    eqp_id: '',
    data_dev_prevista: ''
  });

  // Buscar dados ao carregar a página
  useEffect(() => {
    buscarDados();
  }, []);

  const buscarDados = async () => {
    try {
      setLoading(true);
      const [empRes, cliRes, eqpRes] = await Promise.all([
        fetch('/api/emprestimos?pagina=1&limite=100'),
        fetch('/api/clientes?pagina=1&limite=100'),
        fetch('/api/equipamentos?pagina=1&limite=100')
      ]);

      const empData = await empRes.json();
      const cliData = await cliRes.json();
      const eqpData = await eqpRes.json();

      if (empData.sucesso) setEmprestimos(empData.dados.emprestimos || []);
      if (cliData.sucesso) setClientes(cliData.dados.usuarios || []);
      if (eqpData.sucesso) setEquipamentos(eqpData.dados.equipamentos || []);
    } catch (err) {
      setError('Erro ao buscar dados');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/emprestimos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuario_id: parseInt(formData.usuario_id),
          eqp_id: parseInt(formData.eqp_id),
          data_dev_prevista: formData.data_dev_prevista
        })
      });

      const data = await response.json();
      if (data.sucesso) {
        buscarDados();
        setShowModal(false);
        setFormData({ usuario_id: '', eqp_id: '', data_dev_prevista: '' });
      } else {
        setError(data.mensagem || 'Erro ao registrar empréstimo');
      }
    } catch (err) {
      setError('Erro ao registrar empréstimo');
      console.error(err);
    }
  };

  const handleDevolucao = async (id) => {
    if (!confirm('Tem certeza que deseja registrar a devolução?')) return;
    
    try {
      const response = await fetch(`/api/emprestimos/${id}/devolver`, { method: 'PUT' });
      const data = await response.json();
      if (data.sucesso) {
        buscarDados();
      } else {
        setError(data.mensagem || 'Erro ao registrar devolução');
      }
    } catch (err) {
      setError('Erro ao registrar devolução');
      console.error(err);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ usuario_id: '', eqp_id: '', data_dev_prevista: '' });
  };

  const getClienteNome = (usuarioId) => {
    const cliente = clientes.find(c => c.id_user === usuarioId);
    return cliente ? cliente.nome_usuario : 'N/A';
  };

  const getEquipamentoNome = (eqpId) => {
    const equip = equipamentos.find(e => e.id_eqp === eqpId);
    return equip ? equip.nome_eqp : 'N/A';
  };

  const getStatusColor = (status) => {
    return status === 'Aberto' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800';
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 p-8">
        <div className="flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Empréstimos</h1>
          <Button onClick={() => setShowModal(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Novo Empréstimo
          </Button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Equipamento</TableHead>
                <TableHead>Data Saída</TableHead>
                <TableHead>Data Devolução Prevista</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {emprestimos && emprestimos.length === 0 ? (
                <TableRow>
                  <TableCell colSpan="6" className="text-center py-8 text-gray-500">
                    Nenhum empréstimo registrado
                  </TableCell>
                </TableRow>
              ) : (
                emprestimos.map((emprestimo) => (
                  <TableRow key={emprestimo.id_empr}>
                    <TableCell className="font-medium">{getClienteNome(emprestimo.usuario_id)}</TableCell>
                    <TableCell>{getEquipamentoNome(emprestimo.eqp_id)}</TableCell>
                    <TableCell>{new Date(emprestimo.data_saida).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>{new Date(emprestimo.data_dev_prevista).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(emprestimo.status_empr)}`}>
                        {emprestimo.status_empr}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      {emprestimo.status_empr === 'Aberto' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDevolucao(emprestimo.id_empr)}
                        >
                          Registrar Devolução
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Modal Simples */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={handleCloseModal}
          />
          <div className="relative z-50 w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Novo Empréstimo</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
                <select
                  required
                  value={formData.usuario_id}
                  onChange={(e) => setFormData({ ...formData, usuario_id: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecione um cliente</option>
                  {clientes.map((cliente) => (
                    <option key={cliente.id_user} value={cliente.id_user}>
                      {cliente.nome_usuario}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Equipamento</label>
                <select
                  required
                  value={formData.eqp_id}
                  onChange={(e) => setFormData({ ...formData, eqp_id: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecione um equipamento</option>
                  {equipamentos
                    .filter((eq) => eq.status_eqp === 'Disponivel')
                    .map((equip) => (
                      <option key={equip.id_eqp} value={equip.id_eqp}>
                        {equip.nome_eqp}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data de Devolução Prevista</label>
                <Input
                  required
                  type="date"
                  value={formData.data_dev_prevista}
                  onChange={(e) => setFormData({ ...formData, data_dev_prevista: e.target.value })}
                />
              </div>
              <div className="flex gap-2 justify-end mt-6">
                <Button type="button" variant="outline" onClick={handleCloseModal}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Criar Empréstimo
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
