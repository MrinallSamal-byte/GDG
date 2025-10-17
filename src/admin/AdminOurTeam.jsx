import React, { useState, useEffect } from "react";
import { firestoreService, COLLECTIONS } from "../services/firestoreService";
import FormModal from "./components/FormModal";
import ConfirmModal from "./components/ConfirmModal";

const AdminOurTeam = () => {
  const [members, setMembers] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [deletingMember, setDeletingMember] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    team: "Lead",
    photo: "",
    linkedin: "",
    github: "",
    email: "",
  });

  useEffect(() => {
    const unsubscribe = firestoreService.subscribeToCollection(
      COLLECTIONS.TEAM_MEMBERS,
      setMembers
    );
    return () => unsubscribe();
  }, []);

  const handleAdd = () => {
    setEditingMember(null);
    setFormData({
      name: "",
      role: "",
      team: "Lead",
      photo: "",
      linkedin: "",
      github: "",
      email: "",
    });
    setIsFormOpen(true);
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setFormData({
      name: member.name || "",
      role: member.role || "",
      team: member.team || "Lead",
      photo: member.photo || "",
      linkedin: member.linkedin || "",
      github: member.github || "",
      email: member.email || "",
    });
    setIsFormOpen(true);
  };

  const handleDelete = (member) => {
    setDeletingMember(member);
    setIsDeleteOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingMember) {
        await firestoreService.update(
          COLLECTIONS.TEAM_MEMBERS,
          editingMember.id,
          formData
        );
      } else {
        await firestoreService.add(COLLECTIONS.TEAM_MEMBERS, formData);
      }
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error saving member:", error);
      alert("Failed to save member. Please try again.");
    }
  };

  const confirmDelete = async () => {
    try {
      await firestoreService.delete(COLLECTIONS.TEAM_MEMBERS, deletingMember.id);
      setIsDeleteOpen(false);
      setDeletingMember(null);
    } catch (error) {
      console.error("Error deleting member:", error);
      alert("Failed to delete member. Please try again.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const groupedMembers = members.reduce((acc, member) => {
    const team = member.team || "Other";
    if (!acc[team]) acc[team] = [];
    acc[team].push(member);
    return acc;
  }, {});

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Manage Team Members</h2>
        <button
          onClick={handleAdd}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold shadow-md"
        >
          + Add Member
        </button>
      </div>

      {Object.keys(groupedMembers).map((team) => (
        <div key={team} className="mb-8">
          <h3 className="text-2xl font-bold text-gray-700 mb-4">{team} Team</h3>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {groupedMembers[team].map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition text-center"
              >
                {member.photo && (
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                )}
                <h4 className="text-lg font-bold text-gray-800 mb-1">
                  {member.name}
                </h4>
                <p className="text-sm text-gray-600 mb-3">{member.role}</p>
                <div className="flex justify-center gap-2 mb-4">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      LinkedIn
                    </a>
                  )}
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-800 hover:text-black"
                    >
                      GitHub
                    </a>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(member)}
                    className="flex-1 px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(member)}
                    className="flex-1 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {members.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No team members yet. Add your first member!</p>
        </div>
      )}

      <FormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmit}
        title={editingMember ? "Edit Team Member" : "Add New Team Member"}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role *
            </label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              placeholder="e.g., Lead Developer"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Team *
            </label>
            <select
              name="team"
              value={formData.team}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="Lead">Lead</option>
              <option value="Tech">Tech</option>
              <option value="Design">Design</option>
              <option value="PR">PR</option>
              <option value="Media">Media</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Photo URL
            </label>
            <input
              type="url"
              name="photo"
              value={formData.photo}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              LinkedIn URL
            </label>
            <input
              type="url"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              GitHub URL
            </label>
            <input
              type="url"
              name="github"
              value={formData.github}
              onChange={handleChange}
              placeholder="https://github.com/..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>
      </FormModal>

      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Team Member"
        message={`Are you sure you want to delete "${deletingMember?.name}"? This action cannot be undone.`}
      />
    </div>
  );
};

export default AdminOurTeam;
