import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { IoStorefront } from "react-icons/io5";
import { FaFileInvoice } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import { MdEqualizer, MdManageAccounts } from "react-icons/md";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { GiHumanPyramid } from "react-icons/gi";

const SidebarLink = ({ to, icon: Icon, label }) => {
    const location = useLocation(); // Get current path

    return (
        <Link
            to={to}
            className={`px-4 py-2 w-full flex items-center   transition duration-200 ${`/${location.pathname.split('/')[1]}` === to
                ? "bg-blue-500 text-white border shadow-3xl font-semibold"
                : "hover:bg-blue-300 text-black"
                }`}
        >
            <Icon className="mr-2" />
            {label}
        </Link>
    );
};

const Sidebar = () => {
    const { user, isAuthenticated } = useAuth();
    const sidebarLinks = [
        { to: "/", icon: RiDashboardFill, label: "Dashboard" },
        { to: "/fill-appraisal", icon: MdEqualizer, label: "Fill Appraisal" },
        { to: "/view-appraisal", icon: FaFileInvoice, label: "View Appraisal details" },
    ];

    return (
        <div className="h-screen z-40 shadow-md font-serif">
            <div className="mt-5">
                <div className="py-4">
                    {sidebarLinks.map((link, index) => (
                        <SidebarLink key={index} {...link} />
                    ))}


                    {/*Admin Access */}
                    {isAuthenticated && (user.userType === "Admin") && (
                        <>
                            {/* <SidebarLink to="/add-question" icon={MdManageAccounts} label="Add Qustion" /> */}
                            <SidebarLink to="/user" icon={MdManageAccounts} label="User Management" />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
