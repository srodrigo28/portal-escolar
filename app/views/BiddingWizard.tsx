import React, { useState } from 'react';
import { Check, ChevronRight, Upload, Search, FileText, Trash2, ChevronLeft } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { View } from '../types';

interface BiddingWizardProps {
  onNavigate: (view: View) => void;
}

const STEPS = ['Dados Básicos', 'Itens', 'Orçamentos', 'Revisão'];

export const BiddingWizard: React.FC<BiddingWizardProps> = ({ onNavigate }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [items, setItems] = useState([{ id: 1, name: 'Papel A4 75g', qty: 50, unit: 'Resma' }]);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(curr => curr + 1);
    } else {
      // Simulate finish
      onNavigate(View.DASHBOARD);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(curr => curr - 1);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Nova Solicitação de Compra</h1>
        <p className="text-slate-500">Crie um edital simplificado em 4 passos.</p>
      </div>

      {/* Stepper */}
      <div className="flex justify-between items-center relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -z-10 -translate-y-1/2 rounded-full"></div>
        <div className="absolute top-1/2 left-0 h-1 bg-blue-600 -z-10 -translate-y-1/2 rounded-full transition-all duration-300" style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}></div>
        
        {STEPS.map((step, idx) => (
          <div key={idx} className="flex flex-col items-center gap-2 bg-slate-50 px-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
              idx <= currentStep 
                ? 'bg-blue-600 border-blue-600 text-white' 
                : 'bg-white border-slate-300 text-slate-300'
            }`}>
              {idx < currentStep ? <Check size={20} /> : <span className="font-bold">{idx + 1}</span>}
            </div>
            <span className={`text-xs font-medium ${idx <= currentStep ? 'text-blue-700' : 'text-slate-400'}`}>{step}</span>
          </div>
        ))}
      </div>

      <Card className="min-h-[400px]">
        {currentStep === 0 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <h3 className="font-bold text-lg text-slate-700 mb-4">Dados da Solicitação</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Objeto da Compra</label>
                <input type="text" className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ex: Material de Limpeza para o 2º Semestre" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Fonte de Recurso</label>
                <select className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>PDDE Básico</option>
                  <option>Manutenção Escolar (Município)</option>
                  <option>Recurso Próprio (Cantina)</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Justificativa</label>
                <textarea className="w-full border border-slate-300 rounded-lg p-2.5 h-24 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Descreva a necessidade da aquisição..."></textarea>
              </div>
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
             <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg text-slate-700">Lista de Itens</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input type="text" placeholder="Buscar item no catálogo..." className="pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm w-64 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
             </div>

             <div className="border rounded-lg overflow-hidden">
               <table className="w-full text-sm text-left">
                 <thead className="bg-slate-50 text-slate-500">
                   <tr>
                     <th className="px-4 py-3">Item</th>
                     <th className="px-4 py-3">Unidade</th>
                     <th className="px-4 py-3 w-32">Quantidade</th>
                     <th className="px-4 py-3 w-10"></th>
                   </tr>
                 </thead>
                 <tbody className="divide-y">
                   {items.map(item => (
                     <tr key={item.id}>
                       <td className="px-4 py-3 font-medium text-slate-700">{item.name}</td>
                       <td className="px-4 py-3 text-slate-500">{item.unit}</td>
                       <td className="px-4 py-3">
                         <input type="number" defaultValue={item.qty} className="w-full border rounded p-1" />
                       </td>
                       <td className="px-4 py-3 text-right">
                         <button className="text-red-500 hover:bg-red-50 p-1 rounded"><Trash2 size={16}/></button>
                       </td>
                     </tr>
                   ))}
                   <tr className="bg-slate-50/50">
                     <td colSpan={4} className="px-4 py-3 text-center text-blue-600 font-medium cursor-pointer hover:bg-slate-100 border-dashed border-2 border-slate-200 m-2 rounded-lg">
                       + Adicionar item manualmente
                     </td>
                   </tr>
                 </tbody>
               </table>
             </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <h3 className="font-bold text-lg text-slate-700">Pesquisa de Preços</h3>
            <p className="text-sm text-slate-500">Anexe pelo menos 3 orçamentos para compor o preço médio de referência.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               {[1, 2, 3].map(i => (
                 <div key={i} className="border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center text-center gap-3 hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer group">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-white text-slate-400 group-hover:text-blue-500">
                      <Upload size={24} />
                    </div>
                    <div>
                      <p className="font-medium text-slate-700">Orçamento {i}</p>
                      <p className="text-xs text-slate-400">PDF, JPG ou PNG</p>
                    </div>
                 </div>
               ))}
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg flex gap-3 items-start">
               <div className="bg-blue-200 p-1 rounded text-blue-800 mt-0.5"><FileText size={16}/></div>
               <div>
                 <p className="text-sm font-bold text-blue-800">Média Calculada: R$ 1.250,00</p>
                 <p className="text-xs text-blue-600">O sistema usará este valor como teto máximo no pregão.</p>
               </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
           <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
             <div className="text-center py-8">
               <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                 <FileText size={40} />
               </div>
               <h3 className="text-2xl font-bold text-slate-800">Tudo pronto!</h3>
               <p className="text-slate-500 max-w-md mx-auto">A minuta do edital foi gerada automaticamente baseada nos dados inseridos.</p>
             </div>
             
             <div className="bg-slate-100 p-6 rounded-lg border border-slate-200 font-mono text-xs text-slate-600 max-h-60 overflow-y-auto">
                <p><strong>PROCESSO ADMINISTRATIVO Nº 2024/0045</strong></p>
                <p>OBJETO: Aquisição de Material de Limpeza...</p>
                <p className="mt-2">1. DO OBJETO</p>
                <p>1.1. O presente termo tem por objeto...</p>
                <p className="mt-2">...</p>
             </div>

             <div className="flex items-center gap-2 text-sm text-slate-600 justify-center">
               <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
               <span>Declaro que revisei os itens e quantidades.</span>
             </div>
           </div>
        )}
      </Card>

      {/* Footer Controls */}
      <div className="flex justify-between">
        <button 
          onClick={handleBack}
          disabled={currentStep === 0}
          className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 ${currentStep === 0 ? 'opacity-0' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          <ChevronLeft size={20} /> Voltar
        </button>
        <button 
          onClick={handleNext}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 flex items-center gap-2 shadow-lg shadow-blue-200"
        >
          {currentStep === STEPS.length - 1 ? 'Publicar Edital' : 'Próximo'}
          {currentStep !== STEPS.length - 1 && <ChevronRight size={20} />}
        </button>
      </div>
    </div>
  );
};