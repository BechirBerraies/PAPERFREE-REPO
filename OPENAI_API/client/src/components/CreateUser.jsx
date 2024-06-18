import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateUser = () => {


    const [user, setUser] = useState({ Name: "",Surname:"", email: "", password: "", confirmPassword: "" });
    const [loguser, logsetuser] = useState({ email: '', password: '' });
    const navigate = useNavigate();



    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };
    const handleChange2 =   (e) => {
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
                navigate('/process');
            })
            .catch(error => console.log(error),
            console.log("Tell me why tell me why ")
            
        );
    };

    const login = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/Student/login', loguser, { withCredentials: true })
           .then(serverResponse => {
                console.log(serverResponse);
                navigate('/process');
            })
           .catch(error => console.log(error),
            console.log("Tell me why tell me why ")
            
        );
    };


    return (
<div className="max-w-500 mx-auto p-4 border border-gray-300 rounded-lg">
    <h2 className="text-xl font-bold mb-4">Register</h2>
    <form onSubmit={register}>
        <div className="mb-6">
            <label htmlFor="Name" className="block mb-1">Name:</label>
            <input
                type="text"
                id="Name"
                name="Name"
                value={user.Name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
            />
        </div>
        <div className="mb-6">
            <label htmlFor="Surname" className="block mb-1">Surname:</label>
            <input
                type="text"
                id="Surname"
                name="Surname"
                value={user.Surname}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
            />
        </div>
        <div className="mb-6">
            <label htmlFor="email" className="block mb-1">Email:</label>
            <input
                type="email"
                id="emailregister"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
            />
        </div>
        <div className="mb-6">
            <label htmlFor="password" className="block mb-1">Password:</label>
            <input
                type="password"
                id="passwordregister"
                name="password"
                value={user.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
            />
        </div>
        <div className="mb-6">
            <label htmlFor="confirmPassword" className="block mb-1">Confirm Password:</label>
            <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
            />
        </div>
        <div className="mb-6">
            <button type="submit" className="w-full px-4 py-2 bg-green-600 text-white text-lg font-semibold rounded hover:bg-green-700">
                Register
            </button>
        </div>
    </form >

    <form  onSubmit={login}>
        <div className="mb-6">
            <label htmlFor="email" className="block mb-1">Email:</label>
            <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange2}
                value={loguser.email}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
            />
        </div>

        <div className="mb-6">
            <label htmlFor="password" className="block mb-1">Password:</label>
            <input
                type="password"
                id="password"
                name="password"
                onChange={handleChange2}
                value={loguser.password}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
            />
        </div>
        <div className="mb-6">
            <button type="submit" className="w-full px-4 py-2 bg-green-600 text-white text-lg font-semibold rounded hover:bg-green-700">
                Login
            </button>
        </div>
    </form>
</div>
    );
};

export default CreateUser;