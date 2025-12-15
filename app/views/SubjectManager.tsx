import React, { useState, useEffect } from 'react';
import {
    BookOpen, Plus, Trash2, Pencil, X,
    Calculator, FlaskConical, Globe, Languages,
    Palette, Dumbbell, Binary, Music, GraduationCap
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Subject } from '../types';
import { toast } from 'sonner';

export const SubjectManager: React.FC = () => {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form States
    const [name, setName] = useState('');
    const [workload, setWorkload] = useState('');

    const fetchSubjects = () => {
        fetch('http://localhost:3001/subjects')
            .then(res => res.json())
            .then(data => setSubjects(data))
            .catch(err => console.error('Error fetching subjects:', err));
    };

    useEffect(() => {
        fetchSubjects();
    }, []);

    const resetForm = () => {
        setName('');
        setWorkload('');
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

    const handleEdit = (subject: Subject) => {
        setName(subject.name);
        setWorkload(subject.workload.toString());
        setEditingId(subject.id);
        setShowModal(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Tem certeza que deseja excluir esta disciplina?')) {
            try {
                await fetch(`http://localhost:3001/subjects/${id}`, {
                    method: 'DELETE',
                });
                setSubjects(subjects.filter(s => s.id !== id));
                toast.success("Disciplina excluída com sucesso.");
            } catch (err) {
                console.error("Error deleting subject:", err);
                toast.error("Erro ao excluir disciplina.");
            }
        }
    };

    const handleSave = async () => {
        if (!name || !workload) {
            // alert("Por favor, preencha todos os campos.");
            toast.error("Por favor, preencha todos os campos.");
            return;
        }

        const subjectData = {
            name,
            workload: parseInt(workload),
        };

        if (editingId) {
            // Update
            try {
                const res = await fetch(`http://localhost:3001/subjects/${editingId}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(subjectData)
                });
                const savedSubject = await res.json();
                setSubjects(subjects.map(s => s.id === editingId ? savedSubject : s));
                toast.success("Disciplina atualizada com sucesso.");
            } catch (err) {
                console.error("Error updating subject:", err);
                toast.error("Erro ao atualizar disciplina.");
            }
        } else {
            // Create
            try {
                const res = await fetch('http://localhost:3001/subjects', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(subjectData)
                });
                const savedSubject = await res.json();
                setSubjects([...subjects, savedSubject]);

                toast.success("Disciplina criada com sucesso.");
            } catch (err) {
                console.error("Error creating subject:", err);
                toast.error("Erro ao criar disciplina.");
            }
        }

        handleCloseModal();
    };

    const getSubjectIcon = (name: string) => {
        const lowerName = name.toLowerCase();

        if (lowerName.includes('matemática') || lowerName.includes('cálculo') || lowerName.includes('algebra') || lowerName.includes('geometria')) {
            return <Calculator size={24} />;
        }
        if (lowerName.includes('português') || lowerName.includes('inglês') || lowerName.includes('litera') || lowerName.includes('redação')) {
            return <Languages size={24} />;
        }
        if (lowerName.includes('física') && lowerName.includes('educação')) { // Educação Física
            return <Dumbbell size={24} />;
        }
        if (lowerName.includes('ciência') || lowerName.includes('biologia') || lowerName.includes('química') || lowerName.includes('física')) {
            return <FlaskConical size={24} />;
        }
        if (lowerName.includes('história') || lowerName.includes('geografia') || lowerName.includes('sociologia') || lowerName.includes('filosofia')) {
            return <Globe size={24} />;
        }
        if (lowerName.includes('arte') || lowerName.includes('desenho')) {
            return <Palette size={24} />;
        }
        if (lowerName.includes('informática') || lowerName.includes('computação') || lowerName.includes('programação')) {
            return <Binary size={24} />;
        }
        if (lowerName.includes('música')) {
            return <Music size={24} />;
        }

        return <BookOpen size={24} />;
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Disciplinas</h1>
                    <p className="text-slate-500">Gerencie a grade curricular e cargas horárias.</p>
                </div>
                <button
                    onClick={handleOpenModal}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 shadow-md transition-colors"
                >
                    <Plus size={20} /> Nova Disciplina
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subjects.map(subject => (
                    <Card key={subject.id} className="hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                                {getSubjectIcon(subject.name)}
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(subject)}
                                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                >
                                    <Pencil size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(subject.id)}
                                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>

                        <h3 className="text-lg font-bold text-slate-800 mb-2">{subject.name}</h3>

                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                            <span className="font-semibold text-slate-600">Carga Horária:</span>
                            <span>{subject.workload}h</span>
                        </div>
                    </Card>
                ))}
            </div>


            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-2xl relative">
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
                        >
                            <X size={20} />
                        </button>

                        <h2 className="text-xl font-bold text-slate-800 mb-6">
                            {editingId ? 'Editar Disciplina' : 'Nova Disciplina'}
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Nome da Disciplina *</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Ex: Matemática"
                                    className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none border-slate-300"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Carga Horária (horas) *</label>
                                <input
                                    type="number"
                                    value={workload}
                                    onChange={(e) => setWorkload(e.target.value)}
                                    min="1"
                                    className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none border-slate-300"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-slate-100">
                            <button
                                onClick={handleCloseModal}
                                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-lg shadow-blue-200 transition-all transform active:scale-95"
                            >
                                {editingId ? 'Salvar Alterações' : 'Criar Disciplina'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
