import { useState, useEffect } from "react";
import { firestoreService } from "../services/firestoreService";

/**
 * Custom hook to fetch data from Firestore in real-time
 * @param {string} collectionName - The name of the Firestore collection
 * @returns {Array} - Array of documents from the collection
 */
export const useFirestoreCollection = (collectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    
    try {
      const unsubscribe = firestoreService.subscribeToCollection(
        collectionName,
        (newData) => {
          setData(newData);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }, [collectionName]);

  return { data, loading, error };
};

export default useFirestoreCollection;
