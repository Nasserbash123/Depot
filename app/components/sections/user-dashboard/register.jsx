'use client'
import { useRef, useState} from 'react'

import axios from "axios";
import useLoading from '@/app/hooks/useLoading';
import useMessage from '@/app/hooks/useMessage';

function Register() {
  const formRef = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
      });
      const [isLoading, setLoading, loadingIndicator] = useLoading();
      const [setErrormessage , setsuccessMessage , setmessageText , message] = useMessage();
      const { email, name, password, repeatPassword } = formData;
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true); // Set loading state to true
      
        if (password.length < 8) {
          setErrormessage(true);
          setmessageText("Password must be at least 8 characters");
          setLoading(false); // Set loading state back to false
          return;
        } else {
          setErrormessage(false);
        }
      
        if (password !== repeatPassword) {
          setErrormessage(true);
          setmessageText("Password not matched");
          setLoading(false); // Set loading state back to false
          return;
        } else {
          setErrormessage(false);
        }
      
        axios.post('https://depot-project.vercel.app/api/users', formData)
          .then((response) => {
            setErrormessage(false);
            setsuccessMessage(true);
            setmessageText("Your account has been created successfully, and an email will be sent to you to verify your account");
            formRef.current.reset();
            setLoading(false); // Set loading state back to false
          })
          .catch((error) => {
            setErrormessage(true);
            setmessageText(error.response.data.error);
            setLoading(false); // Set loading state back to false
          });
      };

  return (
    <div className="py-10  w-full">
               <form ref={formRef} action="#" onSubmit={handleSubmit} className="space-y-8 relative">
                  <div>
                    <input
                      type="email"
                      name='eamil'
                      onChange={handleChange}
                      id="email"
                      className="block p-3 w-full text-sm text-black  border border-gray-300  "
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      onChange={handleChange}
                      id="name"
                      name='name'
                      className="block p-3 w-full text-sm text-black  border border-gray-300  "
                      placeholder="name"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      onChange={handleChange}
                      id="password"
                      name='password'
                      className="block p-3 w-full text-sm text-black  border border-gray-300  "
                      placeholder="password"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      onChange={handleChange}
                      id="repeatPassword"
                      name='repeatPassword'
                      className="block p-3 w-full text-sm text-black  border border-gray-300  "
                      placeholder="Repeat password"
                      required
                    />
                  </div>
                 
                  {message}
                  
                  <button
                    type="submit"
                    className="w-full py-3 px-5 text-lg font-medium text-center text-white  bg-black  hover:bg-primary-800 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    REGISTER
                  </button>
                  {loadingIndicator}
                </form>
    </div>
  )
}

export default Register