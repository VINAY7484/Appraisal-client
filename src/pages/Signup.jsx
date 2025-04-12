import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import baseURL from '../utils/BaseURL';
import axios from 'axios';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';


const Signup = () => {

    // const { login } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState()

    const [userData, setUserData] = useState({
        fullname: '',
        password: '',
        email: '',
        verifyPassword: ''
    });
    const handleInput = (event) => {
        event.preventDefault();
        setUserData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    };

    const handleSubmit = async () => {

        setLoading(true); // Set loading state to true before the API call
        try {
            const response = await axios.post(`${baseURL}/users/signup`, userData);

            // Redirect to homepage or desired route after login
            toast.success(response.data.message)
            navigate('/login');
        } catch (err) {
            toast.error(err.response?.data?.message || err.message)
            console.log(err.response?.data?.message || err.message); // Capture error message from response
        } finally {
            setLoading(false); // Set loading to false after the request completes
        }
    };


    if (loading) return <Spinner />

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-1/3 h-auto bg-white flex flex-col gap-5 rounded-lg justify-center items-center p-8 m-4 shadow-2xl border">
                <h2 className="font-semibold text-xl">Welcome to Sign up</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                    <label htmlFor="fullname" className="text-xs font-medium">FULL NAME</label>
                    <input
                        type="fullname"
                        name="fullname"
                        id="fullname"
                        onChange={handleInput}
                        placeholder="fullname"
                        className="h-10 rounded-md outline-none px-2 border border-gray-300"
                    />
                    <label htmlFor="email" className="text-xs font-medium">EMAIL</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        onChange={handleInput}
                        placeholder="name@email.com"
                        className="h-10 rounded-md outline-none px-2 border border-gray-300"
                    />
                    <label htmlFor="password" className="text-xs font-medium">PASSWORD</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={handleInput}
                        placeholder="Enter your password"
                        className="h-10 rounded-md outline-none px-2 border border-gray-300"
                    />
                    <label htmlFor="verifyPassword" className="text-xs font-medium">CONFORM PASSWORD</label>
                    <input
                        type="password"
                        name="verifyPassword"
                        id="verifyPassword"
                        onChange={handleInput}
                        placeholder="Enter your Conform Password"
                        className="h-10 rounded-md outline-none px-2 border border-gray-300"
                    />
                    <button type="submit" className="bg-blue-500 text-white font-bold rounded-lg h-10">Sign Up</button>
                </form>
                <section className="text-sm mt-6 text-center">
                    <p>Already registerd ? <Link className='text-blue-500' to='/login'>Click here to login</Link> </p>
                </section>

            </div>
        </div>
    );
};

export default Signup;


