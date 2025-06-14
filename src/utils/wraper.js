const asynchandeler = (fn) => {
  return async (...args) => {
    try {
      const result = await fn(...args);
    
      return result;
    } catch (err) {
      console.error("Error:", err);
      throw err;
    }
  };
};
export default asynchandeler;
