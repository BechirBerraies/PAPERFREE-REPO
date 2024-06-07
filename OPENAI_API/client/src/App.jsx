import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePath, setImagePath] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    const acceptedTypes = ['image/png', 'image/jpeg'];
    if (!acceptedTypes.includes(file.type)) {
      alert('Please select a PNG or JPG image file.');
      return;
    }

    setSelectedFile(file);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert('Please select a PNG or JPG image file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:8000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        console.log('Image uploaded successfully!');
        setImagePath(response.data.imagePath);
        setSelectedFile(null);
      } else {
        console.error('Error uploading image:', response.data.error);
        alert('Error uploading image. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
    }
  };

  const sendRequestToChatGPT = async (e) => {
    e.preventDefault();
    if (!imagePath) {
      alert('Please upload an image first.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/askchatgpt', {
        name: document.getElementById('name').value,
        surname: document.getElementById('surname').value,
        id: document.getElementById('id').value,
        imagePath,
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error making the Chat GPT request:', error);
    }
  };

  return (
    <div className="h-screen w-screen bg-cover bg-center" style={{ backgroundImage: `url('../public/images/header.png')` }}>
      <div className="image-upload-container h-full flex items-center align-middle justify-center">
        <form onSubmit={sendRequestToChatGPT} className="max-w-sm mx-auto">
          <div className="mb-5">
            <input
              placeholder="Name"
              type="text"
              id="name"
              className="bg-custom-dark border border-custom-border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-center"
              required
            />
          </div>
          <div className="mb-5">
            <input
              placeholder="Surname"
              type="text"
              id="surname"
              className="bg-custom-dark border border-custom-border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-center"
              required
            />
          </div>
          <div className="mb-5">
            <input
              placeholder="Id Number"
              type="text"
              id="id"
              className="bg-custom-dark border border-custom-border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-center"
              required
            />
          </div>
          <div>
            <input
              type="file"
              accept="image/png,image/jpeg"
              onChange={handleFileChange}
              className="h-48 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>
          <div className="mt-3 flex justify-center">
            <button
              type="button"
              onClick={handleFileUpload}
              className="text-white bg-gradient-button hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Upload Image
            </button>
          </div>
          <div className="mt-3 flex justify-center">
            <button
              type="submit"
              className="text-white bg-gradient-button hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </div>
        </form>
        {imagePath && <img src={imagePath} alt="Uploaded Image" />}
      </div>
    </div>
  );
}

export default App;