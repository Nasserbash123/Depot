'use client'

import { useRef, useState } from "react";
import { Alert } from "@mui/material";
import MainContainer from "@/app/components/layout/mainContainer";
import axios from "axios";
import { useRouter } from "next/navigation";
import useLoading from "@/app/hooks/useLoading";
import useMessage from "@/app/hooks/useMessage";
function Verfiy(props) {
  const router = useRouter()
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
      verificationCode: '',
    });
    const [isLoading, setLoading, loadingIndicator] = useLoading();
    const [setErrormessage, setsuccessMessage, setmessageText, message] =
      useMessage();

    const { verificationCode } = formData;
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value });
      
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setLoading(true)
      
        axios.post('https://depot-project.vercel.app/api/users/verification', formData,
        {
          headers: {
            'verification-token': props.params.vervicationCode,
            'Content-Type': 'application/json', 
          },
        }
        )
        .then((response) => {
          setLoading(false)
          setErrormessage(false)
          setsuccessMessage(true)
          setmessageText("Your Account verified successfully , You will be redirect to login in 5s")
          formRef.current.reset();
          setTimeout(() => {
            router.push("/user-dashboard");
          }, 5000);
        })
        .catch((error) => {
          setLoading(false)
          setErrormessage(true)
          setmessageText(error.response.data.error)
          
        });
       
        
        
    };
  return (
    <div className="my-20 md:p-10 p-5 mx-auto lg:w-3/4 w-full">
      <MainContainer>

     
      <form ref={formRef} action="#" className="space-y-8 relative" onSubmit={handleSubmit}>
    <div>
      <input
        type="text"
        id="verificationCode"
        onChange={handleChange}
        className="block p-3 w-full text-sm text-black  border border-gray-300  "
        placeholder="Code"
        required
      />
    </div>
    
    {message}
                  
    <button
      type="submit"
      className="w-full py-3 px-5 text-lg font-medium text-center text-white  bg-black  hover:bg-primary-800 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
    >
      Verify
    </button>
    {loadingIndicator}
     </form>
  </MainContainer>
    </div>
  )
}

export default Verfiy