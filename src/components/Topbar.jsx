// import logo from '../assets/logo.png'
import profile from '../assets/profile.png'
import Dropdown from './Dropdown'
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { IoNotifications } from 'react-icons/io5';


const Topbar = () => {

    const { user, isAuthenticated } = useAuth();
    return (
        <div className='flex justify-between px-4 '>
            <div className='justify-center items-center'>
                <h1 className='text-2xl font-bold mt-2 text-justify'>Logo</h1>
            </div>
            <div className='flex justify-center items-center space-x-3 mt-2'>

                {isAuthenticated && user ? (
                    <span className=' text-justify '>Welcome, {user?.fullname?.toUpperCase()} !</span>
                ) : (
                    <span>Please log in</span>
                )}



                <img src={profile} alt="https://via.placeholder.com/150" className="w-10 h-10 rounded-full " />
                <Dropdown title={user?.userType?.toUpperCase()}
                    options={[
                        {
                            name: "Profile",
                            path: "profile"
                        },
                        {
                            name: "Settings",
                            path: "setting"
                        },
                        {
                            name: "Logout",
                            path: "logout"
                        },
                    ]} />



                <Link to="/notifications">
                    <span className='relative inline-block mr-2'>
                        <IoNotifications className='text-3xl' />

                        {/* {unreadCount > 0 && ( */}
                        <span className='absolute top-0 right-0  left-4 bottom-5 inline-flex items-center justify-center px-3 mx-1  py-2 text-xs font-bold leading-none bg-red-600 rounded-full text-white  z-10  border-white border-2'>
                            {/* {unreadCount} 1+ */}85+
                        </span>
                        {/* )} */}
                    </span>
                </Link>

            </div>
        </div>
    )
}

export default Topbar
