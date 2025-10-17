import React, { useState, useEffect } from "react";
import { firestoreService, COLLECTIONS } from "../services/firestoreService";
import FormModal from "./components/FormModal";
import ConfirmModal from "./components/ConfirmModal";

const AdminFlagshipPrograms = () => {
  const [programs, setPrograms] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);
  const [deletingProgram, setDeletingProgram] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    features: "",
  });

  useEffect(() => {
    const unsubscribe = firestoreService.subscribeToCollection(
      COLLECTIONS.FLAGSHIP_PROGRAMS,
      setPrograms
    );
    return () => unsubscribe();
  }, []);

  const handleAdd = () => {
    setEditingProgram(null);
    setFormData({
      title: "",
      description: "",
      features: "",
    });
    setIsFormOpen(true);
  };

  const handleEdit = (program) => {
    setEditingProgram(program);
    setFormData({
      title: program.title || "",
      description: program.description || "",
      features: Array.isArray(program.features)
        ? program.features.join("\n")
        : program.features || "",
    });
    setIsFormOpen(true);
  };

  const handleDelete = (program) => {
    setDeletingProgram(program);
    setIsDeleteOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSave = {
        ...formData,
        features: formData.features.split("\n").filter((f) => f.trim()),
      };

      if (editingProgram) {
        await firestoreService.update(
          COLLECTIONS.FLAGSHIP_PROGRAMS,
          editingProgram.id,
          dataToSave
        );
      } else {
        await firestoreService.add(COLLECTIONS.FLAGSHIP_PROGRAMS, dataToSave);
      }
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error saving program:", error);
      alert("Failed to save program. Please try again.");
    }
  };

  const confirmDelete = async () => {
    try {
      await firestoreService.delete(
        COLLECTIONS.FLAGSHIP_PROGRAMS,
        deletingProgram.id
      );
      setIsDeleteOpen(false);
      setDeletingProgram(null);
    } catch (error) {
      console.error("Error deleting program:", error);
      alert("Failed to delete program. Please try again.");
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
          Manage Flagship Programs
        </h2>
        <button
          onClick={handleAdd}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold shadow-md"
        >
          + Add Program
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {programs.map((program) => (
          <div
            key={program.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
          >
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">🚀</span>
              <h3 className="text-xl font-bold text-gray-800">{program.title}</h3>
            </div>
            <p className="text-gray-700 mb-4">{program.description}</p>
            {program.features && program.features.length > 0 && (
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                {program.features.map((feature, idx) => (
                  <li key={idx} className="text-sm">
                    {feature}
                  </li>
                ))}
              </ul>
            )}
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleEdit(program)}
                className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition font-medium"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(program)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {programs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No flagship programs yet. Add your first program!
          </p>
        </div>
      )}

      <FormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmit}
        title={editingProgram ? "Edit Program" : "Add New Program"}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Program Title *
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
              Features (one per line)
            </label>
            <textarea
              name="features"
              value={formData.features}
              onChange={handleChange}
              rows="5"
              placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>
      </FormModal>

      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Program"
        message={`Are you sure you want to delete "${deletingProgram?.title}"? This action cannot be undone.`}
      />
    </div>
  );
};

export default AdminFlagshipPrograms;
