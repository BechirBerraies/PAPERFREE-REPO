
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useRef, useEffect, useState } from "react";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/solid";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { IdentificationIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

function Analyse() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePath, setImagePath] = useState("");
  const [arabicText, setArabicText] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    id: "",
    birthDate: ""
  });
  const navigate = useNavigate();

  const  handleFileChange = (event) => {
    const file = event.target.files[0];

    const acceptedTypes = ['image/png', 'image/jpeg','image/jpg'];
    if (!acceptedTypes.includes(file.type)) {
      alert('Please select a PNG or JPG image file.');
      return;
    }
    setSelectedFile(file)
    setImagePath(URL.createObjectURL(file));
    console.log(file);
    handleFileUpload(file);
  };

  const handleFileUpload = async (file) => {
    if (!file) {
      alert('Please select a PNG or JPG image file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8000/uploadimage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        console.log('Image uploaded successfully!');
        console.log(response.data.imagePath);
        console.log(response.data);
        setArabicText(response.data.scriptOutput)
        
      } else {
        console.error('Error uploading image:', response.data);
        alert('Error uploading image. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
    }
  };

  const sendRequestToChatGPT = async (e) => {
    e.preventDefault();
    if (!arabicText) {
      alert('Please upload an image first.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/openaiIdCard', {
        name: formData.name,
        surname: formData.surname,
        id: formData.id,
        birthdate: formData.birthDate,
        arabicText: arabicText,
      });
      console.log(response.data);
      localStorage.setItem('data', JSON.stringify(response.data));     
     await CreateCard();
      navigate('/result')
    } catch (error) {
      console.error('Error making the Chat GPT request:', error);
    }
  };

  const CreateCard = async () => {
    try {
      const cardData = {
        Name: formData.name,
        Surname: formData.surname,
        CardNumber: formData.id,
        BirthDate: formData.birthDate,
        path: imagePath,
        student: localStorage.getItem('StudentId')
      };
      console.log(localStorage.getItem('StudentId'));
      const response = await axios.post("http://localhost:8000/createCard", cardData);
      console.log(response);
    } catch (error) {
      console.error('Error creating card:', error);
      console.log("ERRORRR");
    }
  };


  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
    /* function that detects when elements are on screen and returns true, used for page animations  */
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
    const isVisible1 = useIsVisible(ref1); /*for main body animation */
    const ref2 = useRef();
    const isVisible2 = useIsVisible(ref2); /*for header only animation */
    const ref3 = useRef();
    const isVisible3 =
      useIsVisible(
        ref3
      ); /*for horizontal line animation (<hr> tag) because it fades in to 50% opacity only */
  

  return (
    <div className="flex flex-col h-[100vh]">
      <header ref={ref2} className={` h-24  `}>
        <div
          className={`flex justify-between transition ease-in-out duration-700 ${isVisible1 ? "opacity-100" : "opacity-0"}`}
        >
          <Link>
            <img
              className="w-60 mt-6 mr-4"
              src="../public/images/logoBETA.png"
            />
          </Link>
          <Link to="/">
            <div
              className="text-white border
            p-1 ml-6 mt-5
            hover:bg-red-600 ease-in-out duration-500
            hover:scale-105
            "
            >
              خروج
              <ArrowLeftStartOnRectangleIcon className="inline-block w-6 h-6 text-white ml-3s mr-2" />
            </div>
          </Link>
        </div>
        <hr
          ref={ref3}
          className={`mt-3 border-2
        mix-blend-overlay
        transition ease-in-out duration-700 ${isVisible3 ? "opacity-50" : "opacity-0"}
        `}
        />
      </header>
      <div
        ref={ref1}
        className={`image-upload-container 
      h-full mb-20
      flex items-center justify-around 
      transition ease-in-out duration-300 ${isVisible1 ? "opacity-100" : "opacity-0"} ease-in-out duration-700 ${isVisible1 ? "translate-x-0" : "translate-y-4"} 
      `}
      >
        <motion.div
          layout //this allows Framer motion to detect change in layout and animate the elements to their new positon
          transition={{ type: "spring", stiffness: 100 }}
          className="form-container"
        >
          <form
            onSubmit={sendRequestToChatGPT}
            className={`${imagePath ? `mr-24` : ``}`}
          >
            <div
              className="flex justify-center items-center h-16 
            mb-10 gap-2 min-w-[260px]
          bg-black bg-opacity-35 rounded-lg
          shadow-lg
        "
            >
              <svg
                className="inline-block
              w-14
             "
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
              >
                <defs>
                  <linearGradient
                    id="iconGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      style={{ stopColor: "rgb(254, 209, 54)", stopOpacity: 1 }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: "rgb(246, 124, 11)", stopOpacity: 1 }}
                    />
                  </linearGradient>
                </defs>
                <path
                  fill="url(#iconGradient)"
                  fillRule="evenodd"
                  d="M3 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm2.5 5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M10 5.75a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75m.75 3.75a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5zM10 8a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5A.75.75 0 0 1 10 8m-2.378 3c.346 0 .583-.343.395-.633A2.998 2.998 0 0 0 5.5 9a2.998 2.998 0 0 0-2.517 1.367c-.188.29.05.633.395.633z"
                  clipRule="evenodd"
                />
              </svg>
              <div
                className=" 
            font-lalezar
            text-center
            bg-gradient-to-b from-[#FED33D] from-15% to-[#F67C0B]
            text-transparent
            bg-clip-text
            text-2xl
            
          "
              >
                بطاقة التعريف الوطنية
              </div>
            </div>
            <div className="mb-5">
              <input
                placeholder="الأسم"
                type="text"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                className="bg-[#D9D9D9]
              border border-red-600 rounded-lg
              block w-full p-1.5
             text-black text-xl text-center
             placeholder-gray-400 placeholder:text-center 
             focus:ring-2             
             focus:ring-[#057933]
             hover:scale-110 ease-in-out duration-300
             "
                required
              />
            </div>
            <div className="mb-5">
              <input
                placeholder="اللقب"
                type="text"
              id="surname"
              value={formData.surname}
              onChange={handleInputChange}
                className="bg-[#D9D9D9]
              border border-red-600 rounded-lg
              block w-full p-1.5
             text-black text-xl text-center
             placeholder-gray-400 placeholder:text-center 
             focus:ring-2             
             focus:ring-[#057933]
             hover:scale-110 ease-in-out duration-300
             "
                required
              />
            </div>

            <div className="mb-5">
              <input
                placeholder="رقم بطاقة التعريف الوطنية"
                id="id"
                value={formData.id}
                onChange={handleInputChange}
                className="bg-[#D9D9D9]
              border border-red-600 rounded-lg
              block w-full p-1.5
             text-black text-xl text-center
             placeholder-gray-400 placeholder:text-center 
             focus:ring-2             
             focus:ring-[#057933]
             hover:scale-110 ease-in-out duration-300
             
             "
                required
              />
            </div>
            <div className="mb-5">
              <input
                placeholder="Birthdate"
                type="date"
                id="birthDate"

                value={formData.birthDate}
                onChange={handleInputChange}
                className="
                bg-[#D9D9D9]
              border border-red-600 rounded-lg
              block w-full p-1.5
             text-black text-xl text-center
             placeholder-gray-400 placeholder:text-center 
             focus:ring-2             
             focus:ring-[#057933]
             hover:scale-110 ease-in-out duration-300
                "
                required
              />
            </div>
            <div
              className="flex flex-row items-center mb-5
                    hover:scale-110 ease-in-out duration-300"
            >
              <input
                type="file"
                accept="image/png,image/jpeg"
                id="custom-input"
                onChange={handleFileChange}
                hidden
              />
              <ArrowUpTrayIcon
                className="absolute mr-1.5 w-7 pointer-events-none
            text-red-600"
              />
              <label
                htmlFor="custom-input"
                className="block cursor-pointer
               py-1.5 pr-10 pl-3 
              border border-red-600 rounded-lg
              text-lg
              text-gray-400
              font-semibold bg-[#D9D9D9] 
         
            "
              >
                إختر ملف
              </label>
              <label className="text-sm text-white mr-3 overflow-hidden whitespace-nowrap text-overflow-ellipsis max-w-28">
  {selectedFile ? selectedFile.name : "No file selected"}
          </label>
            </div>
            <div className="mt-3 flex justify-center ">
              {/* in case you need to add another button or text add it under this div */}
              <div className="ml-4 mr-4">
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
                >
                  التالي
                </button>
              </div>
            </div>
          </form>
        </motion.div>
        {imagePath && (
          <motion.div
            className={`
            flex
            h-[80vh] w-[100vh]
            overflow-hidden
            mt-6 ${imagePath ? `ml-16` : ``}  `}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 100,
              transition: {
                opacity: {
                  delay: 0.5,
                },
              },
            }}
          >
            <img
              src={imagePath}
              alt="Uploaded Image"
              className="
            max-w-full max-h-full
            object-contain
    "
            />
          </motion.div>
        )}
      </div>
      {/*       <footer className=" h-28">
        <h2 className=" text-white">Footer placerholder text</h2>
      </footer> */}
    </div>
  );
}

export default Analyse;
