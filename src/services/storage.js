export const saveStorage = (key, value) => {
  localStorage.setItem(key, value);
};

export const getStorage = (key) => {
  const storage = localStorage.getItem(key);
  if (storage) return storage;
};
