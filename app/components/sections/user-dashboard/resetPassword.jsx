'use client'

import {useRef, useState} from 'react'

import axios from "axios";
import useLoading from "../../../hooks/useLoading";
import useMessage from "../../../hooks/useMessage";
function ResetPassword() {
    const formRef = useRef(null);
    const [isLoading, setLoading, loadingIndicator] = useLoading();
    const [setErrormessage , setsuccessMessage , setmessageText , message] = useMessage();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
      });
      const { email } = formData;
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        
          axios.post('https://depot-project.vercel.app/api/users/resetPassword/requestPasswordReset', formData)
          .then((response) => {
            setLoading(false)
            setErrormessage(false)
            setsuccessMessage(true)
            setmessageText("Your Will recived an eamil to reset password");
            formRef.current.reset();
          })
          .catch((error) => {
            setErrormessage(true)
            setmessageText(error.response.data.error)
            setLoading(false)
          });
         
          
          
      };
  return (
    <div className="py-10   w-full">
    <form  ref={formRef} action="#" className="space-y-8 relative" onSubmit={handleSubmit}>
      <div>
        <input
          type="email"
          id="email"
          className="block p-3 w-full text-sm text-black  border border-gray-300  "
          placeholder="Your Email"
          onChange={handleChange}
          required
        />
      </div>
     {message}
      <button
        type="submit"
        className="w-full py-3 px-5 text-lg font-medium text-center text-white  bg-black  hover:bg-primary-800 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        New Password
      </button>
      {loadingIndicator}
    </form>
  </div>
  )
}


export default ResetPassword