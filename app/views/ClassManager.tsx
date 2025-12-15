import React, { useState, useEffect } from 'react';
import { Users, User, ArrowRight, Plus, X, GraduationCap } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { SchoolClass, Student, Staff } from '../types';
import { toast } from 'sonner';

export const ClassManager: React.FC = () => {
  // Load Classes
  const [classes, setClasses] = useState<SchoolClass[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [teachers, setTeachers] = useState<Staff[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/classes')
      .then(res => res.json())
      .then(data => setClasses(data))
      .catch(err => console.error('Error fetching classes:', err));

    fetch('http://localhost:3001/students')
      .then(res => res.json())
      .then(data => setStudents(data))
      .catch(err => console.error('Error fetching students:', err));

    fetch('http://localhost:3001/staff')
      .then(res => res.json())
      .then(data => setTeachers(data.filter((s: Staff) => s.role === 'Professor')))
      .catch(err => console.error('Error fetching staff:', err));
  }, []);

  const [showModal, setShowModal] = useState(false);

  // Form States
  const [className, setClassName] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [capacity, setCapacity] = useState('30');

  const handleAddClass = async () => {
    if (!className || !teacherName || !capacity) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    const newClass: Omit<SchoolClass, 'id'> = {
      name: className,
      teacherId: teacherName,
      studentsCount: 0,
      capacity: parseInt(capacity)
    };

    try {
      const res = await fetch('http://localhost:3001/classes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newClass)
      });
      const savedClass = await res.json();
      setClasses([...classes, savedClass]);
      toast.success("Turma criada com sucesso.");
    } catch (err) {
      console.error("Error creating class:", err);
      toast.error("Erro ao criar turma.");
    }

    // Reset and close
    setClassName('');
    setTeacherName('');
    setCapacity('30');
    setShowModal(false);
  };

  // Helper to count students in a specific class based on string matching
  // Matches if Class Name contains both the Student Grade and ClassID (e.g. "9º Ano" and "A")
  const getStudentCountForClass = (cls: SchoolClass) => {
    return students.filter(student => {
      const clsName = cls.name.toLowerCase();
      const sGrade = student.grade.toLowerCase();
      const sId = student.classId.toLowerCase();

      return clsName.includes(sGrade) && clsName.includes(sId);
    }).length;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Turmas</h1>
          <p className="text-slate-500">Gestão de enturmação e salas de aula.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow-md flex items-center gap-2 transition-colors"
        >
          <Plus size={20} /> Nova Turma
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map(cls => {
          // Calculate real occupancy
          const currentCount = getStudentCountForClass(cls);
          const occupation = (currentCount / cls.capacity) * 100;
          const isFull = occupation >= 90;
          const isEmpty = currentCount === 0;

          return (
            <Card key={cls.id} className="relative overflow-hidden group hover:border-blue-400 transition-all">
              <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <Users size={60} />
              </div>

              <h3 className="text-xl font-bold text-slate-800 mb-1">{cls.name}</h3>
              <div className="flex items-center gap-2 text-slate-500 text-sm mb-6">
                <User size={16} />
                <span>Regente: {cls.teacherId}</span>
              </div>

              <div className="mb-2 flex justify-between text-sm">
                <span className="font-medium text-slate-600">Ocupação</span>
                <span className={`${isFull ? 'text-red-600' : isEmpty ? 'text-slate-400' : 'text-green-600'} font-bold`}>
                  {currentCount} / {cls.capacity}
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-6">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${isFull ? 'bg-red-500' : 'bg-green-500'}`}
                  style={{ width: `${occupation}%` }}
                ></div>
              </div>

              <button className="w-full py-2.5 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 font-medium flex items-center justify-center gap-2 transition-colors">
                Ver Diário <ArrowRight size={16} />
              </button>
            </Card>
          );
        })}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-2xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                <GraduationCap size={24} />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Nova Turma</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Identificação da Turma *</label>
                <input
                  type="text"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  placeholder="Ex: 2º Ano C - Ensino Médio"
                  className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none border-slate-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Professor Regente / Responsável *</label>
                <select
                  value={teacherName}
                  onChange={(e) => setTeacherName(e.target.value)}
                  className="w-full border p-2.5 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none border-slate-300"
                >
                  <option value="">Selecione um professor...</option>
                  {teachers.map(t => (
                    <option key={t.id} value={t.name}>{t.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Capacidade de Alunos</label>
                <input
                  type="number"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  min="1"
                  className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none border-slate-300"
                />
                <p className="text-xs text-slate-400 mt-1">Limite físico da sala de aula.</p>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-slate-100">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddClass}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-lg shadow-blue-200 transition-all transform active:scale-95"
              >
                Criar Turma
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};