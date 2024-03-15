import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/authChecked';
import Loading from './Loading';

import collapsed_logo from '../assets/nav/collapsed_logo.svg';
import logo from '../assets/nav/logo.svg';
import LArr from '../assets/nav/right-arr.svg';
import RArr from '../assets/nav/left-arr.svg';
import op1b from '../assets/nav/options/op1-black.svg';
import op2b from '../assets/nav/options/op2-black.svg';
import op3b from '../assets/nav/options/op3-black.svg';
import op1w from '../assets/nav/options/op1-white.svg';
import op2w from '../assets/nav/options/op2-white.svg';
import op3w from '../assets/nav/options/op3-white.svg';
import op4w from '../assets/nav/options/op4-white.svg';
import op4b from '../assets/nav/options/op4-black.svg';
import op5b from '../assets/nav/options/op5-black.svg';
import op5w from '../assets/nav/options/op5-white.svg';
import op6b from '../assets/nav/options/op6-black.svg';
import op6w from '../assets/nav/options/op6-white.svg';
import op7b from '../assets/nav/options/op7-black.svg';
import op7w from '../assets/nav/options/op7-white.svg';
import op8b from '../assets/nav/options/op8-black.svg';
import op8w from '../assets/nav/options/op8-white.svg';
import profile from '../assets/profile/pic1.svg';
import dots from '../assets/dots.svg';

const UserNav = () => {
    const { user, toggleSideBar, isLoading, setIsLoading } = useUserContext();
    const [collapsed, setCollapsed] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const toggleSidebar = () => {
        toggleSideBar();
        setCollapsed(!collapsed);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = async () => {
        setIsLoading(true);
        try {
            const accessToken = localStorage.getItem("AccessToken");
            const headers = { "Authorization": `Bearer ${accessToken}` };
            const res = await fetch(`https://paperbrockbackend.onrender.com/api/v1/users/logout`, { headers, method: 'POST' });
            const response = await res.json();
            localStorage.removeItem('AccessToken');
            if (response.success) {
                navigate('user/log-in');
            }
        } catch (error) {
            throw new Error;
        } finally {
            setIsLoading(false);
        }
    };

    const renderNavItem = (menu) => {
        const isActive = pathname === menu.route;
        return (
            <NavLink to={menu.route} key={menu.label} className={`${collapsed ? "" : "w-full"} px-2 my-1`}>
                <div key={menu.label} className={`p-4 flex justify-start items-center gap-3  ${isActive ? `w-4 h-4 bg-white ${collapsed ? "rounded-full" : "rounded-[4px]"}` : ""} ${collapsed ? "w-auto h-[40px] rounded-full  justify-center items-center" : "w-full h-[20px]"} `}>
                    <img src={isActive ? menu.opb : menu.opw} className={`${collapsed ? "w-4 h-4" : "w-4 h-4"}`} alt={`${menu.label}`} />
                    <p className={`${collapsed ? "hidden" : "block"} ${isActive ? "text-black bg-white " : "text-white"} font-semibold text-[14px]`}>{menu.label}</p>
                </div>
            </NavLink>
        );
    };


    const userMenu = [{ label: "Your Profile", route: `/profile/${user.id}` }];

    const navMenu = [
        { label: "Home", opb: op4b, opw: op4w, route: "/home" },
        { label: "PYQ Analyzer", opb: op1b, opw: op1w, route: "/dashboard" },
        { label: "Answer Book", opb: op2b, opw: op2w, route: "/ai-book" },
        { label: "Practice Paper", opb: op3b, opw: op3w, route: "/practice-paper" }
    ];
    const navMenu1 = [
        { label: "Solved Hub", opb: op5b, opw: op5w, route: "/" },
        { label: "Student Circle", opb: op6b, opw: op6w, route: "/" },
    ];
    const navMenu2 = [
        { label: "QuizForge war ", opb: op7b, opw: op7w, route: "/" },
        { label: "Insight Talks", opb: op8b, opw: op8w, route: "/" },
    ];

    return (
        <div className={`border-r-2 border-gray-400 fixed bg-gradient-to-t to-pri-800 from-pri-500 from-[10%] text-white h-screen flex mr-3 flex-col items-center z-50 ${collapsed ? 'w-20' : 'w-56'} transition-all duration-200`}>
            <div className="flex items-center justify-center flex-col h-10 w-28 my-5">
                <img src={collapsed ? collapsed_logo : logo} alt="Logo" />
                <div className='flex items-center justify-center'>
                <div className="absolute mb-">
                    <button className={`text-white flex justify-center items-center ${collapsed ? "ml-[75px]" : "ml-[220px]"} focus:outline-none bg-pri-500 w-5 h-5 rounded-full animate-none`} onClick={toggleSidebar}>
                        <div className='flex justify-between items-center '>
                            <img src={collapsed ? RArr : LArr} alt="Toggle" />
                        </div>
                    </button>
                </div>
            </div>
            </div>
            <div className="flex flex-col items-start flex-grow gap-[10px]  w-full p-1">
                <hr className='w-full' />
                {navMenu.map(renderNavItem)}
                <hr className='w-full' />
                {navMenu1.map(renderNavItem)}
                <hr className='w-full' />
                {navMenu2.map(renderNavItem)}
                <hr className='w-full' />

            </div>
                {dropdownOpen && (
                    <div role="menu" className=' bg-pri-500 w-[90%] rounded-md z-40' aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                        <div className="py-1" role="none">
                            <button onClick={handleLogout} className={`hover:text-black text-white block px-4 py-2 text-sm hover:bg-gray-200`} role="menuitem" tabIndex="-1">
                                {isLoading ? <Loading /> : "Log Out"}
                            </button>
                            <a href="#" className="text-white block px-4 py-2 text-sm hover:bg-gray-200" role="menuitem" tabIndex="-1">Option 2</a>
                            <a href="#" className="text-white block px-4 py-2 text-sm hover:bg-gray-200" role="menuitem" tabIndex="-1">Option 3</a>
                        </div>
                    </div>
                )}
            <div>
                <div className={`${collapsed ? "block" : "hidden"}`}><img src={profile} className='w-[30px] h-[30px]' alt="Profile" /></div>
            </div>
            <div className={`${collapsed ? "hidden" : "block"} my-5 mr-5 rounded-full h-[30px] flex w-36 justify-between items-center z-20`}>
                <div className=''><img src={profile} className='w-[30px] h-[30px]' alt="Profile" /></div>
                <div className={`font-medium text-[14px] w-fit block text-left`}>{user.fullName.split(' ')[0]}</div>
                <div className={`bg-pri-400 rounded-full w-5 h-5 flex justify-center items-center`} onClick={toggleDropdown}>
                    <img src={dots} className='w-3 h-3' alt="Dropdown" />
                </div>
            </div>
            
        </div>
    );
};

export default UserNav;
