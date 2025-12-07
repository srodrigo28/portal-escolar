import React from 'react';
import { Search, ArrowRight, FileText, TrendingUp, Users } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { View } from '../types';

interface PublicPortalProps {
  onNavigate: (view: View) => void;
}

export const PublicPortal: React.FC<PublicPortalProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Hero / Header */}
      <header className="bg-linear-to-r from-blue-900 to-blue-700 text-white pb-24 pt-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-between items-center mb-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">SGCLE <span className="font-light opacity-80">Transparência</span></span>
            </div>
            <div className="space-x-4">
               <button 
                onClick={() => onNavigate(View.DASHBOARD)}
                className="text-sm font-medium hover:text-blue-200 transition-colors"
               >
                 Acesso Restrito (Gestor)
               </button>
               <button className="bg-white text-blue-900 px-4 py-2 rounded-full text-sm font-bold hover:bg-blue-50 transition-colors">
                 Sou Fornecedor
               </button>
            </div>
          </div>

          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Acompanhe cada centavo investido na educação
            </h1>
            <p className="text-blue-100 text-lg">
              Portal de transparência, editais e compras públicas escolares.
            </p>
            
            <div className="relative max-w-2xl mx-auto mt-8">
              <input 
                type="text" 
                placeholder="Busque por número do processo, escola ou item (ex: Merenda)..." 
                className="w-full pl-6 pr-14 py-4 rounded-full shadow-2xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-500/30"
              />
              <button className="absolute right-2 top-2 bg-blue-600 p-2 rounded-full hover:bg-blue-500 transition-colors">
                <Search className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 max-w-6xl -mt-16 pb-20 space-y-12">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="flex items-center gap-4 hover:-translate-y-1 transition-transform cursor-pointer">
            <div className="p-3 bg-green-100 rounded-full text-green-700">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Economia Gerada</p>
              <p className="text-2xl font-bold text-slate-800">R$ 2.4 Mi</p>
            </div>
          </Card>
          <Card className="flex items-center gap-4 hover:-translate-y-1 transition-transform cursor-pointer">
             <div className="p-3 bg-blue-100 rounded-full text-blue-700">
              <FileText size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Processos Ativos</p>
              <p className="text-2xl font-bold text-slate-800">42</p>
            </div>
          </Card>
          <Card className="flex items-center gap-4 hover:-translate-y-1 transition-transform cursor-pointer">
             <div className="p-3 bg-amber-100 rounded-full text-amber-700">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Fornecedores</p>
              <p className="text-2xl font-bold text-slate-800">1.280</p>
            </div>
          </Card>
        </div>

        {/* Licitações em Aberto */}
        <section>
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Licitações em Aberto</h2>
            <button className="text-blue-600 font-medium flex items-center gap-1 hover:underline">
              Ver todas <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-md font-semibold">
                    Recebendo Propostas
                  </span>
                  <span className="text-xs text-slate-400">Edital #{202400 + i}</span>
                </div>
                <h3 className="font-bold text-lg text-slate-800 mb-2">Aquisição de Merenda Escolar - Lote {i}</h3>
                <p className="text-slate-500 text-sm mb-4 line-clamp-2">
                  Registro de preços para fornecimento parcelado de gêneros alimentícios perecíveis e não perecíveis.
                </p>
                
                <div className="bg-slate-50 rounded-lg p-3 mb-4">
                   <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-500">Encerra em:</span>
                      <span className="font-mono text-red-600 font-bold">02d 14h 30m</span>
                   </div>
                   <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-red-500 h-full w-3/4"></div>
                   </div>
                </div>

                <button 
                  onClick={() => onNavigate(View.ROOM)} // Direct link for demo purposes
                  className="w-full py-2.5 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                >
                  Ver Detalhes e Disputar
                </button>
              </Card>
            ))}
          </div>
        </section>

         {/* Resultados Recentes */}
         <section className="bg-white rounded-2xl p-8 border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Últimas Homologações</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 text-sm uppercase tracking-wider">
                    <th className="pb-4 font-medium">Objeto</th>
                    <th className="pb-4 font-medium">Vencedor</th>
                    <th className="pb-4 font-medium text-right">Valor Final</th>
                    <th className="pb-4 font-medium text-right">Data</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  <tr className="group">
                    <td className="py-4 text-slate-800 font-medium">Reforma do Telhado - Escola Municipal...</td>
                    <td className="py-4 text-slate-600">Construtora Silva & Filhos Ltda</td>
                    <td className="py-4 text-right font-mono text-green-600">R$ 45.200,00</td>
                    <td className="py-4 text-right text-slate-500 text-sm">Hoje</td>
                  </tr>
                   <tr className="group">
                    <td className="py-4 text-slate-800 font-medium">Material de Limpeza 2024/2</td>
                    <td className="py-4 text-slate-600">LimpaTudo Distribuidora</td>
                    <td className="py-4 text-right font-mono text-green-600">R$ 12.850,50</td>
                    <td className="py-4 text-right text-slate-500 text-sm">Ontem</td>
                  </tr>
                   <tr className="group">
                    <td className="py-4 text-slate-800 font-medium">Tablets Educacionais</td>
                    <td className="py-4 text-slate-600">TechSolutions SA</td>
                    <td className="py-4 text-right font-mono text-green-600">R$ 145.000,00</td>
                    <td className="py-4 text-right text-slate-500 text-sm">24 Out</td>
                  </tr>
                </tbody>
              </table>
            </div>
         </section>
      </main>
    </div>
  );
};