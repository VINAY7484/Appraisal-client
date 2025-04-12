import React from 'react'
import { Outlet } from 'react-router-dom'
import Topbar from '../components/Topbar'
import Sidebar from '../components/Sidebar'
// import Navbar from '../components/Navbar'

const MainLayout = () => {
    return (
        <>
            <div className=" w-100 h-[55px] sticky top-0 shadow z-50 bg-white font-serif ">
                <Topbar />
            </div>
            <div className="flex  bg-white-500 h-[80%] ">
                <div className=" w-[20%] min-w-[20%] h-screen shadow-md fixed ">
                    <Sidebar />
                </div>

                <div className="w-full max-w-[80%] overflow-x-auto ml-[20%] ">
                    {/* <Navbar /> */}
                    <Outlet />
                </div>
            </div >
        </>
    )
}

export default MainLayout
