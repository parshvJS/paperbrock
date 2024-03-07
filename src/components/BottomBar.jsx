import React, { useState } from 'react';
import collapsed_logo from '../assets/nav/collapsed_logo.svg';
import logo from '../assets/nav/logo.svg';
import LArr from '../assets/nav/right-arr.svg';
import RArr from '../assets/nav/left-arr.svg';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import dots from '../assets/dots.svg';
import { useUserContext } from '../context/authChecked';
import Loading from './Loading';
import op1b from '../assets/nav/options/op1-black.svg';
import op2b from '../assets/nav/options/op2-black.svg';
import op3b from '../assets/nav/options/op3-black.svg';
import op1w from '../assets/nav/options/op1-white.svg';
import op2w from '../assets/nav/options/op2-white.svg';
import op3w from '../assets/nav/options/op3-white.svg';
import profile from '../assets/profile/pic1.svg';
const BottomBar = () => {
    const { user, toggleSideBar, isLoading, setIsLoading } = useUserContext();
    const [collapsed, setCollapsed] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const { pathname } = useLocation();
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
            // Your logout logic here
        } catch (error) {
            console.error('Error logging out:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`fixed bottom-0 bg-gradient-to-t to-pri-800 from-pri-500 text-white w-full flex items-center justify-between z-50 transition-all duration-200`}>
            <div className="flex items-center justify-between gap-14 mx-auto">
                {navMenu.map((menu) => {
                    let isActive = pathname === menu.route;
                    return (
                        <NavLink to={menu.route} key={menu.label} className={`rounded-full`}>
                            <div key={menu.label} className={`hover: p-4 flex justify-start items-center gap-9  ${isActive ? " bg-white" : ""} ${collapsed ? "rounded-full w-[50px] h-[50px]" : ""} ${isActive && collapsed ? "rounded-full w-[50px]" : ""} `}>
                                <img src={isActive ? menu.opb : menu.opw}  alt={`${menu.label}`} />
                            </div>
                        </NavLink>
                    )
                }
                )}
                {/* Add other NavLink components for additional menu items */}
            </div>
            <div className={`${collapsed ? 'hidden' : 'flex'} items-center justify-center my-5 rounded-full h-[30px] w-36`}>
                {/* Your profile picture */}
                {/* Your user name */}
                <div className="bg-pri-400 rounded-full w-5 h-5 flex justify-center items-center" onClick={toggleDropdown}>
                    <img src={dots} className="w-3 h-3" alt="Toggle Dropdown" />
                </div>
            </div>

        </div>
    );
};

export default BottomBar;
