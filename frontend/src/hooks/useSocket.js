import { useEffect, useRef } from 'react';
import socketService from '../services/socketService';

/**
 * Custom hook for Socket.IO real-time updates
 * @param {Function} onDataUpdate - Callback when data is updated
 * @param {Array} dependencies - Dependencies array for the effect
 */
export const useSocket = (onDataUpdate, dependencies = []) => {
  const socketRef = useRef(null);

  useEffect(() => {
    // Connect to socket
    socketRef.current = socketService.connect();

    // Subscribe to data updates
    if (onDataUpdate && typeof onDataUpdate === 'function') {
      socketService.onDataUpdate(onDataUpdate);
    }

    // Cleanup on unmount
    return () => {
      if (onDataUpdate) {
        socketService.offDataUpdate(onDataUpdate);
      }
    };
  }, dependencies);

  return {
    socket: socketRef.current,
    isConnected: socketService.isConnected(),
    emit: socketService.emit.bind(socketService),
  };
};

/**
 * Hook to listen for specific collection updates
 * @param {string} collection - Collection name to listen for
 * @param {Function} onUpdate - Callback when collection is updated
 * @param {Array} dependencies - Dependencies array
 */
export const useCollectionUpdates = (collection, onUpdate, dependencies = []) => {
  useSocket((update) => {
    if (update.collection === collection) {
      onUpdate(update);
    }
  }, dependencies);
};

export default useSocket;
