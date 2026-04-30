import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import { useLocation } from "wouter";
import { Package, Users, Clock, LogIn } from "lucide-react";

export default function Home() {
  const { user, loading, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Bem-vindo ao OfficeTech
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Sistema de Gestão de Empréstimos de Equipamentos
            </p>
            <Button
              onClick={() => navigate("/dashboard")}
              size="lg"
              className="gap-2"
            >
              Ir para Dashboard
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card: Gerenciar Clientes */}
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Clientes</h3>
              <p className="text-gray-600 mb-4">
                Cadastre e gerencie todos os clientes que realizam empréstimos.
              </p>
              <Button
                variant="outline"
                onClick={() => navigate("/clientes")}
                className="w-full"
              >
                Gerenciar Clientes
              </Button>
            </div>

            {/* Card: Gerenciar Equipamentos */}
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-600 text-white mb-4">
                <Package className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Equipamentos</h3>
              <p className="text-gray-600 mb-4">
                Adicione e controle o status de todos os equipamentos disponíveis.
              </p>
              <Button
                variant="outline"
                onClick={() => navigate("/equipamentos")}
                className="w-full"
              >
                Gerenciar Equipamentos
              </Button>
            </div>

            {/* Card: Gerenciar Empréstimos */}
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-600 text-white mb-4">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Empréstimos</h3>
              <p className="text-gray-600 mb-4">
                Registre empréstimos e devoluções de equipamentos facilmente.
              </p>
              <Button
                variant="outline"
                onClick={() => navigate("/emprestimos")}
                className="w-full"
              >
                Gerenciar Empréstimos
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-4">OfficeTech</h1>
        <p className="text-xl text-blue-100 mb-8">
          Sistema de Gestão de Empréstimos de Equipamentos
        </p>
        <p className="text-blue-100 mb-8 max-w-md mx-auto">
          Gerencie de forma eficiente todos os empréstimos de equipamentos da sua organização.
        </p>
        <a href={getLoginUrl()}>
          <Button size="lg" variant="secondary" className="gap-2">
            <LogIn className="h-4 w-4" />
            Fazer Login
          </Button>
        </a>
      </div>
    </div>
  );
}
