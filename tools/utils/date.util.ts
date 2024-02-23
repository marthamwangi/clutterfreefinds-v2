/** formats date to YYYY-MM-DD */
export const formatDate = (date: Date) => {
  return date.toISOString().split('T')[0];
};
