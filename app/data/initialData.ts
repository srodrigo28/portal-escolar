import { Student, Staff, SchoolClass } from '../types';

export const INITIAL_STUDENTS: Student[] = [
    { id: '1', name: 'Ana Silva', enrollmentId: '2024001', grade: '9º Ano', classId: 'A', status: 'Ativo' },
    { id: '2', name: 'Bruno Santos', enrollmentId: '2024002', grade: '9º Ano', classId: 'A', status: 'Ativo' },
    { id: '3', name: 'Carla Dias', enrollmentId: '2024003', grade: '8º Ano', classId: 'B', status: 'Inativo' },
    { id: '4', name: 'Daniel Oliveira', enrollmentId: '2024004', grade: '1º Ano EM', classId: 'A', status: 'Ativo' },
    { id: '5', name: 'Eduarda Lima', enrollmentId: '2024005', grade: '3º Ano EM', classId: 'C', status: 'Transferido' },
    { id: '6', name: 'Galvão', enrollmentId: '2028006', grade: '3º Ano EM', classId: 'C', status: 'Transferido' },
    { id: '7', name: 'Gabriel', enrollmentId: '2028006', grade: '3º Ano EM', classId: 'C', status: 'Transferido' },
];

export const INITIAL_STAFF: Staff[] = [
    { id: '1', name: 'Roberto Almeida', role: 'Direção', email: 'diretor@escola.com', phone: '(11) 99999-0001' },
    { id: '2', name: 'Juliana Costa', role: 'Professor', email: 'juliana.mat@escola.com', phone: '(11) 99999-0002' },
    { id: '3', name: 'Marcos Pereira', role: 'Professor', email: 'marcos.hist@escola.com', phone: '(11) 99999-0003' },
    { id: '4', name: 'Sandra Souza', role: 'Limpeza', email: 'sandra@escola.com', phone: '(11) 99999-0004' },
    { id: '5', name: 'Paulo Silva', role: 'Segurança', email: 'paulo@escola.com', phone: '(11) 99999-0005' },
];

export const INITIAL_CLASSES: SchoolClass[] = [
    { id: '1', name: '1º Ano Fund. - A', teacherId: 'Profa. Juliana', studentsCount: 0, capacity: 30 },
    { id: '2', name: '1º Ano Fund. - B', teacherId: 'Profa. Amanda', studentsCount: 0, capacity: 30 },
    { id: '3', name: '5º Ano Fund. - A', teacherId: 'Prof. Carlos', studentsCount: 0, capacity: 35 },
    { id: '4', name: '9º Ano Fund. - A', teacherId: 'Prof. Marcos', studentsCount: 0, capacity: 35 },
    { id: '5', name: '3º Ano Médio - D', teacherId: 'Prof. Pedro', studentsCount: 0, capacity: 40 },
];

export const STORAGE_KEYS = {
    STUDENTS: 'portal_escolar_students',
    STAFF: 'portal_escolar_staff',
    CLASSES: 'portal_escolar_classes',
};
