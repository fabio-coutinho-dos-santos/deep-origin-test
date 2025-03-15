export const useLocalStorage = () => {
  const setItem = (key: any, value: any) => {
    localStorage.setItem(key, value);
  };

  const getItem = (key: any) => {
    return localStorage.getItem(key);
  };

  return { setItem, getItem };
};
