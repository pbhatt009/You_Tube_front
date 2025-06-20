const asynchandeler = (fn) => {
  return async (...args) => {
    try {
      const result = await fn(...args);
       const returndata={
        error:null,
        data:null,
       }
       console.log("Response:", result.data);
       if(result.data.success){
        returndata.data=result.data;}
        else {
          returndata.error=result.data;
        }
      return returndata; // Return the result in the desired format

    } catch (err) {
      console.error("Error:", err);
           const returndata={
            error:err.response.data,
           }
           console.error("Error:", returndata.error);
           return returndata;
    }

  };
};
export default asynchandeler;
