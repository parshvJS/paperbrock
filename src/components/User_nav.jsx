import React, { useState } from 'react';
import collapsed_logo from '../assets/nav/collapsed_logo.svg';
import logo from '../assets/nav/logo.svg';
import LArr from '../assets/nav/right-arr.svg';
import RArr from '../assets/nav/left-arr.svg';
import { NavLink, useLocation } from 'react-router-dom';
import op1b from '../assets/nav/options/op1-black.svg';
import op2b from '../assets/nav/options/op2-black.svg';
import op3b from '../assets/nav/options/op3-black.svg';
import op1w from '../assets/nav/options/op1-white.svg';
import op2w from '../assets/nav/options/op2-white.svg';
import op3w from '../assets/nav/options/op3-white.svg';
import profile from '../assets/profile/pic1.svg';
import dots from '../assets/dots.svg';
import { useUserContext } from '../context/authChecked';

const User_nav = () => {
    const { user } = useUserContext();
    const [collapsed, setCollapsed] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false); // New state for dropdown

    const { pathname } = useLocation();
    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const userMenu = [
        {
            label: "You profile",
            route: `/profile/${user.id}`
        }
    ]

    const navMenu = [
        {
            label: "PYQ Analyzer",
            opb: op1b,
            opw: op1w,
            route: "/dashboard"
        },
        {
            label: "AI answer book",
            opb: op2b,
            opw: op2w,
            route: "/ai-book"
        },
        {
            label: "Practice Paper",
            opb: op3b,
            opw: op3w,
            route: "/practice-paper"
        }
    ];

    return (
        <>
            <div className={`bg-gradient-to-t to-pri-800 from-pri-500 text-white h-screen flex flex-col items-center justify-between  z-50 ${collapsed ? 'w-20' : 'w-64'} transition-all duration-300`}>
                <div className="flex items-center justify-center h-28 w-28 my-5 ">
                    <img src={collapsed ? collapsed_logo : logo} alt="Logo" />
                </div>
                <div className=" flex flex-col items-start flex-grow gap-6 mt-5">
                    {/* Your sidebar content here */}
                    {navMenu.map((menu) => {
                        let isActive = pathname === menu.route;
                        return (
                            <NavLink to={menu.route} key={menu.label}>
                                <div key={menu.label} className={`p-4 flex justify-start items-center gap-2 w-[170px] h-[40px] rounded-[6px] ${isActive ? " bg-white" : ""} ${collapsed ? "rounded-full w-[50px] h-[50px]" : ""} ${isActive && collapsed ? "rounded-full w-[50px]" : ""} `}>
                                    <img src={isActive ? menu.opb : menu.opw} className={` ${collapsed ? "w-7 h-7" : "w-6 h-6"}`} alt={`${menu.label}`} />
                                    <p className={`${collapsed ? "hidden" : "block"} ${isActive ? "text-black bg-white rounded-[4px]" : "text-white"} font-semibold text-[14px]`} >{`${menu.label}`}</p>
                                </div>
                            </NavLink>
                        )
                    }
                    )}
                </div>
                {dropdownOpen && (
                    <div role="menu" className='bg-pri-500 w-[90%] rounded-md z-10' aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                        <div className="py-1" role="none">
                            {/* Dropdown items */}

                            <a href="#" className="  text-white block px-4 py-2 text-sm  hover:bg-gray-200" role="menuitem" tabIndex="-1">Option 1</a>
                            <a href="#" className="text-white   block px-4 py-2 text-sm hover:bg-gray-200" role="menuitem" tabIndex="-1">Option 2</a>
                            <a href="#" className="text-white   block px-4 py-2 text-sm hover:bg-gray-200" role="menuitem" tabIndex="-1">Option 3</a>
                        </div>
                    </div>
                )}
                <div>
                    <div className={`${collapsed ? "block" : "hidden"}`}><img src={profile} className='w-[30px] h-[30px]' /></div>

                </div>
                <div className={` ${collapsed ? "hidden" : "block"} my-5 rounded-full h-[30px] flex w-36 justify-between items-center z-20`}>
                    <div className=''><img src={profile} className='w-[30px] h-[30px]' /></div>
                    <div className={`font-medium text-[14px] w-fit block`}>{user.fullName}</div>
                    <div className={` bg-pri-400 rounded-full w-5 h-5 flex justify-center items-center`} onClick={toggleDropdown}> {/* Attach event handler to toggle dropdown */}
                        <img src={dots} className='w-3 h-3' />
                    </div>
                </div>
                <div className=' flex items-center justify-center'>
                    <div className=" flex items-center justify-center h-20">
                        <button className={`text-white flex justify-center items-center ${collapsed ? "ml-[75px]" : "ml-[250px]"} focus:outline-none bg-pri-400 w-5 h-5 rounded-full animate-none`} onClick={toggleSidebar}>
                            <div className='flex justify-between items-center'>
                                <img src={collapsed ? RArr : LArr} alt="" />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default User_nav;
