import React, { useState, useEffect } from "react";
import { firestoreService, COLLECTIONS } from "../services/firestoreService";
import FormModal from "./components/FormModal";
import ConfirmModal from "./components/ConfirmModal";

const AdminWorkshops = () => {
  const [workshops, setWorkshops] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingWorkshop, setEditingWorkshop] = useState(null);
  const [deletingWorkshop, setDeletingWorkshop] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    level: "Beginner",
    duration: "",
  });

  useEffect(() => {
    const unsubscribe = firestoreService.subscribeToCollection(
      COLLECTIONS.WORKSHOPS,
      setWorkshops
    );
    return () => unsubscribe();
  }, []);

  const handleAdd = () => {
    setEditingWorkshop(null);
    setFormData({
      title: "",
      description: "",
      date: "",
      level: "Beginner",
      duration: "",
    });
    setIsFormOpen(true);
  };

  const handleEdit = (workshop) => {
    setEditingWorkshop(workshop);
    setFormData({
      title: workshop.title || "",
      description: workshop.description || "",
      date: workshop.date || "",
      level: workshop.level || "Beginner",
      duration: workshop.duration || "",
    });
    setIsFormOpen(true);
  };

  const handleDelete = (workshop) => {
    setDeletingWorkshop(workshop);
    setIsDeleteOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingWorkshop) {
        await firestoreService.update(
          COLLECTIONS.WORKSHOPS,
          editingWorkshop.id,
          formData
        );
      } else {
        await firestoreService.add(COLLECTIONS.WORKSHOPS, formData);
      }
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error saving workshop:", error);
      alert("Failed to save workshop. Please try again.");
    }
  };

  const confirmDelete = async () => {
    try {
      await firestoreService.delete(COLLECTIONS.WORKSHOPS, deletingWorkshop.id);
      setIsDeleteOpen(false);
      setDeletingWorkshop(null);
    } catch (error) {
      console.error("Error deleting workshop:", error);
      alert("Failed to delete workshop. Please try again.");
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
        <h2 className="text-3xl font-bold text-gray-800">Manage Workshops</h2>
        <button
          onClick={handleAdd}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold shadow-md"
        >
          + Add Workshop
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workshops.map((workshop) => (
          <div
            key={workshop.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-start mb-3">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                {workshop.level}
              </span>
              <span className="text-sm text-gray-500">{workshop.date}</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{workshop.title}</h3>
            {workshop.duration && (
              <p className="text-sm text-gray-600 mb-2">
                Duration: {workshop.duration}
              </p>
            )}
            <p className="text-gray-700 mb-4 line-clamp-3">{workshop.description}</p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleEdit(workshop)}
                className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition font-medium"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(workshop)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {workshops.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No workshops yet. Add your first workshop!</p>
        </div>
      )}

      <FormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmit}
        title={editingWorkshop ? "Edit Workshop" : "Add New Workshop"}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Workshop Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date *
            </label>
            <input
              type="text"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              placeholder="e.g., Jan 15, 2025"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Level *
            </label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration
            </label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g., 2 hours"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>
      </FormModal>

      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Workshop"
        message={`Are you sure you want to delete "${deletingWorkshop?.title}"? This action cannot be undone.`}
      />
    </div>
  );
};

export default AdminWorkshops;
