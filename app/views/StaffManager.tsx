import React, { useState, useEffect } from 'react';
import { Search, Plus, Mail, Phone, Briefcase, X, UserCog, Pencil } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Staff, StaffRole } from '../types';



export const StaffManager: React.FC = () => {
  // Initialize state
  const [staffList, setStaffList] = useState<Staff[]>([]);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form States
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState<StaffRole | ''>('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');

  // Fetch Staff from API
  useEffect(() => {
    fetch('http://localhost:3001/staff')
      .then(res => res.json())
      .then(data => setStaffList(data))
      .catch(err => console.error('Error fetching staff:', err));
  }, []);

  const resetForm = () => {
    setNewName('');
    setNewRole('');
    setNewEmail('');
    setNewPhone('');
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

  const handleEdit = (staff: Staff) => {
    setNewName(staff.name);
    setNewRole(staff.role);
    setNewEmail(staff.email);
    setNewPhone(staff.phone);
    setEditingId(staff.id);
    setShowModal(true);
  };

  const handleSaveStaff = async () => {
    if (!newName || !newRole) {
      alert("Por favor, preencha o Nome e o Cargo.");
      return;
    }

    if (editingId) {
      // Update existing
      const updatedData = {
        name: newName,
        role: newRole as StaffRole,
        email: newEmail,
        phone: newPhone
      };

      try {
        const res = await fetch(`http://localhost:3001/staff/${editingId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedData)
        });
        const savedStaff = await res.json();

        setStaffList(prevList => prevList.map(staff =>
          staff.id === editingId ? savedStaff : staff
        ));
      } catch (err) {
        console.error("Error updating staff:", err);
        alert("Erro ao atualizar funcionário.");
      }
    } else {
      // Create new
      const newStaffMember: Omit<Staff, 'id'> = {
        name: newName,
        role: newRole as StaffRole,
        email: newEmail || `${newName.toLowerCase().split(' ')[0]}@escola.com`,
        phone: newPhone || '(11) 00000-0000'
      };

      try {
        const res = await fetch('http://localhost:3001/staff', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newStaffMember)
        });
        const savedStaff = await res.json();
        setStaffList([...staffList, savedStaff]);
      } catch (err) {
        console.error("Error creating staff:", err);
        alert("Erro ao criar funcionário.");
      }
    }

    handleCloseModal();
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Direção': return 'bg-purple-100 text-purple-700';
      case 'Professor': return 'bg-blue-100 text-blue-700';
      case 'Segurança': return 'bg-slate-800 text-white';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  const getAvatarColor = (role: string) => {
    switch (role) {
      case 'Direção': return 'bg-purple-500';
      case 'Professor': return 'bg-blue-500';
      case 'Segurança': return 'bg-slate-700';
      default: return 'bg-slate-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Corpo Docente e Funcionários</h1>
          <p className="text-slate-500">Administração de recursos humanos da escola.</p>
        </div>
        <button
          onClick={handleOpenModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 shadow-md transition-colors"
        >
          <Plus size={20} /> Novo Funcionário
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staffList.map(staff => (
          <Card key={staff.id} className="hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${getAvatarColor(staff.role)}`}>
                {staff.name.substring(0, 2).toUpperCase()}
              </div>
              <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${getRoleColor(staff.role)}`}>
                {staff.role}
              </span>
            </div>

            <h3 className="font-bold text-lg text-slate-800 mb-1">{staff.name}</h3>
            <div className="space-y-2 text-sm text-slate-500 mt-4">
              <div className="flex items-center gap-2">
                <Mail size={16} /> {staff.email}
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} /> {staff.phone}
              </div>
              <div className="flex items-center gap-2">
                <Briefcase size={16} /> {staff.role === 'Professor' ? '40h Semanais' : '44h Semanais'}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex gap-2">
              <button
                onClick={() => handleEdit(staff)}
                className="flex-1 py-2 text-blue-600 border border-blue-200 rounded hover:bg-blue-50 text-sm font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <Pencil size={16} /> Editar
              </button>
              <button className="flex-1 py-2 text-slate-600 border border-slate-200 rounded hover:bg-slate-50 text-sm font-medium">Histórico</button>
            </div>
          </Card>
        ))}
      </div>

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

            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                <UserCog size={24} />
              </div>
              <h2 className="text-xl font-bold text-slate-800">
                {editingId ? 'Editar Colaborador' : 'Novo Colaborador'}
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nome Completo *</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Ex: Maria Oliveira"
                  className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none border-slate-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Cargo / Função *</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as StaffRole)}
                  className="w-full border p-2.5 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none border-slate-300"
                >
                  <option value="">Selecione o cargo...</option>
                  <option value="Professor">Professor(a)</option>
                  <option value="Direção">Direção / Coordenação</option>
                  <option value="Administrativo">Administrativo / Secretaria</option>
                  <option value="Limpeza">Serviços Gerais / Limpeza</option>
                  <option value="Segurança">Segurança / Portaria</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email Corporativo</label>
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="email@escola.com"
                    className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none border-slate-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Telefone</label>
                  <input
                    type="tel"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="(00) 00000-0000"
                    className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none border-slate-300"
                  />
                </div>
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
                onClick={handleSaveStaff}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-lg shadow-blue-200 transition-all transform active:scale-95"
              >
                {editingId ? 'Salvar Alterações' : 'Cadastrar Funcionário'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};