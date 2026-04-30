'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Loader2, Plus, Trash2, Edit2, CheckCircle, AlertCircle } from 'lucide-react';

export default function Equipamentos() {
  const [equipamentos, setEquipamentos] = useState([]);
  const [emprestimos, setEmprestimos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openEmprestimoDialog, setOpenEmprestimoDialog] = useState(false);
  const [editando, setEditando] = useState(null);
  const [formData, setFormData] = useState({
    nome_eqp: '',
    descricao: '',
    status_eqp: 'Disponivel'
  });
  const [emprestimoData, setEmprestimoData] = useState({
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
      const [equipRes, empRes, cliRes] = await Promise.all([
        fetch('/api/equipamentos?pagina=1&limite=100'),
        fetch('/api/emprestimos/em-aberto'),
        fetch('/api/clientes?pagina=1&limite=100')
      ]);

      const equipData = await equipRes.json();
      const empData = await empRes.json();
      const cliData = await cliRes.json();

      if (equipData.sucesso) setEquipamentos(equipData.dados.equipamentos);
      if (empData.sucesso) setEmprestimos(empData.dados);
      if (cliData.sucesso) setClientes(cliData.dados.clientes);
    } catch (err) {
      setError('Erro ao buscar dados');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitEquipamento = async (e) => {
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
        buscarDados();
        setOpenDialog(false);
        setFormData({ nome_eqp: '', descricao: '', status_eqp: 'Disponivel' });
        setEditando(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmitEmprestimo = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/emprestimos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emprestimoData)
      });

      const data = await response.json();
      if (data.sucesso) {
        buscarDados();
        setOpenEmprestimoDialog(false);
        setEmprestimoData({ usuario_id: '', eqp_id: '', data_dev_prevista: '' });
      } else {
        setError(data.mensagem || 'Erro ao registrar empréstimo');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleExcluir = async (id) => {
    try {
      const response = await fetch(`/api/equipamentos/${id}`, { method: 'DELETE' });
      const data = await response.json();
      if (data.sucesso) {
        buscarDados();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDevolucao = async (id) => {
    try {
      const response = await fetch(`/api/emprestimos/${id}/devolver`, { method: 'PUT' });
      const data = await response.json();
      if (data.sucesso) {
        buscarDados();
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
    setOpenDialog(true);
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
        {/* Equipamentos Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Equipamentos</h1>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Equipamento
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editando ? 'Editar Equipamento' : 'Novo Equipamento'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmitEquipamento} className="space-y-4">
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
                    <Input
                      value={formData.descricao}
                      onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                      placeholder="Descrição"
                    />
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button type="button" variant="outline" onClick={() => setOpenDialog(false)}>
                      Cancelar
                    </Button>
                    <Button type="submit" className="bg-green-600 hover:bg-green-700">
                      {editando ? 'Atualizar' : 'Criar'}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

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
                {equipamentos.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan="4" className="text-center py-8 text-gray-500">
                      Nenhum equipamento cadastrado
                    </TableCell>
                  </TableRow>
                ) : (
                  equipamentos.map((equip) => (
                    <TableRow key={equip.id_eqp}>
                      <TableCell className="font-medium">{equip.nome_eqp}</TableCell>
                      <TableCell>{equip.descricao || '-'}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {equip.status_eqp === 'Disponivel' ? (
                            <>
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span className="text-green-600 font-medium">Disponível</span>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="w-4 h-4 text-orange-600" />
                              <span className="text-orange-600 font-medium">Emprestado</span>
                            </>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditar(equip)}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="sm" variant="destructive">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tem certeza que deseja excluir o equipamento {equip.nome_eqp}?
                              </AlertDialogDescription>
                              <div className="flex gap-2 justify-end">
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleExcluir(equip.id_eqp)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Excluir
                                </AlertDialogAction>
                              </div>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Empréstimos Section */}
        <div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Empréstimos em Aberto</h2>
            <Dialog open={openEmprestimoDialog} onOpenChange={setOpenEmprestimoDialog}>
              <DialogTrigger asChild>
                <Button className="bg-orange-600 hover:bg-orange-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Empréstimo
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Registrar Novo Empréstimo</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmitEmprestimo} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
                    <select
                      required
                      value={emprestimoData.usuario_id}
                      onChange={(e) => setEmprestimoData({ ...emprestimoData, usuario_id: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="">Selecione um cliente</option>
                      {clientes.map((cli) => (
                        <option key={cli.id_user} value={cli.id_user}>
                          {cli.nome_usuario}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Equipamento</label>
                    <select
                      required
                      value={emprestimoData.eqp_id}
                      onChange={(e) => setEmprestimoData({ ...emprestimoData, eqp_id: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="">Selecione um equipamento</option>
                      {equipamentos
                        .filter((eq) => eq.status_eqp === 'Disponivel')
                        .map((eq) => (
                          <option key={eq.id_eqp} value={eq.id_eqp}>
                            {eq.nome_eqp}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Data Prevista de Devolução</label>
                    <Input
                      required
                      type="date"
                      value={emprestimoData.data_dev_prevista}
                      onChange={(e) => setEmprestimoData({ ...emprestimoData, data_dev_prevista: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button type="button" variant="outline" onClick={() => setOpenEmprestimoDialog(false)}>
                      Cancelar
                    </Button>
                    <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
                      Registrar
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="bg-white rounded-lg shadow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Equipamento</TableHead>
                  <TableHead>Data Saída</TableHead>
                  <TableHead>Data Prevista</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {emprestimos.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan="5" className="text-center py-8 text-gray-500">
                      Nenhum empréstimo em aberto
                    </TableCell>
                  </TableRow>
                ) : (
                  emprestimos.map((emp) => (
                    <TableRow key={emp.id_empr}>
                      <TableCell className="font-medium">{emp.nome_usuario}</TableCell>
                      <TableCell>{emp.nome_eqp}</TableCell>
                      <TableCell>{new Date(emp.data_saida).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell>{new Date(emp.data_dev_prevista).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleDevolucao(emp.id_empr)}
                        >
                          Registrar Devolução
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </main>
  );
}
