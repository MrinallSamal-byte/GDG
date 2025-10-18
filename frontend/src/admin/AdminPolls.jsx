import React, { useState, useEffect } from "react";
import { firestoreService, COLLECTIONS } from "../services/firestoreService";
import { pollService } from "../services/pollService";
import FormModal from "./components/FormModal";
import ConfirmModal from "./components/ConfirmModal";

const AdminPolls = () => {
  const [polls, setPolls] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [editingPoll, setEditingPoll] = useState(null);
  const [deletingPoll, setDeletingPoll] = useState(null);
  const [previewPoll, setPreviewPoll] = useState(null);
  const [analyticsPoll, setAnalyticsPoll] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  
  const [formData, setFormData] = useState({
    title: "",
    options: ["", ""],
    startDate: "",
    endDate: "",
    status: "inactive",
    showResultsAfterVoting: true,
    totalVotes: 0,
  });

  useEffect(() => {
    const unsubscribe = firestoreService.subscribeToCollection(
      COLLECTIONS.POLLS,
      setPolls
    );
    return () => unsubscribe();
  }, []);

  // Auto-deactivate expired polls
  useEffect(() => {
    const checkExpiredPolls = async () => {
      await pollService.deactivateExpiredPolls();
    };
    
    const interval = setInterval(checkExpiredPolls, 60000); // Check every minute
    checkExpiredPolls(); // Check immediately
    
    return () => clearInterval(interval);
  }, []);

  const handleAdd = () => {
    setEditingPoll(null);
    setFormData({
      title: "",
      options: ["", ""],
      startDate: "",
      endDate: "",
      status: "inactive",
      showResultsAfterVoting: true,
      totalVotes: 0,
    });
    setIsFormOpen(true);
  };

  const handleEdit = (poll) => {
    setEditingPoll(poll);
    setFormData({
      title: poll.title || "",
      options: poll.options?.map(opt => opt.text) || ["", ""],
      startDate: poll.startDate ? new Date(poll.startDate.seconds * 1000).toISOString().slice(0, 16) : "",
      endDate: poll.endDate ? new Date(poll.endDate.seconds * 1000).toISOString().slice(0, 16) : "",
      status: poll.status || "inactive",
      showResultsAfterVoting: poll.showResultsAfterVoting !== false,
      totalVotes: poll.totalVotes || 0,
    });
    setIsFormOpen(true);
  };

  const handleDelete = (poll) => {
    setDeletingPoll(poll);
    setIsDeleteOpen(true);
  };

  const handlePreview = (poll) => {
    setPreviewPoll(poll);
    setIsPreviewOpen(true);
  };

  const handleViewAnalytics = async (poll) => {
    setAnalyticsPoll(poll);
    setIsAnalyticsOpen(true);
    const analyticsData = await pollService.getPollAnalytics(poll.id);
    setAnalytics(analyticsData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate options
    const validOptions = formData.options.filter(opt => opt.trim());
    if (validOptions.length < 2) {
      alert("Please provide at least 2 options");
      return;
    }
    if (validOptions.length > 6) {
      alert("Maximum 6 options allowed");
      return;
    }

    try {
      const pollData = {
        title: formData.title,
        options: validOptions.map(text => ({ text, votes: 0 })),
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate),
        status: formData.status,
        showResultsAfterVoting: formData.showResultsAfterVoting,
        totalVotes: editingPoll ? formData.totalVotes : 0,
      };

      if (editingPoll) {
        // Preserve existing vote counts when editing
        if (editingPoll.options) {
          pollData.options = validOptions.map((text, index) => ({
            text,
            votes: editingPoll.options[index]?.votes || 0,
          }));
        }
        await firestoreService.update(COLLECTIONS.POLLS, editingPoll.id, pollData);
      } else {
        await firestoreService.add(COLLECTIONS.POLLS, pollData);
      }
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error saving poll:", error);
      alert("Failed to save poll. Please try again.");
    }
  };

  const confirmDelete = async () => {
    try {
      await firestoreService.delete(COLLECTIONS.POLLS, deletingPoll.id);
      setIsDeleteOpen(false);
      setDeletingPoll(null);
    } catch (error) {
      console.error("Error deleting poll:", error);
      alert("Failed to delete poll. Please try again.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const addOption = () => {
    if (formData.options.length < 6) {
      setFormData({ ...formData, options: [...formData.options, ""] });
    }
  };

  const removeOption = (index) => {
    if (formData.options.length > 2) {
      const newOptions = formData.options.filter((_, i) => i !== index);
      setFormData({ ...formData, options: newOptions });
    }
  };

  const getPollStatus = (poll) => {
    const now = new Date();
    const start = poll.startDate?.seconds ? new Date(poll.startDate.seconds * 1000) : null;
    const end = poll.endDate?.seconds ? new Date(poll.endDate.seconds * 1000) : null;

    if (poll.status === "inactive") return { text: "Inactive", color: "bg-gray-100 text-gray-800" };
    if (!start || !end) return { text: "Draft", color: "bg-yellow-100 text-yellow-800" };
    if (now < start) return { text: "Scheduled", color: "bg-blue-100 text-blue-800" };
    if (now > end) return { text: "Ended", color: "bg-red-100 text-red-800" };
    return { text: "Active", color: "bg-green-100 text-green-800" };
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Manage Polls</h2>
        <button
          onClick={handleAdd}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold shadow-md"
        >
          + Create Poll
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {polls.map((poll) => {
          const status = getPollStatus(poll);
          return (
            <div
              key={poll.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-gray-800 flex-1">
                  {poll.title}
                </h3>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${status.color}`}>
                  {status.text}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Options:</span> {poll.options?.length || 0}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Total Votes:</span> {poll.totalVotes || 0}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Start:</span>{" "}
                  {poll.startDate ? new Date(poll.startDate.seconds * 1000).toLocaleString() : "Not set"}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">End:</span>{" "}
                  {poll.endDate ? new Date(poll.endDate.seconds * 1000).toLocaleString() : "Not set"}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(poll)}
                    className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition font-medium text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(poll)}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition font-medium text-sm"
                  >
                    Delete
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handlePreview(poll)}
                    className="flex-1 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition font-medium text-sm"
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => handleViewAnalytics(poll)}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition font-medium text-sm"
                  >
                    Analytics
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {polls.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No polls yet. Create your first poll!</p>
        </div>
      )}

      {/* Form Modal */}
      <FormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmit}
        title={editingPoll ? "Edit Poll" : "Create New Poll"}
      >
        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Poll Title / Question *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="What's your favorite programming language?"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Options (2-6) *
            </label>
            {formData.options.map((option, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                {formData.options.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeOption(index)}
                    className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            {formData.options.length < 6 && (
              <button
                type="button"
                onClick={addOption}
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
              >
                + Add Option
              </button>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date & Time *
              </label>
              <input
                type="datetime-local"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date & Time *
              </label>
              <input
                type="datetime-local"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="showResults"
              checked={formData.showResultsAfterVoting}
              onChange={(e) =>
                setFormData({ ...formData, showResultsAfterVoting: e.target.checked })
              }
              className="mr-2"
            />
            <label htmlFor="showResults" className="text-sm font-medium text-gray-700">
              Show results after voting
            </label>
          </div>
        </div>
      </FormModal>

      {/* Preview Modal */}
      {isPreviewOpen && previewPoll && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Poll Preview</h3>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-4">{previewPoll.title}</h4>
              <div className="space-y-2">
                {previewPoll.options?.map((option, index) => (
                  <div
                    key={index}
                    className="p-3 border border-gray-300 rounded-lg hover:bg-blue-50 cursor-pointer transition"
                  >
                    {option.text}
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => setIsPreviewOpen(false)}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}

      {/* Analytics Modal */}
      {isAnalyticsOpen && analyticsPoll && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 shadow-xl max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Poll Analytics</h3>
              <button
                onClick={() => setIsAnalyticsOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            <h4 className="text-lg font-semibold mb-4">{analyticsPoll.title}</h4>
            <p className="text-gray-600 mb-4">
              Total Votes: <span className="font-bold">{analyticsPoll.totalVotes || 0}</span>
            </p>
            <div className="space-y-4">
              {analyticsPoll.options?.map((option, index) => {
                const votes = option.votes || 0;
                const percentage = analyticsPoll.totalVotes
                  ? ((votes / analyticsPoll.totalVotes) * 100).toFixed(1)
                  : 0;
                return (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{option.text}</span>
                      <span className="text-gray-600">
                        {votes} votes ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className="bg-blue-600 h-4 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              onClick={() => setIsAnalyticsOpen(false)}
              className="w-full mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Close Analytics
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Poll"
        message={`Are you sure you want to delete "${deletingPoll?.title}"? This will also delete all associated votes. This action cannot be undone.`}
      />
    </div>
  );
};

export default AdminPolls;