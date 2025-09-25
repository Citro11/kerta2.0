import React, { useState } from 'react';
import { Absence } from '../../types/types';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

interface AbsenceManagerProps {
  absences: Absence[];
  onSave: (absences: Absence[]) => void;
}

export const AbsenceManager: React.FC<AbsenceManagerProps> = ({ absences, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingAbsence, setEditingAbsence] = useState<Absence | null>(null);
  const [formData, setFormData] = useState({
    subject: '',
    reason: '',
    date: new Date().toISOString().split('T')[0],
    justified: true,
  });

  const subjects = ['Matematika', 'Magyar irodalom', 'Történelem', 'Angol nyelv', 'Fizika', 'Kémia', 'Biológia'];

  const handleAddNew = () => {
    setFormData({
      subject: '',
      reason: '',
      date: new Date().toISOString().split('T')[0],
      justified: true,
    });
    setEditingAbsence(null);
    setIsEditing(true);
  };

  const handleEdit = (absence: Absence) => {
    setFormData({
      subject: absence.subject,
      reason: absence.reason,
      date: absence.date,
      justified: absence.justified,
    });
    setEditingAbsence(absence);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!formData.subject || !formData.reason) return;

    const newAbsence: Absence = {
      id: editingAbsence?.id || Date.now().toString(),
      studentId: '2', // B.F.Andi ID
      subject: formData.subject,
      reason: formData.reason,
      date: formData.date,
      justified: formData.justified,
    };

    const updatedAbsences = editingAbsence
      ? absences.map(a => a.id === editingAbsence.id ? newAbsence : a)
      : [...absences, newAbsence];

    onSave(updatedAbsences);
    setIsEditing(false);
    setEditingAbsence(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Biztosan törli ezt a hiányzást?')) {
      onSave(absences.filter(a => a.id !== id));
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingAbsence(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="px-6 py-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Hiányzások kezelése</h2>
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
        >
          <Plus className="h-4 w-4" />
          Új hiányzás rögzítése
        </button>
      </div>

      <div className="p-6">
        {/* Add/Edit Form */}
        {isEditing && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
            <h3 className="text-md font-medium text-gray-900 mb-4">
              {editingAbsence ? 'Hiányzás szerkesztése' : 'Új hiányzás rögzítése'}
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
                  Dátum
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hiányzás oka
                </label>
                <input
                  type="text"
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="pl. Betegség, Családi ok, stb."
                />
              </div>
              <div className="md:col-span-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.justified}
                    onChange={(e) => setFormData({ ...formData, justified: e.target.checked })}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Igazolt hiányzás
                  </span>
                </label>
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

        {/* Absences List */}
        <div className="space-y-4">
          {absences.map((absence) => (
            <div key={absence.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition duration-200">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-medium text-gray-900">{absence.subject}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    absence.justified 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {absence.justified ? 'Igazolt' : 'Igazolatlan'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{absence.reason}</p>
                <p className="text-xs text-gray-500">{absence.date} • B.F.Andi</p>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => handleEdit(absence)}
                  className="p-2 text-gray-500 hover:text-blue-600 transition duration-200"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(absence.id)}
                  className="p-2 text-gray-500 hover:text-red-600 transition duration-200"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {absences.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Még nincsenek rögzített hiányzások.</p>
            <p className="text-sm text-gray-400 mt-1">Kattintson az "Új hiányzás rögzítése" gombra.</p>
          </div>
        )}
      </div>
    </div>
  );
};