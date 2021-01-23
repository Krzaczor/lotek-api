export const getDate = (...time) => {
    const args = time.length;
  
    const date = args < 1
      ? new Date()
      : args === 1
        ? new Date(time)
        : new Date(...time);
  
    const year = date.getFullYear();
    const month = args > 1 ? date.getMonth() : date.getMonth() + 1;
    const day = date.getDate();
    const original = new Date(year, month - 1, day);
  
    return {
        year, 
        month, 
        day, 
        original
    };
};