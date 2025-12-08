import React, { useState } from 'react';
import { User, Lock, Mail, ArrowRight, School } from 'lucide-react';

interface AuthProps {
    onLogin: () => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, we would validate and call an API here.
        // For now, we simulate a successful login/register.
        if (email && password) {
            onLogin();
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl flex overflow-hidden">

                {/* Left Side - Form */}
                <div className="w-full md:w-1/2 p-8 md:p-12">
                    <div className="mb-8">
                        <div className="flex items-center gap-2 text-blue-600 mb-6 font-bold text-2xl">
                            <School size={32} />
                            <span>Portal Escolar</span>
                        </div>
                        <h2 className="text-3xl font-bold text-slate-800 mb-2">
                            {isLogin ? 'Bem-vindo de volta!' : 'Crie sua conta'}
                        </h2>
                        <p className="text-slate-500">
                            {isLogin
                                ? 'Entre com suas credenciais para acessar o painel.'
                                : 'Preencha os dados abaixo para começar.'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Nome Completo</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 text-slate-400" size={20} />
                                    <input
                                        type="text"
                                        className="text-slate-800 w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        placeholder="Seu nome"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">E-mail</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 text-slate-400" size={20} />
                                <input
                                    type="email"
                                    className="text-slate-800 w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-[#B0B0B0]"
                                    placeholder="seu@email.com"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Senha</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 text-slate-400" size={20} />
                                <input
                                    type="password"
                                    className="text-slate-800 w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-[#B0B0B0]"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        {isLogin && (
                            <div className="flex justify-end">
                                <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                                    Esqueceu a senha?
                                </a>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-blue-200"
                        >
                            {isLogin ? 'Entrar no Sistema' : 'Criar Conta'}
                            <ArrowRight size={20} />
                        </button>
                    </form>

                    <div className="mt-8 text-center text-slate-500">
                        {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="ml-2 text-blue-600 font-bold hover:underline bg-transparent border-none cursor-pointer"
                        >
                            {isLogin ? 'Cadastre-se' : 'Entrar'}
                        </button>
                    </div>
                </div>

                {/* Right Side - Image/Decoration */}
                <div className="hidden md:block w-1/2 bg-blue-600 relative overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-br from-blue-600 to-indigo-800 opacity-90"></div>
                    <div className="absolute inset-0 flex flex-col justify-center p-12 text-white z-10">
                        <h3 className="text-4xl font-bold mb-6">Educação do Futuro</h3>
                        <p className="text-blue-100 text-lg leading-relaxed mb-8">
                            Gerencie sua instituição de ensino com eficiência, simplicidade e tecnologia de ponta.
                            Acompanhe alunos, turmas, notas e muito mais em um só lugar.
                        </p>

                        {/* Decorative Elements */}
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 transform -rotate-3 transition-transform hover:rotate-0 duration-500">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="w-10 h-10 bg-green-400 rounded-full flex items-center justify-center text-white font-bold">A</div>
                                <div>
                                    <div className="h-2 w-24 bg-white/40 rounded mb-1"></div>
                                    <div className="h-2 w-16 bg-white/30 rounded"></div>
                                </div>
                            </div>
                            <div className="h-2 w-full bg-white/20 rounded mb-2"></div>
                            <div className="h-2 w-4/5 bg-white/20 rounded"></div>
                        </div>
                    </div>

                    {/* Background Patterns */}
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl"></div>
                </div>
            </div>
        </div>
    );
};
