'use client'
import {useRef, useState} from 'react'
import axios from "axios";
import { useRouter } from 'next/navigation';
import MainContainer from '@/app/components/layout/mainContainer';
import useLoading from '@/app/hooks/useLoading';
import useMessage from '@/app/hooks/useMessage';



function ResetPassword(props) {
  const router = useRouter();
    const formRef = useRef(null);
    const [formData, setFormData] = useState({
        newPassword: '',
        resetToken:props.params.token
      });
      const [isLoading, setLoading, loadingIndicator] = useLoading();
      const [setErrormessage, setsuccessMessage, setmessageText, message] =
        useMessage();
  
      const { newPassword } = formData;
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
          axios.post('https://depot-project.vercel.app/api/users/resetPassword', formData)
          .then((response) => {
            setLoading(false)
            setErrormessage(false)
            setsuccessMessage(true)
            setmessageText("Your Password is updated successfully and You will convert to login page ");
            formRef.current.reset();
            setTimeout(() => {
              router.push("/user-dashboard");
            }, 5000);
          })
          .catch((error) => {
            setErrormessage(true)
            setmessageText(error.response.data.error)
            setLoading(false)
          });
         
          
          
      };
  return (
    <MainContainer>
     
     <div className="my-20 md:p-10 p-5 mx-auto lg:w-3/4 w-full">
   
    <form ref={formRef} action="#" className="space-y-8 relative" onSubmit={handleSubmit}>
    <div>
      <input
        type="password"
        id="newPassword"
        onChange={handleChange}
        className="block p-3 w-full text-sm text-black  border border-gray-300  "
        placeholder="new password"
        required
      />
    </div>
    
    {message}
                  
    <button
      type="submit"
      className="w-full py-3 px-5 text-lg font-medium text-center text-white  bg-black  hover:bg-primary-800 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
    >
      Change Password
    </button>
      {loadingIndicator}
  </form>
  </div>
  </MainContainer>
  )
}

export default ResetPassword