import React, { useState, useEffect } from 'react';
import { Save, Download } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { GradeEntry, Student, SchoolClass } from '../types';
import { INITIAL_STUDENTS, INITIAL_CLASSES, STORAGE_KEYS } from '../data/initialData';

export const Gradebook: React.FC = () => {
   const [classes, setClasses] = useState<SchoolClass[]>([]);
   const [students, setStudents] = useState<Student[]>([]);
   const [selectedClassId, setSelectedClassId] = useState('');
   const [selectedSubject, setSelectedSubject] = useState('Matemática');

   // Load Data
   useEffect(() => {
      let loadedClasses = INITIAL_CLASSES;
      let loadedStudents = INITIAL_STUDENTS;

      if (typeof window !== 'undefined') {
         const savedClasses = localStorage.getItem(STORAGE_KEYS.CLASSES);
         if (savedClasses) {
            try {
               loadedClasses = JSON.parse(savedClasses);
            } catch (e) {
               console.error("Error parsing classes", e);
            }
         }

         const savedStudents = localStorage.getItem(STORAGE_KEYS.STUDENTS);
         if (savedStudents) {
            try {
               loadedStudents = JSON.parse(savedStudents);
            } catch (e) {
               console.error("Error parsing students", e);
            }
         }
      }

      setClasses(loadedClasses);
      setStudents(loadedStudents);

      if (loadedClasses.length > 0) {
         setSelectedClassId(loadedClasses[0].id);
      }
   }, []);

   const filteredStudents = students.filter(s => {
      if (!selectedClassId) return false;
      const cls = classes.find(c => c.id === selectedClassId);
      if (!cls) return false;

      // Filter logic: Check if class name contains the student grade and class identifier
      // This is a heuristic because we don't have strict foreign keys in this simple app yet
      const clsName = cls.name.toLowerCase();
      const sGrade = s.grade?.toLowerCase() || '';
      const sClassId = s.classId?.toLowerCase() || '';

      return clsName.includes(sGrade) && clsName.includes(sClassId);
   });

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
                     value={selectedClassId}
                     onChange={(e) => setSelectedClassId(e.target.value)}
                  >
                     {classes.map(cls => (
                        <option key={cls.id} value={cls.id}>{cls.name}</option>
                     ))}
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
                     {filteredStudents.length > 0 ? filteredStudents.map((student) => {
                        // Mock grades for display since we don't have a grades backend yet
                        const q1 = Math.floor(Math.random() * 5) + 5;
                        const q2 = Math.floor(Math.random() * 5) + 5;
                        const average = (q1 + q2) / 2;

                        return (
                           <tr key={student.id} className="hover:bg-slate-50">
                              <td className="px-4 py-3 font-medium text-slate-800">
                                 <div>{student.name}</div>
                                 <div className="text-xs text-slate-400 font-normal">{student.enrollmentId}</div>
                              </td>
                              <td className="px-4 py-3 text-center">
                                 <input
                                    type="number"
                                    className="w-16 p-1 border rounded text-center"
                                    defaultValue={q1} // Mock
                                 />
                              </td>
                              <td className="px-4 py-3 text-center">
                                 <input
                                    type="number"
                                    className="w-16 p-1 border rounded text-center border-blue-300 bg-blue-50"
                                    defaultValue={q2} // Mock
                                 />
                              </td>
                              <td className="px-4 py-3 text-center text-slate-400">-</td>
                              <td className="px-4 py-3 text-center text-slate-400">-</td>
                              <td className="px-4 py-3 text-center font-bold text-slate-800">{average.toFixed(1)}</td>
                              <td className="px-4 py-3 text-center">
                                 <span className={`text-xs px-2 py-1 rounded-full font-bold ${average >= 6 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                    {average >= 6 ? 'Aprovado' : 'Recuperação'}
                                 </span>
                              </td>
                           </tr>
                        );
                     }) : (
                        <tr>
                           <td colSpan={7} className="text-center py-8 text-slate-500">Nenhum aluno encontrado nesta turma.</td>
                        </tr>
                     )}
                  </tbody>
               </table>
            </div>
         </Card>
      </div>
   );
};