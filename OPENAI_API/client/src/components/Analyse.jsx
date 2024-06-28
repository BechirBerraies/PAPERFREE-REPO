import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FinalNav from './FinalNav';
import { Link } from 'react-router-dom';

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

  const  handleFileChange = (event) => {
    const file = event.target.files[0];

    const acceptedTypes = ['image/png', 'image/jpeg','image/jpg'];
    if (!acceptedTypes.includes(file.type)) {
      alert('Please select a PNG or JPG image file.');
      return;
    }
    setSelectedFile(file)
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
        setImagePath(URL.createObjectURL(file));
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
        arabicText: arabicText,
      });
      console.log(response.data);
      await CreateCard();
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
      console.log("ERRORRR");
      const response = await axios.post("http://localhost:8000/createCard", cardData);
      console.log(response);
      alert("Successful submission");
    } catch (error) {
      console.error('Error creating card:', error);
      console.log("ERRORRR");
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value,
    }));
  };

  return (
    <div className="h-screen w-screen bg-cover bg-center">
      <FinalNav />
      <div className="image-upload-container h-full flex items-center align-middle justify-center">
        <form onSubmit={sendRequestToChatGPT} className="max-w-lg mx-auto p-4rounded-lg">
          <div className="mb-5">
            <input
              placeholder="الأسم"
              type="text"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              className="bg-[#D9D9D9] border border-red-600 rounded-lg block w-full p-2.5 text-black text-xl text-center placeholder-gray-400 placeholder:text-center focus:ring-2 focus:ring-[#057933] hover:scale-110 ease-in-out duration-300"
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
              className="bg-[#D9D9D9] border border-red-600 rounded-lg block w-full p-2.5 text-black text-xl text-center placeholder-gray-400 placeholder:text-center focus:ring-2 focus:ring-[#057933] hover:scale-110 ease-in-out duration-300"
              required
            />
          </div>
          <div className="mb-5">
            <input
              placeholder="رقم بطاقة التعريف الوطنية"
              type="text"
              id="id"
              value={formData.id}
              onChange={handleInputChange}
              className="bg-[#D9D9D9] border border-red-600 rounded-lg block w-full p-2.5 text-black text-xl text-center placeholder-gray-400 placeholder:text-center focus:ring-2 focus:ring-[#057933] hover:scale-110 ease-in-out duration-300"
              required
            />
          </div>
          <div className="mb-5">
            <input
              placeholder="تاريخ الميلاد"
              type="date"
              id="birthDate"
              value={formData.birthDate}
              onChange={handleInputChange}
              className="bg-[#D9D9D9] border border-red-600 rounded-lg block w-full p-2.5 text-black text-xl text-center placeholder-gray-400 placeholder:text-center focus:ring-2 focus:ring-[#057933] hover:scale-110 ease-in-out duration-300"
              required
            />
          </div>
          <div className="flex flex-row items-center mb-5">
            <input
              type="file"
              accept="image/png,image/jpeg"
              onChange={handleFileChange}
              id="custom-input"
              hidden
            />
            <label
              htmlFor="custom-input"
              className="block mr-4 py-2 px-4 rounded-md border-0 text-sm font-semibold bg-pink-50 text-pink-700 hover:bg-pink-100 cursor-pointer"
            >
              إختر ملف
            </label>
            <label className="text-sm text-slate-500 mr-3">
              {selectedFile ? selectedFile.name : 'لم يتم اختيار ملف'}
            </label>
          </div>
          <div className="mt-3 flex justify-center">
            <div className="ml-4 mr-4">
              <button
                type="reset"
                className="bg-gradient-to-b from-[#FED33D] to-[#F67C0B] rounded-lg text-black text-lg font-medium w-full sm:w-20 px-3 py-2 text-center hover:ease-in-out duration-500 hover:bg-opacity-50 hover:text-white hover:ring-zinc-300 hover:ring-2 hover:outline-none"
              >
                Submit
              </button>
            </div>

          </div>
        </form>
        {imagePath && (
          <img
            src={imagePath}
            alt="Uploaded Image"
            className="max-w-80"
          />
        )}
      </div>
    </div>
  );
}

export default Analyse;
