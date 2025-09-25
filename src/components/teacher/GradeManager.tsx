import React, { useState } from 'react';
import { Grade } from '../../types/types';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

interface GradeManagerProps {
  grades: Grade[];
  onSave: (grades: Grade[]) => void;
}

export const GradeManager: React.FC<GradeManagerProps> = ({ grades, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingGrade, setEditingGrade] = useState<Grade | null>(null);
  const [formData, setFormData] = useState({
    subject: '',
    grade: 5,
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  const subjects = ['Matematika', 'Magyar irodalom', 'Történelem', 'Angol nyelv', 'Fizika', 'Kémia', 'Biológia'];

  const handleAddNew = () => {
    setFormData({
      subject: '',
      grade: 5,
      description: '',
      date: new Date().toISOString().split('T')[0],
    });
    setEditingGrade(null);
    setIsEditing(true);
  };

  const handleEdit = (grade: Grade) => {
    setFormData({
      subject: grade.subject,
      grade: grade.grade,
      description: grade.description,
      date: grade.date,
    });
    setEditingGrade(grade);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!formData.subject || !formData.description) return;

    const newGrade: Grade = {
      id: editingGrade?.id || Date.now().toString(),
      studentId: '2', // B.F.Andi ID
      subject: formData.subject,
      grade: formData.grade,
      description: formData.description,
      date: formData.date,
    };

    const updatedGrades = editingGrade
      ? grades.map(g => g.id === editingGrade.id ? newGrade : g)
      : [...grades, newGrade];

    onSave(updatedGrades);
    setIsEditing(false);
    setEditingGrade(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Biztosan törli ezt a jegyet?')) {
      onSave(grades.filter(g => g.id !== id));
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingGrade(null);
  };

  const formatGrade = (grade: number) => {
    const gradeColors = {
      5: 'text-green-600 bg-green-50',
      4: 'text-blue-600 bg-blue-50',
      3: 'text-yellow-600 bg-yellow-50',
      2: 'text-red-600 bg-red-50',
      1: 'text-red-700 bg-red-100'
    };
    return gradeColors[grade as keyof typeof gradeColors] || 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="px-6 py-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Jegyek kezelése</h2>
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
        >
          <Plus className="h-4 w-4" />
          Új jegy hozzáadása
        </button>
      </div>

      <div className="p-6">
        {/* Add/Edit Form */}
        {isEditing && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
            <h3 className="text-md font-medium text-gray-900 mb-4">
              {editingGrade ? 'Jegy szerkesztése' : 'Új jegy hozzáadása'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tantárgy
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Válasszon tantárgyat</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Jegy
                </label>
                <select
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {[5, 4, 3, 2, 1].map(grade => (
                    <option key={grade} value={grade}>{grade}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Leírás
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="pl. Dolgozat, Szóbeli felelet"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dátum
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
              >
                <Save className="h-4 w-4" />
                Mentés
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-200"
              >
                <X className="h-4 w-4" />
                Mégse
              </button>
            </div>
          </div>
        )}

        {/* Grades List */}
        <div className="space-y-4">
          {grades.map((grade) => (
            <div key={grade.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition duration-200">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-medium text-gray-900">{grade.subject}</h3>
                  <span className={`px-3 py-1 rounded-full font-bold ${formatGrade(grade.grade)}`}>
                    {grade.grade}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{grade.description}</p>
                <p className="text-xs text-gray-500">{grade.date} • B.F.Andi</p>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => handleEdit(grade)}
                  className="p-2 text-gray-500 hover:text-blue-600 transition duration-200"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(grade.id)}
                  className="p-2 text-gray-500 hover:text-red-600 transition duration-200"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {grades.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Még nincsenek rögzített jegyek.</p>
            <p className="text-sm text-gray-400 mt-1">Kattintson az "Új jegy hozzáadása" gombra.</p>
          </div>
        )}
      </div>
    </div>
  );
};