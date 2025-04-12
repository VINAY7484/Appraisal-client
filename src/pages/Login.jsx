import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from './../components/Spinner';
import baseURL from '../utils/BaseURL';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [errors, setErrors] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    });

    const handleInput = (event) => {
        event.preventDefault();
        setUserData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    };

    const handleSubmit = async () => {
        setIsLoading(true); // Set loading state to true before the API call
        try {
            const response = await axios.post(`${baseURL}/users/login`, userData);
            login(response.data.user);

            // Store the token in localStorage
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));  // Optional: Store user data if needed

            // Update the auth context

            // Redirect to homepage or desired route after login
            toast.success(response.data.message)
            navigate('/');
        } catch (err) {
            toast.error(err.response?.data?.message || err.message)
            console.log(err.response?.data?.message || err.message); // Capture error message from response
        } finally {
            setIsLoading(false); // Set loading to false after the request completes
        }
    };

    if (isLoading) return <Spinner />; // Show a spinner while loading

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full sm:w-1/3 h-screen sm:h-5/6 bg-white flex flex-col gap-5 rounded-lg justify-center items-center p-8 m-0 sm:m-4 shadow-2xl border">
                <h2 className="font-semibold text-xl">Welcome back</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                    {errors && <div className="text-red-500 bg-red-200 rounded-lg p-2">{errors}</div>}

                    <label htmlFor="email" className="text-xs font-medium">EMAIL</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        onChange={handleInput}
                        placeholder="name@email.com"
                        className="h-10 rounded-md outline-none px-2 border border-gray-300"
                        required
                    />

                    <label htmlFor="password" className="text-xs font-medium">PASSWORD</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={handleInput}
                        placeholder="Enter your password"
                        className="h-10 rounded-md outline-none px-2 border border-gray-300"
                        required
                    />

                    <div className="text-blue-500 text-xs font-medium pt-4 cursor-pointer">Forgot password?</div>
                    <button type="submit" className="bg-blue-500 text-white font-bold rounded-lg h-10">Login</button>
                </form>

                <section className="text-sm mt-6 text-center">
                    <p>Having trouble logging in? Learner help center</p>
                    <p>Not registered yet? <Link className="text-blue-500" to="/signup">Create Account</Link></p>
                </section>
            </div>
        </div>
    );
};

export default Login;
