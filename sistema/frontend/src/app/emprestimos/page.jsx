'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Loader2, Plus, CheckCircle, AlertCircle } from 'lucide-react';

export default function Emprestimos() {
  const [emprestimos, setEmprestimos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [equipamentos, setEquipamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
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
      const [empRes, cliRes, equipRes] = await Promise.all([
        fetch('/api/emprestimos?pagina=1&limite=100'),
        fetch('/api/clientes?pagina=1&limite=100'),
        fetch('/api/equipamentos?pagina=1&limite=100')
      ]);

      const empData = await empRes.json();
      const cliData = await cliRes.json();
      const equipData = await equipRes.json();

      if (empData.sucesso) setEmprestimos(empData.dados.emprestimos);
      if (cliData.sucesso) setClientes(cliData.dados.clientes);
      if (equipData.sucesso) setEquipamentos(equipData.dados.equipamentos);
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
        body: JSON.stringify(emprestimoData)
      });

      const data = await response.json();
      if (data.sucesso) {
        buscarDados();
        setOpenDialog(false);
        setEmprestimoData({ usuario_id: '', eqp_id: '', data_dev_prevista: '' });
      } else {
        setError(data.mensagem || 'Erro ao registrar empréstimo');
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
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
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
              <form onSubmit={handleSubmit} className="space-y-4">
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
                  <Button type="button" variant="outline" onClick={() => setOpenDialog(false)}>
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

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Equipamento</TableHead>
                <TableHead>Data Saída</TableHead>
                <TableHead>Data Prevista</TableHead>
                <TableHead>Data Devolução</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {emprestimos.length === 0 ? (
                <TableRow>
                  <TableCell colSpan="7" className="text-center py-8 text-gray-500">
                    Nenhum empréstimo registrado
                  </TableCell>
                </TableRow>
              ) : (
                emprestimos.map((emp) => (
                  <TableRow key={emp.id_empr}>
                    <TableCell className="font-medium">{emp.nome_usuario}</TableCell>
                    <TableCell>{emp.nome_eqp}</TableCell>
                    <TableCell>{new Date(emp.data_saida).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>{new Date(emp.data_dev_prevista).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>
                      {emp.data_dev_real ? new Date(emp.data_dev_real).toLocaleDateString('pt-BR') : '-'}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {emp.status_empr === 'Aberto' ? (
                          <>
                            <AlertCircle className="w-4 h-4 text-orange-600" />
                            <span className="text-orange-600 font-medium">Aberto</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-green-600 font-medium">Devolvido</span>
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {emp.status_empr === 'Aberto' && (
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleDevolucao(emp.id_empr)}
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
    </main>
  );
}
