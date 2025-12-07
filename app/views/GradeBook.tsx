import React, { useState } from 'react';
import { Save, Download, FileText } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { GradeEntry } from '../types';

const MOCK_GRADES: GradeEntry[] = [
  { studentId: '1', studentName: 'Ana Silva', subject: 'Matemática', q1: 8.5, q2: 9.0, q3: 0, q4: 0 },
  { studentId: '2', studentName: 'Bruno Santos', subject: 'Matemática', q1: 7.0, q2: 6.5, q3: 0, q4: 0 },
  { studentId: '3', studentName: 'Carla Dias', subject: 'Matemática', q1: 9.5, q2: 10.0, q3: 0, q4: 0 },
  { studentId: '4', studentName: 'Daniel Oliveira', subject: 'Matemática', q1: 5.5, q2: 6.0, q3: 0, q4: 0 },
];

export const Gradebook: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState('9º Ano A');
  const [selectedSubject, setSelectedSubject] = useState('Matemática');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
         <div>
          <h1 className="text-2xl font-bold text-slate-800">Lançamento de Notas</h1>
          <p className="text-slate-500">Diário de classe digital.</p>
         </div>
         <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50">
               <Download size={18} /> Exportar
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow">
               <Save size={18} /> Salvar Alterações
            </button>
         </div>
      </div>

      <Card>
         <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex-1">
               <label className="block text-sm font-medium text-slate-700 mb-1">Turma</label>
               <select 
                  className="w-full border border-slate-300 rounded-lg p-2 bg-white"
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
               >
                  <option>9º Ano A</option>
                  <option>9º Ano B</option>
                  <option>1º Ano Médio</option>
               </select>
            </div>
            <div className="flex-1">
               <label className="block text-sm font-medium text-slate-700 mb-1">Disciplina</label>
               <select 
                  className="w-full border border-slate-300 rounded-lg p-2 bg-white"
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
               >
                  <option>Matemática</option>
                  <option>Português</option>
                  <option>História</option>
                  <option>Ciências</option>
               </select>
            </div>
            <div className="flex-1">
               <label className="block text-sm font-medium text-slate-700 mb-1">Bimestre Atual</label>
               <div className="p-2 font-medium text-blue-700">2º Bimestre</div>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-slate-100 text-slate-600 text-sm border-y border-slate-200">
                     <th className="px-4 py-3 font-semibold">Aluno</th>
                     <th className="px-4 py-3 text-center w-24">1º Bim</th>
                     <th className="px-4 py-3 text-center w-24">2º Bim</th>
                     <th className="px-4 py-3 text-center w-24">3º Bim</th>
                     <th className="px-4 py-3 text-center w-24">4º Bim</th>
                     <th className="px-4 py-3 text-center w-24">Média</th>
                     <th className="px-4 py-3 text-center w-32">Situação</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {MOCK_GRADES.map((entry, idx) => {
                     const average = (entry.q1 + entry.q2) / 2; // Simple mock avg
                     return (
                        <tr key={idx} className="hover:bg-slate-50">
                           <td className="px-4 py-3 font-medium text-slate-800">{entry.studentName}</td>
                           <td className="px-4 py-3 text-center">
                              <input 
                                 type="number" 
                                 className="w-16 p-1 border rounded text-center" 
                                 defaultValue={entry.q1} 
                              />
                           </td>
                           <td className="px-4 py-3 text-center">
                              <input 
                                 type="number" 
                                 className="w-16 p-1 border rounded text-center border-blue-300 bg-blue-50" 
                                 defaultValue={entry.q2} 
                              />
                           </td>
                           <td className="px-4 py-3 text-center text-slate-400">-</td>
                           <td className="px-4 py-3 text-center text-slate-400">-</td>
                           <td className="px-4 py-3 text-center font-bold text-slate-800">{average.toFixed(1)}</td>
                           <td className="px-4 py-3 text-center">
                              <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                                 average >= 6 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                              }`}>
                                 {average >= 6 ? 'Aprovado' : 'Recuperação'}
                              </span>
                           </td>
                        </tr>
                     );
                  })}
               </tbody>
            </table>
         </div>
      </Card>
    </div>
  );
};