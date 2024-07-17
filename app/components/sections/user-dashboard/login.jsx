"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import useLoading from "@/app/hooks/useLoading";
import useMessage from "@/app/hooks/useMessage";

function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setLoading, loadingIndicator] = useLoading();
  const [setErrormessage, setsuccessMessage, setmessageText, message] =
    useMessage();
  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true); 

      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result.error) {
        setErrormessage(true);
        setsuccessMessage(false);
        setmessageText(result.error);
      } else {
        setErrormessage(false);
        setsuccessMessage(true);
        setmessageText("You login succsses");
        router.push("/my-account");
       
      }
    } catch (error) {
    
    } finally {
      setLoading(false); 
    }
  };
  return (
    <>
      <form
        ref={formRef}
        action="#"
        className="space-y-8 relative"
        onSubmit={handleSubmit}
      >
        <div>
          <input
            type="email"
            id="email"
            onChange={handleChange}
            className="block p-3 w-full text-sm text-black  border border-gray-300  "
            placeholder="Email"
            required
          />
        </div>
        <div>
          <input
            type="password"
            onChange={handleChange}
            id="password"
            className="block p-3 w-full text-sm text-black  border border-gray-300  "
            placeholder="password"
            required
          />
        </div>
        {message}

        <button
          type="submit"
          className="w-full py-3 px-5 text-lg font-medium text-center text-white  bg-black  hover:bg-primary-800 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Login
        </button>
        {loadingIndicator}
      </form>
    </>
  );
}

export default Login;
