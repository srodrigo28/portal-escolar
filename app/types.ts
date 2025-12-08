export enum View {
    DASHBOARD = 'DASHBOARD',
    STUDENTS = 'STUDENTS',
    STAFF = 'STAFF',
    CLASSES = 'CLASSES',
    GRADES = 'GRADES',
    ROOM = 'ROOM',
    WIZARD = 'WIZARD',
    DELIVERY = 'DELIVERY',
    ADJUDICATION = 'ADJUDICATION',
    SUBJECTS = 'SUBJECTS',
}

export type StaffRole = 'Professor' | 'Administrativo' | 'Limpeza' | 'Segurança' | 'Direção';

export interface Student {
    id: string;
    name: string;
    grade: string; // ex: "9º Ano"
    classId: string; // ex: "A"
    enrollmentId: string; // Matrícula
    status: 'Ativo' | 'Inativo' | 'Transferido';
}

export interface Staff {
    id: string;
    name: string;
    role: StaffRole;
    email: string;
    phone: string;
}

export interface SchoolClass {
    id: string;
    name: string; // 1º Ano A
    teacherId: string;
    studentsCount: number;
    capacity: number;
}

export interface GradeEntry {
    studentId: string;
    studentName: string;
    subject: string;
    q1: number;
    q2: number;
    q3: number;
    q4: number;
}

export interface Notification {
    id: number;
    title: string;
    type: 'warning' | 'info';
}

export interface Bid {
    id: string;
    bidder: string;
    amount: number;
    timestamp: Date;
    isMe?: boolean;
}

export interface Subject {
    id: string;
    name: string;
    workload: number;
}