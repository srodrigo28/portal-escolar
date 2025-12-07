import React from 'react';
import { View } from '../types';
import { LogOut, Home, Users, GraduationCap, BookOpen, UserCog } from 'lucide-react';

interface LayoutProps {
    children: React.ReactNode;
    view: View;
    onNavigate: (view: View) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, view, onNavigate }) => {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-900">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-slate-900 text-white flex-shrink-0 flex flex-col">
                <div className="p-6 border-b border-slate-800">
                    <span className="text-xl font-bold tracking-tight">Portal <span className="text-blue-400">Escolar</span></span>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <button
                        onClick={() => onNavigate(View.DASHBOARD)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${view === View.DASHBOARD ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                    >
                        <Home size={20} /> Visão Geral
                    </button>

                    <button
                        onClick={() => onNavigate(View.STUDENTS)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${view === View.STUDENTS ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                    >
                        <Users size={20} /> Alunos
                    </button>

                    <button
                        onClick={() => onNavigate(View.STAFF)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${view === View.STAFF ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                    >
                        <UserCog size={20} /> Funcionários
                    </button>

                    <button
                        onClick={() => onNavigate(View.CLASSES)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${view === View.CLASSES ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                    >
                        <BookOpen size={20} /> Turmas
                    </button>

                    <button
                        onClick={() => onNavigate(View.GRADES)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${view === View.GRADES ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                    >
                        <GraduationCap size={20} /> Notas e Boletim
                    </button>
                </nav>

                <div className="p-4 border-t border-slate-800 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold">AD</div>
                    <div className="flex-1">
                        <p className="text-sm font-medium">Admin</p>
                        <p className="text-xs text-slate-400">Secretaria Escolar</p>
                    </div>
                    <button className="text-slate-400 hover:text-white"><LogOut size={18} /></button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <div className="p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
};