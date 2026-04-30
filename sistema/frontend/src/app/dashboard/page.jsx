'use client';

import { useState, useEffect } from 'react';
import { Loader2, Users, Package, Clock, CheckCircle } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalClientes: 0,
    equipamentosDisponiveis: 0,
    emprestimosEmAberto: 0,
    devolucoesHoje: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    buscarEstatisticas();
  }, []);

  const buscarEstatisticas = async () => {
    try {
      setLoading(true);
      const [cliRes, equipRes, empRes] = await Promise.all([
        fetch('/api/clientes?pagina=1&limite=1'),
        fetch('/api/equipamentos?pagina=1&limite=1'),
        fetch('/api/emprestimos/em-aberto')
      ]);

      const cliData = await cliRes.json();
      const equipData = await equipRes.json();
      const empData = await empRes.json();

      const totalClientes = cliData.dados?.total || 0;
      const equipamentosDisponiveis = equipData.dados?.equipamentos?.filter(
        (eq) => eq.status_eqp === 'Disponivel'
      ).length || 0;
      const emprestimosEmAberto = empData.dados?.length || 0;

      setStats({
        totalClientes,
        equipamentosDisponiveis,
        emprestimosEmAberto,
        devolucoesHoje: 0
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Clientes */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total de Clientes</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalClientes}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Equipamentos Disponíveis */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Equipamentos Disponíveis</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.equipamentosDisponiveis}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Package className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          {/* Empréstimos em Aberto */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Empréstimos em Aberto</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.emprestimosEmAberto}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          {/* Devoluções Hoje */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Devoluções Hoje</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.devolucoesHoje}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Resumo do Sistema</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Informações Rápidas</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✓ Sistema de gestão de empréstimos operacional</li>
                <li>✓ {stats.totalClientes} cliente(s) cadastrado(s)</li>
                <li>✓ {stats.equipamentosDisponiveis} equipamento(s) disponível(is)</li>
                <li>✓ {stats.emprestimosEmAberto} empréstimo(s) em aberto</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Ações Recomendadas</h3>
              <ul className="space-y-2 text-gray-600">
                <li>→ Cadastre novos clientes conforme necessário</li>
                <li>→ Adicione equipamentos ao inventário</li>
                <li>→ Registre empréstimos e devoluções</li>
                <li>→ Monitore equipamentos emprestados</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
