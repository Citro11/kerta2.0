import { useState, useEffect } from 'react';
import { Subject, Grade, Absence } from '../types/types';

const INITIAL_SUBJECTS: Subject[] = [
  { id: '1', name: 'Matematika', room: 'A-101', time: '08:00-08:45', day: 'Hétfő' },
  { id: '2', name: 'Magyar irodalom', room: 'B-203', time: '08:55-09:40', day: 'Hétfő' },
  { id: '3', name: 'Történelem', room: 'A-105', time: '10:00-10:45', day: 'Kedd' },
  { id: '4', name: 'Angol nyelv', room: 'C-301', time: '08:00-08:45', day: 'Szerda' },
  { id: '5', name: 'Fizika', room: 'D-102', time: '10:00-10:45', day: 'Csütörtök' },
];

const INITIAL_GRADES: Grade[] = [
  { id: '1', studentId: '2', subject: 'Matematika', grade: 4, date: '2025-01-10', description: 'Dolgozat' },
  { id: '2', studentId: '2', subject: 'Magyar irodalom', grade: 5, date: '2025-01-12', description: 'Szóbeli felelet' },
  { id: '3', studentId: '2', subject: 'Történelem', grade: 3, date: '2025-01-15', description: 'Témazáró' },
];

const INITIAL_ABSENCES: Absence[] = [
  { id: '1', studentId: '2', date: '2025-01-14', subject: 'Angol nyelv', reason: 'Betegség', justified: true },
];

export const useStorage = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [absences, setAbsences] = useState<Absence[]>([]);

  useEffect(() => {
    const savedSubjects = localStorage.getItem('subjects');
    const savedGrades = localStorage.getItem('grades');
    const savedAbsences = localStorage.getItem('absences');

    setSubjects(savedSubjects ? JSON.parse(savedSubjects) : INITIAL_SUBJECTS);
    setGrades(savedGrades ? JSON.parse(savedGrades) : INITIAL_GRADES);
    setAbsences(savedAbsences ? JSON.parse(savedAbsences) : INITIAL_ABSENCES);
  }, []);

  const saveSubjects = (newSubjects: Subject[]) => {
    setSubjects(newSubjects);
    localStorage.setItem('subjects', JSON.stringify(newSubjects));
  };

  const saveGrades = (newGrades: Grade[]) => {
    setGrades(newGrades);
    localStorage.setItem('grades', JSON.stringify(newGrades));
  };

  const saveAbsences = (newAbsences: Absence[]) => {
    setAbsences(newAbsences);
    localStorage.setItem('absences', JSON.stringify(newAbsences));
  };

  return {
    subjects,
    grades,
    absences,
    saveSubjects,
    saveGrades,
    saveAbsences
  };
};