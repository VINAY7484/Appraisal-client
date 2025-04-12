import { Link } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

export default function Navbar({ navdata }) {
    return (
        <div className="p-4 w-[80%] z-30 shadow  fixed grid grid-cols-6 bg-white  space-x-4">

            {navdata.map((data, index) => (
                <Menu as="div" className="relative inline-block text-left" key={index}>
                    <MenuButton className="inline-flex  text-nowrap  justify-center gap-x-1.5 rounded-md bg-white px-6 py-2   text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ">
                        <span className="">{data.title}</span>
                        <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
                    </MenuButton>
                    <MenuItems
                        transition
                        className="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                        <div className="py-1">
                            {data.options.map((item, index) => (
                                <MenuItem key={index}>
                                    <Link
                                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                                        to={item.path}
                                    >
                                        {item.name}
                                    </Link>
                                </MenuItem>
                            ))}
                        </div>
                    </MenuItems>
                </Menu>
            ))}
            <div className="fixed m-5 right-5 space-x-2 ">
                <button
                    className="border rounded-full shadow p-1 text-2xl hover:border-blue-600"
                    onClick={() => window.history.back()}
                >
                    <IoArrowBack />
                </button>
                <button
                    className="border rounded-full shadow p-1 text-2xl hover:border-blue-600"
                    onClick={() => window.history.forward()

                    }>
                    <IoArrowForward />
                </button>
            </div>
        </div >
    );
}
