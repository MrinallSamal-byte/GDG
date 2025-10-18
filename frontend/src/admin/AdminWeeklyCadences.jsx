import React, { useState, useEffect } from "react";
import { firestoreService, COLLECTIONS } from "../services/firestoreService";
import FormModal from "./components/FormModal";
import ConfirmModal from "./components/ConfirmModal";

const AdminWeeklyCadences = () => {
  const [cadences, setCadences] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingCadence, setEditingCadence] = useState(null);
  const [deletingCadence, setDeletingCadence] = useState(null);
  const [formData, setFormData] = useState({
    day: "",
    activity: "",
    description: "",
  });

  useEffect(() => {
    const unsubscribe = firestoreService.subscribeToCollection(
      COLLECTIONS.WEEKLY_CADENCES,
      setCadences
    );
    return () => unsubscribe();
  }, []);

  const handleAdd = () => {
    setEditingCadence(null);
    setFormData({
      day: "",
      activity: "",
      description: "",
    });
    setIsFormOpen(true);
  };

  const handleEdit = (cadence) => {
    setEditingCadence(cadence);
    setFormData({
      day: cadence.day || "",
      activity: cadence.activity || "",
      description: cadence.description || "",
    });
    setIsFormOpen(true);
  };

  const handleDelete = (cadence) => {
    setDeletingCadence(cadence);
    setIsDeleteOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCadence) {
        await firestoreService.update(
          COLLECTIONS.WEEKLY_CADENCES,
          editingCadence.id,
          formData
        );
      } else {
        await firestoreService.add(COLLECTIONS.WEEKLY_CADENCES, formData);
      }
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error saving cadence:", error);
      alert("Failed to save cadence. Please try again.");
    }
  };

  const confirmDelete = async () => {
    try {
      await firestoreService.delete(
        COLLECTIONS.WEEKLY_CADENCES,
        deletingCadence.id
      );
      setIsDeleteOpen(false);
      setDeletingCadence(null);
    } catch (error) {
      console.error("Error deleting cadence:", error);
      alert("Failed to delete cadence. Please try again.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          Manage Weekly Cadences
        </h2>
        <button
          onClick={handleAdd}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold shadow-md"
        >
          + Add Activity
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          {cadences.map((cadence) => (
            <div
              key={cadence.id}
              className="flex items-center justify-between border-b pb-4 last:border-b-0"
            >
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                    {cadence.day}
                  </span>
                  <h3 className="text-lg font-bold text-gray-800">
                    {cadence.activity}
                  </h3>
                </div>
                <p className="text-gray-600">{cadence.description}</p>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleEdit(cadence)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(cadence)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {cadences.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No weekly activities yet. Add your first activity!
            </p>
          </div>
        )}
      </div>

      <FormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmit}
        title={editingCadence ? "Edit Activity" : "Add New Activity"}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Day *
            </label>
            <input
              type="text"
              name="day"
              value={formData.day}
              onChange={handleChange}
              required
              placeholder="e.g., Monday"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Activity *
            </label>
            <input
              type="text"
              name="activity"
              value={formData.activity}
              onChange={handleChange}
              required
              placeholder="e.g., Code Review"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>
      </FormModal>

      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Activity"
        message={`Are you sure you want to delete "${deletingCadence?.activity}"? This action cannot be undone.`}
      />
    </div>
  );
};

export default AdminWeeklyCadences;
