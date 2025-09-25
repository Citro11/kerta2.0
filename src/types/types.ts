export interface User {
  id: string;
  username: string;
  password: string;
  role: 'tanar' | 'diak';
  name: string;
}

export interface Subject {
  id: string;
  name: string;
  room: string;
  time: string;
  day: string;
}

export interface Grade {
  id: string;
  studentId: string;
  subject: string;
  grade: number;
  date: string;
  description: string;
}

export interface Absence {
  id: string;
  studentId: string;
  date: string;
  subject: string;
  reason: string;
  justified: boolean;
}