export const saveStorage = (key, value) => {
  localStorage.setItem(key, value);
};

export const getStorage = (key) => {
  const storage = localStorage.getItem(key);
  if (storage) return storage;
};

export const getRanking = () => {
  const ranking = getStorage('ranking');
  if (ranking) return JSON.parse(ranking);

  return [];
};

export const saveRanking = (value) => {
  const prevRanking = getRanking();
  const ranking = JSON.stringify([...prevRanking, value]);
  saveStorage('ranking', ranking);
};
