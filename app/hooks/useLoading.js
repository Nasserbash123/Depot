import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false);

  const setLoading = (status) => {
    setIsLoading(status);
  };

  const loadingIndicator = (
    
        isLoading && (
  
      <div className={`bg-[#93818100] absolute w-full h-full top-0 left-0 bottom-0 z-[100] `}>
        <CircularProgress sx={{position:"absolute",top:"10%",left:"45%"}}/>
        </div>
         )
       
  );

  return [isLoading, setLoading, loadingIndicator];
};

export default useLoading;