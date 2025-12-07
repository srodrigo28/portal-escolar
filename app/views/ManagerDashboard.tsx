import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Plus, AlertTriangle, Package, Wallet, Clock, CheckCircle } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { View, Notification } from '../types';

const DATA_BUDGET = [
  { name: 'Disponível', value: 45000 },
  { name: 'Bloqueado/Empenhado', value: 30000 },
  { name: 'Gasto', value: 25000 },
];
const COLORS = ['#22c55e', '#f59e0b', '#ef4444'];

const DATA_SOURCES = [
  { name: 'PDDE', total: 40000, used: 15000 },
  { name: 'Verba Mun.', total: 60000, used: 40000 },
];

interface ManagerDashboardProps {
  onNavigate: (view: View) => void;
}

export const ManagerDashboard: React.FC<ManagerDashboardProps> = ({ onNavigate }) => {
  const notifications: Notification[] = [
    { id: 1, title: 'Estoque de Papel A4 abaixo do mínimo (5 un).', type: 'warning' },
    { id: 2, title: 'Prestação de contas do PDDE vence em 5 dias.', type: 'info' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-slate-800">Visão Geral da Escola</h1>
           <p className="text-slate-500">Bem-vindo, Diretor Carlos.</p>
        </div>
        <button 
          onClick={() => onNavigate(View.WIZARD)}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
        >
          <Plus size={20} />
          Nova Solicitação
        </button>
      </div>

      {/* Top Alerts */}
      {notifications.length > 0 && (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {notifications.map(n => (
            <div key={n.id} className={`shrink-0 p-4 rounded-lg border-l-4 flex items-center gap-3 w-96 shadow-sm ${
              n.type === 'warning' ? 'bg-amber-50 border-amber-500 text-amber-800' : 'bg-blue-50 border-blue-500 text-blue-800'
            }`}>
              <AlertTriangle size={20} />
              <span className="text-sm font-medium">{n.title}</span>
            </div>
          ))}
        </div>
      )}

      {/* Financial Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Saúde Orçamentária Global" className="lg:col-span-1">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={DATA_BUDGET}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {DATA_BUDGET.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center mt-2">
            <span className="text-3xl font-bold text-slate-800">R$ 45.000</span>
            <p className="text-xs text-slate-500 uppercase font-semibold tracking-wide">Saldo Líquido Disponível</p>
          </div>
        </Card>

        <Card title="Execução por Fonte de Recurso" className="lg:col-span-2">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={DATA_SOURCES}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={80} />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" name="Total Repassado" fill="#e2e8f0" radius={[0, 4, 4, 0]} barSize={20} />
                <Bar dataKey="used" name="Já Utilizado" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Process Status Kanban-ish */}
      <div>
        <h2 className="text-lg font-bold text-slate-800 mb-4">Meus Processos</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Em Rascunho', count: 2, icon: FileText, color: 'bg-slate-100 text-slate-600' },
            { label: 'Em Análise', count: 1, icon: Clock, color: 'bg-amber-100 text-amber-600' },
            { label: 'Publicado', count: 3, icon: Wallet, color: 'bg-blue-100 text-blue-600', action: () => onNavigate(View.ROOM) },
            { label: 'Aguard. Entrega', count: 5, icon: Package, color: 'bg-green-100 text-green-600', action: () => onNavigate(View.DELIVERY) },
          ].map((status, i) => (
            <div 
              key={i} 
              onClick={status.action}
              className={`bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between ${status.action ? 'cursor-pointer hover:border-blue-400 hover:shadow-md' : ''} transition-all`}
            >
              <div>
                <p className="text-slate-500 text-sm font-medium">{status.label}</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{status.count}</p>
              </div>
              <div className={`p-3 rounded-lg ${status.color}`}>
                <status.icon size={24} />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Quick Recent List */}
      <Card title="Atividades Recentes">
        <div className="space-y-4">
           {[1, 2, 3].map((i) => (
             <div key={i} className="flex items-center gap-4 pb-4 border-b border-slate-50 last:border-0 last:pb-0">
               <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-sm">
                 #{240 + i}
               </div>
               <div className="flex-1">
                 <p className="font-medium text-slate-800">Processo de Merenda - Lote 0{i}</p>
                 <p className="text-sm text-slate-500">Enviado para análise jurídica da secretaria.</p>
               </div>
               <span className="text-xs text-slate-400">2h atrás</span>
             </div>
           ))}
        </div>
      </Card>
    </div>
  );
};

// Icon fix
import { FileText } from 'lucide-react';
