import { db } from "../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

// Generic CRUD operations for any collection
export const firestoreService = {
  // Get all documents from a collection (real-time)
  subscribeToCollection: (collectionName, callback) => {
    const collectionRef = collection(db, collectionName);
    return onSnapshot(collectionRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(data);
    });
  },

  // Get all documents from a collection (one-time)
  getAll: async (collectionName) => {
    const collectionRef = collection(db, collectionName);
    const snapshot = await getDocs(collectionRef);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },

  // Add a new document
  add: async (collectionName, data) => {
    const collectionRef = collection(db, collectionName);
    const docRef = await addDoc(collectionRef, {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  },

  // Update a document
  update: async (collectionName, id, data) => {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  },

  // Delete a document
  delete: async (collectionName, id) => {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
  },
};

// Collection names
export const COLLECTIONS = {
  SIGNATURE_EVENTS: "signatureEvents",
  PAST_EVENTS: "pastEvents",
  TEAM_MEMBERS: "teamMembers",
  PLAN_OF_ACTION: "planOfAction",
  FLAGSHIP_PROGRAMS: "flagshipPrograms",
  WORKSHOPS: "workshops",
  WEEKLY_CADENCES: "weeklyCadences",
  POLLS: "polls",
  POLL_RESPONSES: "pollResponses",
};
