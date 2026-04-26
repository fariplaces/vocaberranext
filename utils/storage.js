import createWebStorage from "redux-persist/lib/storage/createWebStorage";

/**
 * Creates a dummy storage for Server-Side Rendering (SSR).
 * Since the server doesn't have localStorage, we return empty Promises.
 */
const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

// Check if we are in the browser (window) or on the server
const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

export default storage;