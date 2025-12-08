import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, BookOpen, GraduationCap, AlertCircle } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { View } from '../types';
import { INITIAL_STUDENTS, INITIAL_STAFF, INITIAL_CLASSES, STORAGE_KEYS } from '../data/initialData';

interface DashboardProps {
    onNavigate: (view: View) => void;
}

const ATTENDANCE_DATA = [
    { name: 'Seg', presence: 95 },
    { name: 'Ter', presence: 92 },
    { name: 'Qua', presence: 96 },
    { name: 'Qui', presence: 88 },
    { name: 'Sex', presence: 85 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b'];

export const AcademicDashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
    const [counts, setCounts] = useState({
        students: 0,
        teachers: 0,
        classes: 0
    });
    const [distribution, setDistribution] = useState<{ name: string, value: number }[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [studentsRes, staffRes, classesRes] = await Promise.all([
                    fetch('http://localhost:3001/students'),
                    fetch('http://localhost:3001/staff'),
                    fetch('http://localhost:3001/classes')
                ]);

                const students = await studentsRes.json();
                const staff = await staffRes.json();
                const classes = await classesRes.json();

                // Calculate Counts
                setCounts({
                    students: students.length,
                    teachers: staff.filter((s: any) => s.role === 'Professor').length,
                    classes: classes.length
                });

                // Calculate Distribution
                const dist = [
                    { name: 'Fundamental I', value: 0 },
                    { name: 'Fundamental II', value: 0 },
                    { name: 'Ensino Médio', value: 0 },
                ];

                students.forEach((s: any) => {
                    const g = s.grade?.toLowerCase() || '';
                    if (g.includes('1º ano fund') || g.includes('2º ano fund') || g.includes('3º ano fund') || g.includes('4º ano fund') || g.includes('5º ano fund')) {
                        dist[0].value++;
                    } else if (g.includes('6º ano') || g.includes('7º ano') || g.includes('8º ano') || g.includes('9º ano')) {
                        dist[1].value++;
                    } else if (g.includes('médio') || g.includes('em')) {
                        dist[2].value++;
                    }
                });

                setDistribution(dist);

            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-800">Painel Administrativo</h1>
                <p className="text-slate-500">Visão geral do ano letivo 2024.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 cursor-pointer hover:border-blue-400 transition-colors" onClick={() => onNavigate(View.STUDENTS)}>
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><Users size={24} /></div>
                    <div>
                        <p className="text-slate-500 text-sm font-medium">Total Alunos</p>
                        <p className="text-2xl font-bold text-slate-800">{counts.students}</p>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 cursor-pointer hover:border-blue-400 transition-colors" onClick={() => onNavigate(View.STAFF)}>
                    <div className="p-3 bg-green-100 text-green-600 rounded-lg"><BookOpen size={24} /></div>
                    <div>
                        <p className="text-slate-500 text-sm font-medium">Professores</p>
                        <p className="text-2xl font-bold text-slate-800">{counts.teachers}</p>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 cursor-pointer hover:border-blue-400 transition-colors" onClick={() => onNavigate(View.CLASSES)}>
                    <div className="p-3 bg-purple-100 text-purple-600 rounded-lg"><GraduationCap size={24} /></div>
                    <div>
                        <p className="text-slate-500 text-sm font-medium">Turmas Ativas</p>
                        <p className="text-2xl font-bold text-slate-800">{counts.classes}</p>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-amber-100 text-amber-600 rounded-lg"><AlertCircle size={24} /></div>
                    <div>
                        <p className="text-slate-500 text-sm font-medium">Alertas</p>
                        <p className="text-2xl font-bold text-slate-800">3</p>
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card title="Frequência Semanal (%)" className="lg:col-span-2">
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={ATTENDANCE_DATA}>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis hide />
                                <Tooltip cursor={{ fill: '#f1f5f9' }} />
                                <Bar dataKey="presence" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card title="Distribuição por Nível">
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={distribution}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {distribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-4 mt-4 text-xs text-slate-500">
                        {distribution.map((entry, index) => (
                            <div key={index} className="flex items-center gap-1">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                                {entry.name}
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Recent Activity / Calendar */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="Próximos Eventos">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 pb-4 border-b border-slate-50">
                            <div className="bg-blue-50 text-blue-700 w-12 h-12 rounded-lg flex flex-col items-center justify-center font-bold">
                                <span className="text-xs uppercase">Out</span>
                                <span className="text-lg">28</span>
                            </div>
                            <div>
                                <p className="font-semibold text-slate-800">Reunião de Pais e Mestres</p>
                                <p className="text-sm text-slate-500">19:00 - Auditório Principal</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 pb-4 border-b border-slate-50">
                            <div className="bg-red-50 text-red-700 w-12 h-12 rounded-lg flex flex-col items-center justify-center font-bold">
                                <span className="text-xs uppercase">Nov</span>
                                <span className="text-lg">02</span>
                            </div>
                            <div>
                                <p className="font-semibold text-slate-800">Feriado - Finados</p>
                                <p className="text-sm text-slate-500">Escola Fechada</p>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card title="Avisos Importantes">
                    <div className="space-y-3">
                        <div className="p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
                            <h4 className="font-bold text-amber-800 text-sm">Fechamento de Notas</h4>
                            <p className="text-amber-700 text-sm">Professores devem lançar as notas do 3º Bimestre até o dia 30/10.</p>
                        </div>
                        <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                            <h4 className="font-bold text-blue-800 text-sm">Campanha de Matrículas</h4>
                            <p className="text-blue-700 text-sm">Início das rematrículas para 2025 começa na próxima segunda.</p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};