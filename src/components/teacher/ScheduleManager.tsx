import React, { useState } from 'react';
import { Subject } from '../../types/types';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

interface ScheduleManagerProps {
  subjects: Subject[];
  onSave: (subjects: Subject[]) => void;
}

export const ScheduleManager: React.FC<ScheduleManagerProps> = ({ subjects, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    room: '',
    time: '',
    day: '',
  });

  const days = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek'];

  const handleAddNew = () => {
    setFormData({ name: '', room: '', time: '', day: 'Hétfő' });
    setEditingSubject(null);
    setIsEditing(true);
  };

  const handleEdit = (subject: Subject) => {
    setFormData({
      name: subject.name,
      room: subject.room,
      time: subject.time,
      day: subject.day,
    });
    setEditingSubject(subject);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.room || !formData.time || !formData.day) return;

    const newSubject: Subject = {
      id: editingSubject?.id || Date.now().toString(),
      name: formData.name,
      room: formData.room,
      time: formData.time,
      day: formData.day,
    };

    const updatedSubjects = editingSubject
      ? subjects.map(s => s.id === editingSubject.id ? newSubject : s)
      : [...subjects, newSubject];

    onSave(updatedSubjects);
    setIsEditing(false);
    setEditingSubject(null);
    setFormData({ name: '', room: '', time: '', day: '' });
  };

  const handleDelete = (id: string) => {
    if (confirm('Biztosan törli ezt az órát?')) {
      onSave(subjects.filter(s => s.id !== id));
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingSubject(null);
    setFormData({ name: '', room: '', time: '', day: '' });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="px-6 py-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Órarend kezelése</h2>
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
        >
          <Plus className="h-4 w-4" />
          Új óra hozzáadása
        </button>
      </div>

      <div className="p-6">
        {/* Add/Edit Form */}
        {isEditing && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
            <h3 className="text-md font-medium text-gray-900 mb-4">
              {editingSubject ? 'Óra szerkesztése' : 'Új óra hozzáadása'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tantárgy neve
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="pl. Matematika"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Terem
                </label>
                <input
                  type="text"
                  value={formData.room}
                  onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="pl. A-101"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Időpont
                </label>
                <input
                  type="text"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="pl. 08:00-08:45"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nap
                </label>
                <select
                  value={formData.day}
                  onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {days.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
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

        {/* Schedule List */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => (
            <div key={subject.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-900">{subject.name}</h3>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleEdit(subject)}
                    className="p-1 text-gray-500 hover:text-blue-600 transition duration-200"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(subject.id)}
                    className="p-1 text-gray-500 hover:text-red-600 transition duration-200"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Nap:</span>
                  <span className="font-medium">{subject.day}</span>
                </div>
                <div className="flex justify-between">
                  <span>Időpont:</span>
                  <span className="font-medium">{subject.time}</span>
                </div>
                <div className="flex justify-between">
                  <span>Terem:</span>
                  <span className="font-medium">{subject.room}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {subjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Még nincsenek órák az órarendben.</p>
            <p className="text-sm text-gray-400 mt-1">Kattintson az "Új óra hozzáadása" gombra.</p>
          </div>
        )}
      </div>
    </div>
  );
};