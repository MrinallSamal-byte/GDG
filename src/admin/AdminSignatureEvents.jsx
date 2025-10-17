import React, { useState, useEffect } from "react";
import { firestoreService, COLLECTIONS } from "../services/firestoreService";
import FormModal from "./components/FormModal";
import ConfirmModal from "./components/ConfirmModal";

const AdminSignatureEvents = () => {
  const [events, setEvents] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [deletingEvent, setDeletingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    status: "Upcoming",
    registrationLink: "",
    image: "",
  });

  useEffect(() => {
    const unsubscribe = firestoreService.subscribeToCollection(
      COLLECTIONS.SIGNATURE_EVENTS,
      setEvents
    );
    return () => unsubscribe();
  }, []);

  const handleAdd = () => {
    setEditingEvent(null);
    setFormData({
      title: "",
      description: "",
      date: "",
      status: "Upcoming",
      registrationLink: "",
      image: "",
    });
    setIsFormOpen(true);
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title || "",
      description: event.description || "",
      date: event.date || "",
      status: event.status || "Upcoming",
      registrationLink: event.registrationLink || "",
      image: event.image || "",
    });
    setIsFormOpen(true);
  };

  const handleDelete = (event) => {
    setDeletingEvent(event);
    setIsDeleteOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEvent) {
        await firestoreService.update(
          COLLECTIONS.SIGNATURE_EVENTS,
          editingEvent.id,
          formData
        );
      } else {
        await firestoreService.add(COLLECTIONS.SIGNATURE_EVENTS, formData);
      }
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error saving event:", error);
      alert("Failed to save event. Please try again.");
    }
  };

  const confirmDelete = async () => {
    try {
      await firestoreService.delete(
        COLLECTIONS.SIGNATURE_EVENTS,
        deletingEvent.id
      );
      setIsDeleteOpen(false);
      setDeletingEvent(null);
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event. Please try again.");
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
        <h2 className="text-3xl font-bold text-gray-800">Manage Signature Events</h2>
        <button
          onClick={handleAdd}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold shadow-md"
        >
          + Add Event
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
          >
            {event.image && (
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-gray-800">{event.title}</h3>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  event.status === "Upcoming"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {event.status}
              </span>
            </div>
            <p className="text-gray-600 mb-2">{event.date}</p>
            <p className="text-gray-700 mb-4 line-clamp-3">{event.description}</p>
            {event.registrationLink && (
              <a
                href={event.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                Registration Link
              </a>
            )}
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleEdit(event)}
                className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition font-medium"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(event)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {events.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No signature events yet. Add your first event!</p>
        </div>
      )}

      <FormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmit}
        title={editingEvent ? "Edit Event" : "Add New Event"}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Title *
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
              placeholder="e.g., March 2025"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status *
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="Upcoming">Upcoming</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Registration Link
            </label>
            <input
              type="url"
              name="registrationLink"
              value={formData.registrationLink}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URL
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>
      </FormModal>

      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Event"
        message={`Are you sure you want to delete "${deletingEvent?.title}"? This action cannot be undone.`}
      />
    </div>
  );
};

export default AdminSignatureEvents;
