import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/solid";

const FinalNav = () => {

    const navigate = useNavigate();
    const logout = () => {
        axios.post('http://localhost:8000/Student/logout',{},{withCredentials:true})
            .then(serverResponse => {
                console.log(serverResponse);
                localStorage.clear()
                navigate('/');
            })
            .catch(error => console.log(error),
            console.log("Tell me why tell me why ")
            
        );
    };

    return (
         
              <header className=" h-24">
        <div className="flex justify-between">
          <Link>
            <img
              className="w-60 mt-6 mr-4"
              src="../public/images/logoBETA.png"
            />
          </Link>
          <form onClick={logout}>
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
          </form>
        </div>
        <hr
          className="mt-3 border-2
        mix-blend-overlay opacity-50"
        />
      </header>
        
        
    )
}

export default FinalNav