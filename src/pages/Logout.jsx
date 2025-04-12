import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';  // Import your AuthContext
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Logout = () => {
    const { logout } = useAuth();  // Get the logout function from AuthContext
    const navigate = useNavigate();

    useEffect(() => {
        // Perform logout action
        localStorage.removeItem("token");  // Clear token from localStorage
        localStorage.removeItem("user");   // Optional: Remove user info if stored

        logout();  // Update the authentication context
        toast.success("You Logout Successful")
        navigate('/login');  // Redirect to the login page after logging out
    }, [logout, navigate]);

    return (
        <div className="flex justify-center items-center h-screen">
            <h2 className="text-xl font-semibold">Logging you out...</h2>
        </div>
    );
};

export default Logout;
