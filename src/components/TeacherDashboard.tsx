import React, { useState } from 'react';
import { User } from '../types/types';
import { useStorage } from '../hooks/useStorage';
import { ScheduleManager } from './teacher/ScheduleManager';
import { GradeManager } from './teacher/GradeManager';
import { AbsenceManager } from './teacher/AbsenceManager';
import { Calendar, Award, UserX, LogOut } from 'lucide-react';

interface TeacherDashboardProps {
  user: User;
  onLogout: () => void;
}

type ActiveTab = 'schedule' | 'grades' | 'absences';

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('schedule');
  const { subjects, grades, absences, saveSubjects, saveGrades, saveAbsences } = useStorage();

  const tabs = [
    { id: 'schedule' as const, name: 'Órarend', icon: Calendar },
    { id: 'grades' as const, name: 'Jegyek', icon: Award },
    { id: 'absences' as const, name: 'Hiányzások', icon: UserX },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tanári felület</h1>
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
        {activeTab === 'schedule' && (
          <ScheduleManager subjects={subjects} onSave={saveSubjects} />
        )}
        {activeTab === 'grades' && (
          <GradeManager grades={grades} onSave={saveGrades} />
        )}
        {activeTab === 'absences' && (
          <AbsenceManager absences={absences} onSave={saveAbsences} />
        )}
      </main>
    </div>
  );
};