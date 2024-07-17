import { useState } from "react";
import { Alert } from "@mui/material";

function useMessage() {
      const [Errormessage, setErrormessage] = useState(false);
      const [successMessage, setsuccessMessage] = useState(false);
      const [messageText, setmessageText] = useState('');
  
    const message = (
        <>
         <Alert severity="error" className={`mb-5  transition-opacity duration-500 $`} 
          sx={{
            display: Errormessage ? 'flex' : 'none'
          }}
         >{messageText}</Alert>       
        <Alert severity="success"
        className={`mb-5 t 
        `}
        sx={{
          display: successMessage ? 'flex' : 'none'
        }}
        >{messageText}</Alert>
        </>
  );
  return [setErrormessage , setsuccessMessage , setmessageText,message]
}

export default useMessage