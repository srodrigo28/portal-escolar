import React, { useState } from 'react';
import { Truck, CheckSquare, Star, Package, FileText, AlertTriangle } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { View } from '../types';

interface DeliveryTrackingProps {
    onNavigate: (view: View) => void;
}

export const DeliveryTracking: React.FC<DeliveryTrackingProps> = ({ onNavigate }) => {
  const [rating, setRating] = useState(0);

  const steps = [
    { label: 'Empenho Gerado', date: '10 Out', completed: true },
    { label: 'Nota Fiscal Emitida', date: '12 Out', completed: true },
    { label: 'Em Trânsito', date: '13 Out', completed: true },
    { label: 'Entrega na Escola', date: 'Hoje', completed: true, active: true },
    { label: 'Pagamento Liberado', date: '-', completed: false },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
         <div className="p-3 bg-blue-100 text-blue-700 rounded-lg">
           <Truck size={32} />
         </div>
         <div>
            <h1 className="text-2xl font-bold text-slate-800">Recebimento de Mercadoria</h1>
            <p className="text-slate-500">Pedido #9923 - Comercial Alimentos Ltda</p>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Timeline */}
        <div className="md:col-span-1">
          <Card title="Status do Pedido">
             <div className="relative border-l-2 border-slate-200 ml-3 space-y-8 py-2">
                {steps.map((step, idx) => (
                  <div key={idx} className="relative pl-8">
                     <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 ${step.completed ? 'bg-blue-600 border-blue-600' : 'bg-white border-slate-300'} ${step.active ? 'ring-4 ring-blue-100' : ''}`}></div>
                     <p className={`font-medium ${step.completed ? 'text-slate-800' : 'text-slate-400'}`}>{step.label}</p>
                     <p className="text-xs text-slate-400">{step.date}</p>
                  </div>
                ))}
             </div>
          </Card>
        </div>

        {/* Checklist */}
        <div className="md:col-span-2 space-y-6">
          <Card title="Conferência de Itens">
             <div className="space-y-4">
               {[
                 { name: 'Arroz Branco Tipo 1 (5kg)', qtd: '100 pct' },
                 { name: 'Feijão Carioca (1kg)', qtd: '300 pct' },
                 { name: 'Óleo de Soja (900ml)', qtd: '50 un' }
               ].map((item, i) => (
                 <div key={i} className="flex items-center p-4 border border-slate-100 rounded-lg hover:bg-slate-50">
                    <input type="checkbox" className="w-5 h-5 text-blue-600 rounded mr-4" defaultChecked={i !== 2} />
                    <div className="flex-1">
                      <p className="font-medium text-slate-800">{item.name}</p>
                      <p className="text-sm text-slate-500">Qtd Nota: {item.qtd}</p>
                    </div>
                    {i === 2 && (
                       <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-1 rounded text-sm">
                         <AlertTriangle size={14} />
                         <span>Avaria reportada</span>
                       </div>
                    )}
                 </div>
               ))}
             </div>
             
             <div className="mt-6 pt-6 border-t border-slate-100">
               <label className="block text-sm font-medium text-slate-700 mb-2">Avaliação do Fornecedor</label>
               <div className="flex gap-2 mb-4">
                 {[1, 2, 3, 4, 5].map((star) => (
                   <button 
                    key={star} 
                    onClick={() => setRating(star)}
                    className={`${rating >= star ? 'text-amber-400' : 'text-slate-300'} hover:scale-110 transition-transform`}
                   >
                     <Star size={28} fill="currentColor" />
                   </button>
                 ))}
               </div>
               <textarea className="w-full border border-slate-300 rounded-lg p-3 text-sm" placeholder="Observações sobre a entrega (Opcional)..."></textarea>
             </div>
          </Card>

          <div className="flex justify-end gap-3">
             <button className="text-red-600 px-4 py-2 font-medium hover:bg-red-50 rounded-lg">Reportar Problema</button>
             <button 
                onClick={() => onNavigate(View.DASHBOARD)}
                className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 shadow-lg shadow-green-100 flex items-center gap-2"
             >
               <CheckSquare size={18} /> Atestar Recebimento
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};