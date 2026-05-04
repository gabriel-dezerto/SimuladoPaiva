'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Loader2, Plus, Trash2, Edit2 } from 'lucide-react';

export default function Equipamentos() {
  const [equipamentos, setEquipamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editando, setEditando] = useState(null);
  const [formData, setFormData] = useState({
    nome_eqp: '',
    descricao: '',
    status_eqp: 'Disponivel'
  });

  // Buscar equipamentos ao carregar a página
  useEffect(() => {
    buscarEquipamentos();
  }, []);

  const buscarEquipamentos = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/equipamentos?pagina=1&limite=100');
      const data = await response.json();
      if (data.sucesso) {
        setEquipamentos(data.dados.equipamentos || []);
      }
    } catch (err) {
      setError('Erro ao buscar equipamentos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editando ? `/api/equipamentos/${editando.id_eqp}` : '/api/equipamentos';
      const method = editando ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (data.sucesso) {
        buscarEquipamentos();
        setShowModal(false);
        setFormData({ nome_eqp: '', descricao: '', status_eqp: 'Disponivel' });
        setEditando(null);
      } else {
        setError(data.mensagem || 'Erro ao salvar equipamento');
      }
    } catch (err) {
      setError('Erro ao salvar equipamento');
      console.error(err);
    }
  };

  const handleExcluir = async (id) => {
    if (!confirm('Tem certeza que deseja excluir este equipamento?')) return;
    
    try {
      const response = await fetch(`/api/equipamentos/${id}`, { method: 'DELETE' });
      const data = await response.json();
      if (data.sucesso) {
        buscarEquipamentos();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditar = (equipamento) => {
    setEditando(equipamento);
    setFormData({
      nome_eqp: equipamento.nome_eqp,
      descricao: equipamento.descricao || '',
      status_eqp: equipamento.status_eqp
    });
    setShowModal(true);
  };

  const handleNovoEquipamento = () => {
    setEditando(null);
    setFormData({ nome_eqp: '', descricao: '', status_eqp: 'Disponivel' });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditando(null);
    setFormData({ nome_eqp: '', descricao: '', status_eqp: 'Disponivel' });
  };

  const getStatusColor = (status) => {
    return status === 'Disponivel' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
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
          <h1 className="text-3xl font-bold text-gray-900">Equipamentos</h1>
          <Button onClick={handleNovoEquipamento} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Novo Equipamento
          </Button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {equipamentos && equipamentos.length === 0 ? (
                <TableRow>
                  <TableCell colSpan="4" className="text-center py-8 text-gray-500">
                    Nenhum equipamento cadastrado
                  </TableCell>
                </TableRow>
              ) : (
                equipamentos.map((equipamento) => (
                  <TableRow key={equipamento.id_eqp}>
                    <TableCell className="font-medium">{equipamento.nome_eqp}</TableCell>
                    <TableCell>{equipamento.descricao || '-'}</TableCell>
                    <TableCell>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(equipamento.status_eqp)}`}>
                        {equipamento.status_eqp}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditar(equipamento)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleExcluir(equipamento.id_eqp)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
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
            <h2 className="text-lg font-semibold mb-4">
              {editando ? 'Editar Equipamento' : 'Novo Equipamento'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                <Input
                  required
                  value={formData.nome_eqp}
                  onChange={(e) => setFormData({ ...formData, nome_eqp: e.target.value })}
                  placeholder="Nome do equipamento"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <textarea
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  placeholder="Descrição do equipamento"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={formData.status_eqp}
                  onChange={(e) => setFormData({ ...formData, status_eqp: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Disponivel">Disponível</option>
                  <option value="Emprestado">Emprestado</option>
                </select>
              </div>
              <div className="flex gap-2 justify-end mt-6">
                <Button type="button" variant="outline" onClick={handleCloseModal}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  {editando ? 'Atualizar' : 'Criar'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
