import React, { useState, useEffect } from 'react';
import { Search, Plus, Filter, MoreHorizontal, User, X, CheckCircle, Ban, ArrowRightLeft, Pencil } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Student } from '../types';

const INITIAL_STUDENTS: Student[] = [
  { id: '1', name: 'Ana Silva', enrollmentId: '2024001', grade: '9º Ano', classId: 'A', status: 'Ativo' },
  { id: '2', name: 'Bruno Santos', enrollmentId: '2024002', grade: '9º Ano', classId: 'A', status: 'Ativo' },
  { id: '3', name: 'Carla Dias', enrollmentId: '2024003', grade: '8º Ano', classId: 'B', status: 'Inativo' },
  { id: '4', name: 'Daniel Oliveira', enrollmentId: '2024004', grade: '1º Ano EM', classId: 'A', status: 'Ativo' },
  { id: '5', name: 'Eduarda Lima', enrollmentId: '2024005', grade: '3º Ano EM', classId: 'C', status: 'Transferido' },
];

const STORAGE_KEY = 'portal_escolar_students';

export const StudentManager: React.FC = () => {
  // Initialize state from localStorage if available, otherwise use initial data
  const [students, setStudents] = useState<Student[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Error parsing stored students:', e);
        }
      }
    }
    return INITIAL_STUDENTS;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form States
  const [newName, setNewName] = useState('');
  const [newEnrollment, setNewEnrollment] = useState('');
  const [newGrade, setNewGrade] = useState('');
  const [newClassId, setNewClassId] = useState('');

  // Persist to localStorage whenever students list changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  }, [students]);

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.enrollmentId.includes(searchTerm)
  );

  const resetForm = () => {
    setNewName('');
    setNewEnrollment('');
    setNewGrade('');
    setNewClassId('');
    setEditingId(null);
  };

  const handleOpenModal = () => {
    resetForm();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    resetForm();
    setShowModal(false);
  };

  const handleEdit = (student: Student) => {
    setNewName(student.name);
    setNewEnrollment(student.enrollmentId);
    setNewGrade(student.grade);
    setNewClassId(student.classId);
    setEditingId(student.id);
    setOpenMenuId(null); // Close menu
    setShowModal(true);
  };

  const handleSaveStudent = () => {
    if (!newName || !newGrade || !newClassId) {
      alert("Por favor, preencha os campos obrigatórios (Nome, Série e Turma).");
      return;
    }

    if (editingId) {
      // Update existing student
      const updatedStudents = students.map(s => 
        s.id === editingId 
          ? { 
              ...s, 
              name: newName, 
              enrollmentId: newEnrollment || s.enrollmentId, 
              grade: newGrade, 
              classId: newClassId 
            } 
          : s
      );
      setStudents(updatedStudents);
    } else {
      // Create new student
      const enrollmentId = newEnrollment || new Date().getFullYear().toString() + Math.floor(Math.random() * 1000).toString().padStart(3, '0');

      const newStudent: Student = {
        id: Date.now().toString(),
        name: newName,
        enrollmentId: enrollmentId,
        grade: newGrade,
        classId: newClassId,
        status: 'Ativo'
      };
      setStudents([...students, newStudent]);
    }
    
    handleCloseModal();
  };

  const handleStatusChange = (studentId: string, newStatus: Student['status']) => {
    const updatedStudents = students.map(s => 
      s.id === studentId ? { ...s, status: newStatus } : s
    );
    setStudents(updatedStudents);
    setOpenMenuId(null);
  };

  const toggleStatus = (studentId: string, currentStatus: Student['status']) => {
    // Logic: If Ativo -> Transferido. If anything else (Transferido/Inativo) -> Ativo.
    const newStatus: Student['status'] = currentStatus === 'Ativo' ? 'Transferido' : 'Ativo';
    handleStatusChange(studentId, newStatus);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Gestão de Alunos</h1>
          <p className="text-slate-500">Gerencie matrículas e informações acadêmicas.</p>
        </div>
        <button 
          onClick={handleOpenModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 shadow-md transition-colors"
        >
          <Plus size={20} /> Novo Aluno
        </button>
      </div>

      <Card className="min-h-[600px]">
        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
             <Search className="absolute left-3 top-2.5 text-slate-400 w-5 h-5" />
             <input 
               type="text" 
               placeholder="Buscar por nome ou matrícula..." 
               className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
          </div>
          <button className="px-4 py-2 border border-slate-300 rounded-lg flex items-center gap-2 text-slate-600 hover:bg-slate-50">
             <Filter size={20} /> Filtros
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto pb-32"> {/* Added padding bottom for dropdown space */}
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 text-sm uppercase">
                <th className="px-4 py-3">Aluno</th>
                <th className="px-4 py-3">Matrícula</th>
                <th className="px-4 py-3">Série/Turma</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map(student => (
                <tr key={student.id} className="hover:bg-slate-50 group">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                        <User size={16} />
                      </div>
                      <span className="font-medium text-slate-800">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600 font-mono text-sm">{student.enrollmentId}</td>
                  <td className="px-4 py-3 text-slate-600">{student.grade} - {student.classId}</td>
                  <td className="px-4 py-3">
                    <span 
                      onClick={(e) => { e.stopPropagation(); toggleStatus(student.id, student.status); }}
                      className={`px-2 py-1 rounded-full text-xs font-bold cursor-pointer select-none transition-all hover:brightness-90 hover:scale-105 active:scale-95 inline-block ${
                      student.status === 'Ativo' ? 'bg-green-100 text-green-700' : 
                      student.status === 'Inativo' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                    }`}
                    title="Clique para alterar status (Ativo/Transferido)">
                      {student.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right relative">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === student.id ? null : student.id); }}
                      className={`p-2 rounded-full hover:bg-blue-50 transition-colors ${openMenuId === student.id ? 'text-blue-600 bg-blue-50' : 'text-slate-400 hover:text-blue-600'}`}
                    >
                      <MoreHorizontal size={20} />
                    </button>

                    {/* Dropdown Menu */}
                    {openMenuId === student.id && (
                      <>
                        <div className="fixed inset-0 z-10 cursor-default" onClick={() => setOpenMenuId(null)}></div>
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 z-20 overflow-hidden text-left animate-in fade-in zoom-in-95 duration-200">
                           
                           {/* Edit Action */}
                           <button 
                             onClick={() => handleEdit(student)}
                             className="w-full px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3 transition-colors border-b border-slate-50"
                           >
                             <Pencil size={16} className="text-blue-600"/> Editar Dados
                           </button>

                           <div className="px-4 py-2 bg-slate-50 border-y border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                             Alterar Status
                           </div>
                           <button 
                             onClick={() => handleStatusChange(student.id, 'Ativo')}
                             className="w-full px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-3 transition-colors"
                           >
                             <div className="w-2 h-2 rounded-full bg-green-500"></div> Ativo
                           </button>
                           <button 
                             onClick={() => handleStatusChange(student.id, 'Inativo')}
                             className="w-full px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-3 transition-colors"
                           >
                             <div className="w-2 h-2 rounded-full bg-red-500"></div> Inativo
                           </button>
                           <button 
                             onClick={() => handleStatusChange(student.id, 'Transferido')}
                             className="w-full px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-3 transition-colors"
                           >
                             <div className="w-2 h-2 rounded-full bg-amber-500"></div> Transferido
                           </button>
                        </div>
                      </>
                    )}
                  </td>
                </tr>
              ))}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-slate-500">
                    Nenhum aluno encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
           <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-2xl relative">
              <button 
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
              
              <h2 className="text-xl font-bold mb-4">
                {editingId ? 'Editar Aluno' : 'Cadastrar Novo Aluno'}
              </h2>
              <div className="space-y-4">
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nome Completo *</label>
                    <input 
                      type="text" 
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="Ex: João da Silva" 
                      className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" 
                    />
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Matrícula (Opcional)</label>
                      <input 
                        type="text" 
                        value={newEnrollment}
                        onChange={(e) => setNewEnrollment(e.target.value)}
                        placeholder="Gerado auto..." 
                        className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">CPF Responsável</label>
                      <input type="text" placeholder="000.000.000-00" className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Série *</label>
                      <select 
                        value={newGrade}
                        onChange={(e) => setNewGrade(e.target.value)}
                        className="w-full border p-2 rounded bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                      >
                         <option value="">Selecione</option>
                         <option value="1º Ano Fund.">1º Ano Fund.</option>
                         <option value="2º Ano Fund.">2º Ano Fund.</option>
                         <option value="3º Ano Fund.">3º Ano Fund.</option>
                         <option value="4º Ano Fund.">4º Ano Fund.</option>
                         <option value="5º Ano Fund.">5º Ano Fund.</option>
                         <option value="6º Ano Fund.">6º Ano Fund.</option>
                         <option value="7º Ano Fund.">7º Ano Fund.</option>
                         <option value="8º Ano Fund.">8º Ano Fund.</option>
                         <option value="9º Ano Fund.">9º Ano Fund.</option>
                         <option value="1º Ano Médio">1º Ano Médio</option>
                         <option value="2º Ano Médio">2º Ano Médio</option>
                         <option value="3º Ano Médio">3º Ano Médio</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Turma *</label>
                      <input 
                        type="text" 
                        value={newClassId}
                        onChange={(e) => setNewClassId(e.target.value.toUpperCase())}
                        placeholder="Ex: A" 
                        maxLength={1}
                        className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" 
                      />
                    </div>
                 </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                 <button 
                  onClick={handleCloseModal} 
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded"
                 >
                   Cancelar
                 </button>
                 <button 
                  onClick={handleSaveStudent} 
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
                 >
                   {editingId ? 'Salvar Alterações' : 'Salvar Aluno'}
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};