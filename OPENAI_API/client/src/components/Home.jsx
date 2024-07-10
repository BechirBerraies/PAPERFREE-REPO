import React, { useState , useRef, useEffect} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserIcon } from "@heroicons/react/24/solid";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import { LockClosedIcon } from "@heroicons/react/24/solid";
function Home() {
  const [user, setUser] = useState({ Name: "", Surname: "", email: "", password: "", confirmPassword: "" });
  const [loguser, logsetuser] = useState({ email: '', password: '' });
  const navigate = useNavigate();



  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    logsetuser({
      ...loguser,
      [name]: value,
    });
  };

  const register = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/Student/register', user, { withCredentials: true })
      .then(serverResponse => {
        console.log(serverResponse);
        console.log(serverResponse.data.StudentId);
        localStorage.setItem('StudentId', serverResponse.data.StudentId);
        navigate('/analyse');
      })
      .catch(error => console.log(error));
  };

  const login = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/Student/login', loguser, { withCredentials: true })
      .then(serverResponse => {
        console.log(serverResponse.data.StudentId);
        localStorage.setItem('StudentId', serverResponse.data.StudentId);
        localStorage.setItem('token', 'Hello token');
        navigate('/analyse');
      })
      .catch(error => console.log(error));
  };


  function useIsVisible(ref) {
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
        setIntersecting(entry.isIntersecting);
      });

      observer.observe(ref.current);
      return () => {
        observer.disconnect();
      };
    }, [ref]);

    return isIntersecting;
  }
  /* IsVisible1 is True if element appears on screen , so it goes from False to True and that's where the transition animation happens */
  const ref1 = useRef();
  const isVisible1 = useIsVisible(ref1);

  return (
    <div 
    ref={ref1}
    className={`transition ease-in-out duration-300 ${isVisible1 ? "opacity-100" : "opacity-0"} ease-in-out duration-700 ${isVisible1 ? "translate-x-0" : "translate-y-4"} `}
    
    >
      <header className="flex justify-center">
        <img className="w-96 mt-6 mr-4 mb-6" src="../public/images/logoBETA.png" alt="Logo" />
      </header>

      <div className="
      flex 
      items-center
      justify-center
      h-[calc(100vh-131px)]
      ">
        <div className="flex  gap-x-20 mb-20">
          {/* Registration Form */}
          <form className="bg-black bg-opacity-35 rounded-lg
         pr-8 pl-8 pt-3 pb-3 w-[345px] ">
            <div
              className=" 
            font-lalezar
            text-center
            bg-gradient-to-b from-[#FED33D] from-15% to-[#F67C0B]
            text-transparent
            bg-clip-text
            text-2xl
            mb-5 mt-1
            
          "
            >
              إنشاء حساب جديد
            </div>
            <div
              className="
              relative mb-5 text-gray-400 focus-within:text-orange-400 ease-in-out duration-300
                         hover:scale-110 ease-in-out duration-300"
            >
            <UserIcon className="w-7 h-7 mt-1.5 mr-2 absolute pointer-events-none " />
              <input
                type="text"
                name="Name"
                value={user.Name}
                onChange={handleChange}
                placeholder="الاسم"
                className="bg-[#D9D9D9]
              border border-red-600 rounded-lg
              block pt-1.5 pb-1.5 pr-3 w-full 
             text-black text-xl
             placeholder-gray-400 placeholder:text-center 
             focus:ring-2             
             focus:ring-[#057933]
             text-center"
                required
              />
            </div>
            <div
              className="
              relative mb-5 text-gray-400 focus-within:text-orange-400 ease-in-out duration-300
              hover:scale-110 ease-in-out duration-300"
            >
              <UserIcon className="w-7 h-7 mt-1.5 mr-2 absolute pointer-events-none " />
              <input
                type="text"
                name="Surname"
                value={user.Surname}
                onChange={handleChange}
                placeholder="اللقب"
                className="bg-[#D9D9D9]
              border border-red-600 rounded-lg
              block pt-1.5 pb-1.5 pr-3 w-full
             text-black text-xl
             placeholder-gray-400 placeholder:text-center 
             focus:ring-2             
             focus:ring-[#057933]
             text-center

             "
                required
              />
            </div>
            <div className="
              relative mb-5 text-gray-400 focus-within:text-orange-400 ease-in-out duration-300
                      hover:scale-110 ease-in-out duration-300"
            >
              <EnvelopeIcon className="w-7 h-7 mt-1.5 mr-2 absolute pointer-events-none " />
              <input
                type="text"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="البريد الإلكتروني"
                className="bg-[#D9D9D9]
              border border-red-600 rounded-lg
              block pt-1.5 pb-1.5 pr-3 w-full
             text-black text-xl
             placeholder-gray-400 placeholder:text-center 
             focus:ring-2             
             focus:ring-[#057933]
             text-center
             "
                required
              />
            </div>
            <div className="
              relative mb-5 text-gray-400 focus-within:text-orange-400 ease-in-out duration-300
                    hover:scale-110 ease-in-out duration-300"
            >
              <LockClosedIcon className="w-7 h-7 mt-1.5 mr-2 absolute pointer-events-none " />
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="كلمة السر"
                className="bg-[#D9D9D9]
              border border-red-600 rounded-lg
              block pt-1.5 pb-1.5 pr-3 w-full
             text-black text-xl
             placeholder-gray-400 placeholder:text-center 
             focus:ring-2             
             focus:ring-[#057933]
             text-center

             "
                required
              />
            </div>
            <div className="
              relative mb-5 text-gray-400 focus-within:text-orange-400 ease-in-out duration-300
            hover:scale-110 ease-in-out duration-300"
            >
              <LockClosedIcon className="w-7 h-7 mt-1.5 mr-2 absolute pointer-events-none " />
              <input
                type="password"
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={handleChange}
                placeholder="تأكيد كلمة السر"
                className="bg-[#D9D9D9]
              border border-red-600 rounded-lg
              block pt-1.5 pb-1.5 pr-3 w-full
             text-black text-xl
             placeholder-gray-400 placeholder:text-center 
             focus:ring-2             
             focus:ring-[#057933]
             text-center

             "
                required
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="
                bg-gradient-to-b from-[#FED33D] from-15% to-[#F67C0B]
                rounded-lg
                text-black text-lg 
                font-medium 
                w-full sm:w-20
                px-3 py-2 
                text-center
                hover:ease-in-out duration-500
                hover:bg-opacity-50
                
                hover:text-white  
                hover:ring-zinc-300 
                hover:ring-2 
                hover:outline-none
  
                "
                onClick={register}
              >
                إنشاء
              </button>
            </div>
          </form>
          <div
            className="bg-[#C3BDBD] w-1 h-72 mix-blend-soft-light opacity-30
        
        "
          ></div>

          {/* Login Form */}

          <form className="
          bg-black bg-opacity-35 rounded-lg
        ml-4 mr-4 pr-8 pl-8 pt-3 pb-3 h-64 w-72 
        ">
            <div
              className="
            font-lalezar
            text-center
            bg-gradient-to-b from-[#FED33D] from-15% to-[#F67C0B]
            text-transparent
            bg-clip-text
            text-2xl
            mb-5 mt-1
          
          "
            >
              تسجيل الدخول
            </div>
            <div className="
              relative mb-5 text-gray-400 focus-within:text-orange-400 ease-in-out duration-300
              hover:scale-110 ease-in-out duration-300">
              <EnvelopeIcon className="w-7 h-7 mt-1.5 mr-2 absolute pointer-events-none " />
              <input
                type="text"
                name="email"
                value={loguser.email}
                onChange={handleChange2}
                placeholder="البريد الإلكتروني"
                className="bg-[#D9D9D9]
              border border-red-600 rounded-lg
              block pt-1.5 pb-1.5 pr-3 w-full
             text-black text-xl
             placeholder-gray-400 placeholder:text-center 
             focus:ring-2             
             focus:ring-[#057933]
             text-center
             "
                required
              />
            </div>
            <div className="
              relative mb-5 text-gray-400 focus-within:text-orange-400 ease-in-out duration-300
           hover:scale-110 ease-in-out duration-300">
            <LockClosedIcon className="w-7 h-7 mt-1.5 mr-2 absolute pointer-events-none " />
              <input
                type="password"
                name="password"
                value={loguser.password}
                onChange={handleChange2}
                placeholder="كلمة السر"
                className="bg-[#D9D9D9]
              border border-red-600 rounded-lg
              block pt-1.5 pb-1.5 pr-3 w-full
             text-black text-xl
             placeholder-gray-400 placeholder:text-center 
             focus:ring-2             
             focus:ring-[#057933]
             text-center

             "
                required
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="
                bg-gradient-to-b from-[#FED33D] from-15% to-[#F67C0B]
                rounded-lg
                text-black text-lg 
                font-medium 
                w-full sm:w-20
                px-3 py-2 
                text-center
                hover:ease-in-out duration-500
                hover:bg-opacity-50
                
                hover:text-white  
                hover:ring-zinc-300 
                hover:ring-2 
                hover:outline-none
  
                "
                onClick={login}
              >
                دخول
              </button>
            </div>
            <div className=" 
            text-center
            bg-gradient-to-b from-[#FED33D] from-15% to-[#F67C0B]
            text-transparent
            bg-clip-text
            text-lg
            font-medium
            mb-5 mt-8
            hover:scale-95 ease-linear duration-300
          ">
              <Link to="">لا يمكنك الولوج لحسابك؟</Link>
            </div>
          </form>
        </div>
      </div>


    </div>
    
  );
}

export default Home;
