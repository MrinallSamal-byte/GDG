import React, { useState, useEffect } from "react";
import { pollService } from "../services/pollService";

const PollPopup = ({ onComplete }) => {
  const [activePoll, setActivePoll] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    checkForActivePoll();
  }, []);

  const checkForActivePoll = async () => {
    try {
      const polls = await pollService.getActivePolls();
      
      if (polls.length > 0) {
        const poll = polls[0]; // Get the first active poll
        
        // Check if user has already voted using localStorage
        const votedPolls = JSON.parse(localStorage.getItem("votedPolls") || "[]");
        const hasUserVoted = votedPolls.includes(poll.id);
        
        if (!hasUserVoted) {
          setActivePoll(poll);
        } else {
          // User already voted, call onComplete
          if (onComplete) onComplete();
        }
      } else {
        // No active polls
        if (onComplete) onComplete();
      }
    } catch (error) {
      console.error("Error fetching active poll:", error);
      if (onComplete) onComplete();
    }
  };

  const handleVote = async () => {
    if (selectedOption === null || !activePoll) return;

    setIsSubmitting(true);

    try {
      // Submit vote
      const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      await pollService.submitVote(activePoll.id, selectedOption, userId);

      // Mark poll as voted in localStorage
      const votedPolls = JSON.parse(localStorage.getItem("votedPolls") || "[]");
      votedPolls.push(activePoll.id);
      localStorage.setItem("votedPolls", JSON.stringify(votedPolls));

      setHasVoted(true);

      // Show results if enabled
      if (activePoll.showResultsAfterVoting) {
        setShowResults(true);
        
        // Auto-close after 5 seconds
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 5000);
      } else {
        // Close immediately if results not shown
        if (onComplete) onComplete();
      }
    } catch (error) {
      console.error("Error submitting vote:", error);
      alert("Failed to submit vote. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    if (onComplete) onComplete();
  };

  if (!activePoll) return null;

  // Calculate percentages for results
  const totalVotes = activePoll.totalVotes || 0;
  const getPercentage = (optionIndex) => {
    if (totalVotes === 0) return 0;
    const votes = activePoll.options[optionIndex]?.votes || 0;
    return ((votes / totalVotes) * 100).toFixed(1);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 transform transition-all animate-slideUp">
        {!hasVoted ? (
          <>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                  Quick Poll
                </span>
                {/* Optional: Add skip button */}
                {/* <button
                  onClick={handleSkip}
                  className="text-gray-400 hover:text-gray-600 text-sm"
                >
                  Skip
                </button> */}
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {activePoll.title}
              </h2>
              <p className="text-gray-600 text-sm">
                Please select one option to continue
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {activePoll.options?.map((option, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedOption(index)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedOption === index
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                        selectedOption === index
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedOption === index && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className="font-medium text-gray-800">
                      {option.text}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleVote}
              disabled={selectedOption === null || isSubmitting}
              className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
                selectedOption === null || isSubmitting
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit Vote"}
            </button>
          </>
        ) : showResults ? (
          <>
            <div className="mb-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Thank You for Voting!
              </h2>
              <p className="text-gray-600">Here are the current results:</p>
            </div>

            <div className="space-y-4 mb-6">
              {activePoll.options?.map((option, index) => {
                const percentage = getPercentage(index);
                const isSelected = index === selectedOption;
                return (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className={`font-medium ${isSelected ? "text-blue-600" : "text-gray-800"}`}>
                        {option.text} {isSelected && "✓"}
                      </span>
                      <span className="text-gray-600 text-sm">
                        {option.votes || 0} votes ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-500 ${
                          isSelected ? "bg-blue-600" : "bg-gray-400"
                        }`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center text-sm text-gray-500">
              Redirecting in 5 seconds...
            </div>
          </>
        ) : null}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default PollPopup;