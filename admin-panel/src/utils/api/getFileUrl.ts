export const getFileUrl = (file: string) => {
  return `${import.meta.env.VITE_API_URL}/${file}`;
};
