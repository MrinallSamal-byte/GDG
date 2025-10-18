import { db } from "../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  serverTimestamp,
  increment,
} from "firebase/firestore";
import { COLLECTIONS } from "./firestoreService";

// Poll-specific operations
export const pollService = {
  // Submit a vote for a poll
  submitVote: async (pollId, optionIndex, userId = null) => {
    const pollRef = doc(db, COLLECTIONS.POLLS, pollId);
    
    // Record the response
    await addDoc(collection(db, COLLECTIONS.POLL_RESPONSES), {
      pollId,
      optionIndex,
      userId,
      timestamp: serverTimestamp(),
    });

    // Increment the vote count for the option
    const updateData = {};
    updateData[`options.${optionIndex}.votes`] = increment(1);
    updateData.totalVotes = increment(1);

    await updateDoc(pollRef, updateData);
  },

  // Get active polls
  getActivePolls: async () => {
    const now = new Date();
    const pollsRef = collection(db, COLLECTIONS.POLLS);
    
    const q = query(
      pollsRef,
      where("status", "==", "active"),
      where("startDate", "<=", now),
      where("endDate", ">=", now)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },

  // Get poll analytics
  getPollAnalytics: async (pollId) => {
    const responsesRef = collection(db, COLLECTIONS.POLL_RESPONSES);
    const q = query(responsesRef, where("pollId", "==", pollId));
    const snapshot = await getDocs(q);

    const analytics = {
      totalResponses: snapshot.size,
      responsesByOption: {},
    };

    snapshot.docs.forEach((doc) => {
      const data = doc.data();
      const optionIndex = data.optionIndex;
      analytics.responsesByOption[optionIndex] =
        (analytics.responsesByOption[optionIndex] || 0) + 1;
    });

    return analytics;
  },

  // Check if user has voted
  hasUserVoted: async (pollId, userId) => {
    const responsesRef = collection(db, COLLECTIONS.POLL_RESPONSES);
    const q = query(
      responsesRef,
      where("pollId", "==", pollId),
      where("userId", "==", userId)
    );
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  },

  // Auto-deactivate expired polls
  deactivateExpiredPolls: async () => {
    const now = new Date();
    const pollsRef = collection(db, COLLECTIONS.POLLS);
    const q = query(pollsRef, where("endDate", "<", now), where("status", "==", "active"));

    const snapshot = await getDocs(q);
    const updates = snapshot.docs.map((doc) =>
      updateDoc(doc.ref, { status: "inactive" })
    );

    await Promise.all(updates);
    return snapshot.size; // Return number of polls deactivated
  },
};
