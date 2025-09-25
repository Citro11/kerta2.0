import React, { useState } from 'react';
import { User } from '../types/types';
import { useStorage } from '../hooks/useStorage';
import { Calendar, Award, UserX, LogOut } from 'lucide-react';

interface StudentDashboardProps {
  user: User;
  onLogout: () => void;
}

type ActiveTab = 'schedule' | 'grades' | 'absences';

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('schedule');
  const { subjects, grades, absences } = useStorage();

  const studentGrades = grades.filter(grade => grade.studentId === user.id);
  const studentAbsences = absences.filter(absence => absence.studentId === user.id);

  const tabs = [
    { id: 'schedule' as const, name: 'Órarend', icon: Calendar },
    { id: 'grades' as const, name: 'Jegyek', icon: Award },
    { id: 'absences' as const, name: 'Hiányzások', icon: UserX },
  ];

  const formatGrade = (grade: number) => {
    const gradeColors = {
      5: 'text-green-600',
      4: 'text-blue-600',
      3: 'text-yellow-600',
      2: 'text-red-600',
      1: 'text-red-700'
    };
    return gradeColors[grade as keyof typeof gradeColors] || 'text-gray-600';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Diák felület</h1>
              <p className="text-sm text-gray-600">Üdvözöljük, {user.name}!</p>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition duration-200"
            >
              <LogOut className="h-5 w-5" />
              Kilépés
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition duration-200 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {tab.name}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Schedule View */}
        {activeTab === 'schedule' && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Órarend</h2>
            </div>
            <div className="p-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {subjects.map((subject) => (
                  <div key={subject.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-200">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{subject.name}</h3>
                      <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {subject.day}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Időpont:</strong> {subject.time}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Terem:</strong> {subject.room}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Grades View */}
        {activeTab === 'grades' && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Jegyek</h2>
            </div>
            <div className="p-6">
              {studentGrades.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Még nincsenek rögzített jegyek.</p>
              ) : (
                <div className="space-y-4">
                  {studentGrades.map((grade) => (
                    <div key={grade.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{grade.subject}</h3>
                        <p className="text-sm text-gray-600">{grade.description}</p>
                        <p className="text-xs text-gray-500">{grade.date}</p>
                      </div>
                      <div className="text-right">
                        <span className={`text-2xl font-bold ${formatGrade(grade.grade)}`}>
                          {grade.grade}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Absences View */}
        {activeTab === 'absences' && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Hiányzások</h2>
            </div>
            <div className="p-6">
              {studentAbsences.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Nincsenek rögzített hiányzások.</p>
              ) : (
                <div className="space-y-4">
                  {studentAbsences.map((absence) => (
                    <div key={absence.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{absence.subject}</h3>
                        <p className="text-sm text-gray-600">{absence.reason}</p>
                        <p className="text-xs text-gray-500">{absence.date}</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          absence.justified 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {absence.justified ? 'Igazolt' : 'Igazolatlan'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};