'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Users, Package, Clock, BarChart3 } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-gray-900">OfficeTech</h1>
          <p className="text-gray-600 mt-2">Sistema de Gestão de Empréstimos de Equipamentos</p>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Bem-vindo ao OfficeTech</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Gerencie seus equipamentos, clientes e empréstimos de forma simples e eficiente.
          </p>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Clientes Card */}
          <Link href="/clientes">
            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 cursor-pointer h-full">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Clientes</h3>
              <p className="text-gray-600 text-sm mb-4">
                Cadastre e gerencie todos os seus clientes que realizam empréstimos.
              </p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Gerenciar Clientes
              </Button>
            </div>
          </Link>

          {/* Equipamentos Card */}
          <Link href="/equipamentos">
            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 cursor-pointer h-full">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
                <Package className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Equipamentos</h3>
              <p className="text-gray-600 text-sm mb-4">
                Adicione e controle o status de todos os seus equipamentos disponíveis.
              </p>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Gerenciar Equipamentos
              </Button>
            </div>
          </Link>

          {/* Empréstimos Card */}
          <Link href="/emprestimos">
            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 cursor-pointer h-full">
              <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mb-4">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Empréstimos</h3>
              <p className="text-gray-600 text-sm mb-4">
                Registre empréstimos e devoluções de equipamentos facilmente.
              </p>
              <Button className="w-full bg-orange-600 hover:bg-orange-700">
                Gerenciar Empréstimos
              </Button>
            </div>
          </Link>

          {/* Dashboard Card */}
          <Link href="/dashboard">
            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 cursor-pointer h-full">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Dashboard</h3>
              <p className="text-gray-600 text-sm mb-4">
                Visualize estatísticas e informações importantes do sistema.
              </p>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Ver Dashboard
              </Button>
            </div>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white mt-12 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Recursos Principais</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Gestão Completa</h3>
              <p className="text-gray-600">
                Controle total sobre clientes, equipamentos e empréstimos em um único lugar.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Rastreamento em Tempo Real</h3>
              <p className="text-gray-600">
                Acompanhe o status de todos os equipamentos e empréstimos em tempo real.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Interface Intuitiva</h3>
              <p className="text-gray-600">
                Design moderno e fácil de usar para melhor experiência do usuário.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 OfficeTech. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </main>
  );
}
