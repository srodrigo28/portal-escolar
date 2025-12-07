import React from 'react';
import { CheckCircle, XCircle, FileText, ChevronDown, Download } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { View } from '../types';

interface AdjudicationProps {
    onNavigate: (view: View) => void;
}

export const Adjudication: React.FC<AdjudicationProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-start">
         <div>
            <h1 className="text-2xl font-bold text-slate-800">Homologação de Processo</h1>
            <p className="text-slate-500">Processo #20240045 - Aquisição de Merenda</p>
         </div>
         <div className="text-right">
            <p className="text-sm text-slate-500">Economia Gerada</p>
            <p className="text-2xl font-bold text-green-600">- 22.5%</p>
            <p className="text-xs text-slate-400">vs. Valor Estimado</p>
         </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                <th className="px-6 py-4 font-medium">Item</th>
                <th className="px-6 py-4 font-medium">Vencedor</th>
                <th className="px-6 py-4 font-medium">Marca</th>
                <th className="px-6 py-4 font-medium text-right">Qtd</th>
                <th className="px-6 py-4 font-medium text-right">Valor Unit.</th>
                <th className="px-6 py-4 font-medium text-right">Valor Total</th>
                <th className="px-6 py-4 font-medium text-center">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50/50">
                <td className="px-6 py-4 font-medium text-slate-800">1. Arroz Branco Tipo 1</td>
                <td className="px-6 py-4 text-slate-600">Comercial Alimentos Ltda</td>
                <td className="px-6 py-4 text-slate-500">Tio João</td>
                <td className="px-6 py-4 text-right">500 kg</td>
                <td className="px-6 py-4 text-right">R$ 4,50</td>
                <td className="px-6 py-4 text-right font-bold text-slate-800">R$ 2.250,00</td>
                <td className="px-6 py-4 flex justify-center gap-2">
                   <button className="p-2 text-green-600 hover:bg-green-50 rounded" title="Adjudicar"><CheckCircle size={20} /></button>
                   <button className="p-2 text-red-600 hover:bg-red-50 rounded" title="Desclassificar"><XCircle size={20} /></button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="px-6 py-4 font-medium text-slate-800">2. Feijão Carioca</td>
                <td className="px-6 py-4 text-slate-600">Comercial Alimentos Ltda</td>
                <td className="px-6 py-4 text-slate-500">Kicaldo</td>
                <td className="px-6 py-4 text-right">300 kg</td>
                <td className="px-6 py-4 text-right">R$ 6,20</td>
                <td className="px-6 py-4 text-right font-bold text-slate-800">R$ 1.860,00</td>
                <td className="px-6 py-4 flex justify-center gap-2">
                   <button className="p-2 text-green-600 hover:bg-green-50 rounded" title="Adjudicar"><CheckCircle size={20} /></button>
                   <button className="p-2 text-red-600 hover:bg-red-50 rounded" title="Desclassificar"><XCircle size={20} /></button>
                </td>
              </tr>
            </tbody>
            <tfoot className="bg-slate-50 border-t border-slate-200">
               <tr>
                 <td colSpan={5} className="px-6 py-4 text-right font-bold text-slate-600">Total do Processo:</td>
                 <td className="px-6 py-4 text-right font-bold text-xl text-blue-700">R$ 4.110,00</td>
                 <td></td>
               </tr>
            </tfoot>
          </table>
        </div>
      </Card>

      <div className="flex justify-end gap-4">
        <button className="px-6 py-3 border border-slate-300 rounded-lg font-medium text-slate-600 hover:bg-slate-50">
           Voltar
        </button>
        <button 
           onClick={() => onNavigate(View.DELIVERY)}
           className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 flex items-center gap-2 shadow-lg"
        >
           <FileText size={18} />
           Gerar Contrato e Homologar
        </button>
      </div>
    </div>
  );
};