export const validateDate = (date: string) => {
  // Match yyyy-mm-dd format strictly
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(date)) return false;
  
  // Check if it's a valid date
  const d = new Date(date);
  if (!(d instanceof Date) || isNaN(d.getTime())) return false;
  
  // Check if the date components match the input
  const [year, month, day] = date.split('-').map(Number);
  return d.getFullYear() === year && 
         d.getMonth() === month - 1 && 
         d.getDate() === day;
};