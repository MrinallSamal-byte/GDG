import React, { useState, useEffect } from "react";
import { firestoreService, COLLECTIONS } from "../services/firestoreService";
import FormModal from "./components/FormModal";
import ConfirmModal from "./components/ConfirmModal";

const AdminPlanOfAction = () => {
  const [items, setItems] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deletingItem, setDeletingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Goal",
    timeline: "",
  });

  useEffect(() => {
    const unsubscribe = firestoreService.subscribeToCollection(
      COLLECTIONS.PLAN_OF_ACTION,
      setItems
    );
    return () => unsubscribe();
  }, []);

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      description: "",
      category: "Goal",
      timeline: "",
    });
    setIsFormOpen(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title || "",
      description: item.description || "",
      category: item.category || "Goal",
      timeline: item.timeline || "",
    });
    setIsFormOpen(true);
  };

  const handleDelete = (item) => {
    setDeletingItem(item);
    setIsDeleteOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await firestoreService.update(
          COLLECTIONS.PLAN_OF_ACTION,
          editingItem.id,
          formData
        );
      } else {
        await firestoreService.add(COLLECTIONS.PLAN_OF_ACTION, formData);
      }
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error saving item:", error);
      alert("Failed to save item. Please try again.");
    }
  };

  const confirmDelete = async () => {
    try {
      await firestoreService.delete(COLLECTIONS.PLAN_OF_ACTION, deletingItem.id);
      setIsDeleteOpen(false);
      setDeletingItem(null);
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item. Please try again.");
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
          Manage Plan of Action
        </h2>
        <button
          onClick={handleAdd}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold shadow-md"
        >
          + Add Item
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold">
                {item.category}
              </span>
            </div>
            {item.timeline && (
              <p className="text-sm text-gray-600 mb-2">
                Timeline: {item.timeline}
              </p>
            )}
            <p className="text-gray-700 mb-4">{item.description}</p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleEdit(item)}
                className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition font-medium"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No plan items yet. Add your first item!
          </p>
        </div>
      )}

      <FormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmit}
        title={editingItem ? "Edit Item" : "Add New Item"}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
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
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="Goal">Goal</option>
              <option value="Objective">Objective</option>
              <option value="Strategy">Strategy</option>
              <option value="Initiative">Initiative</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Timeline
            </label>
            <input
              type="text"
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              placeholder="e.g., Q1 2025"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>
      </FormModal>

      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Item"
        message={`Are you sure you want to delete "${deletingItem?.title}"? This action cannot be undone.`}
      />
    </div>
  );
};

export default AdminPlanOfAction;
