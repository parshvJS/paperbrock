import React, { useEffect, useState } from 'react'
import emailIcon from '../../assets/auth/env.svg'
import lock from '../../assets/auth/lock.svg'
import user1 from '../../assets/auth/user.svg'
import bgImage from '../../assets/title-sign.svg'
import { api_url, headers, options } from '../../constants.js'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUserContext } from '../../context/authChecked.jsx'
import DropDown from '../dashboard/DropDown.jsx'
import Loading from '../Loading.jsx'
const SignIn = () => {
    const { setUser, user } = useUserContext()
    const navigate = useNavigate()
    let [isLoading, setIsloading] = useState(false)
    const [email, setemail] = useState("")
    const [password, setPassword] = useState("")
    const [fullName, setFullName] = useState("")
    const [stream, setStream] = useState("")
    const [error, setError] = useState("")
    const [isError, setIsError] = useState(false)
    // dropdown
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(options[0].value || "");

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const notify = () => toast.success('SuccessFully Signed In Please Log In !', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const handleSelectChange = (event) => {
        console.log(event , "is insize");
        setSelectedOption(event);
    };
    async function handleLogIning(e) {
        e.preventDefault();
        setIsloading(true);

        try {
            const response = await fetch(`${api_url}/api/v1/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error.message)
                setIsError(true)
                throw new Error(errorData.error.message);
            }
            else {
                notify()
                const res = await response.json()
                console.log(res)
                localStorage.setItem("AccessToken", res.data.tokens.AccessToken)
                checkAuthUser()
                navigate("/dashboard")
            }


        } catch (error) {
            setError(error.message)
            console.error("hello");
        } finally {
            setIsloading(false);
            setemail("");
            setPassword("");
        }
    }

    async function handleLogIn(e) {
        e.preventDefault();
        if (!email || !password || !selectedOption) {
            setError("Email ,Password and Stream Is Required ! ")
            setIsError(true)
            return;
        }
        setIsloading(true);
        try {
            const response = await fetch(`${api_url}/api/v1/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    stream: selectedOption,
                    fullName: fullName ? fullName.toUpperCase() : ""
                }),
                
            });
            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error.message)
                setIsError(true)
                throw new Error(errorData.error.message);
            }
            else {
                const data = await response.json()

                // calls toast
                notify()
                handleLogIning(e)
                setUser({
                    id: data.data._id,
                    email: data.data.email,
                    password: data.data.password,
                    fullName: data.data.fullName,
                    stream: data.data.stream,
                    plan: data.data.plan
                })
                navigate('/dashboard')
            }


        } catch (error) {
            setError(error.message)
            console.error(error.message);
        } finally {
            setIsloading(false);
            setemail("");
            setPassword("");
        }
    }

        return (
        <div className="bg-white flex justify-center items-center h-screen flex-row-reverse">

            <div className="w-1/2 h-screen hidden lg:block">
                <img src={bgImage} alt="Placeholder Image" className="object-cover w-full h-full" />
            </div>
            <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                <div>
                    <p className='text-[23px] md:text-[25px] font-extrabold text-pri-500 mb-[30px]'>
                        <Link to="/">PaperBrock.</Link>
                    </p>

                    <h1 className="text-2xl font-extrabold mb-4 text-black text-[36px]"> Register your Account! </h1>
                </div>
                {
                    isError ?

                        <div id="alert-2" className="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50" role="alert">
                            <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span className="sr-only">Info</span>
                            <div className="ms-3 text-sm font-medium">
                                <p>{error}</p>
                            </div>
                            <button type="button" onClick={(e) => { setIsError(false) }} className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8" data-dismiss-target="#alert-2" aria-label="Close">
                                <span className="sr-only">Close</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                            </button>
                        </div>

                        : <span></span>
                }
                <form className='my-[40px]' onSubmit={handleLogIn}>

                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-950">Email</label>
                        <div className='border border-gray-300 flex rounded-md'>
                            <img src={emailIcon} alt="email icon" className='w-[20px] mx-[10px]' />
                            <input onChange={(e) => setemail(e.target.value)} type="email" id="username" name="username" className=" bg-nonew-full rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 w-full" autoComplete="off" />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="fullName" className="block text-gray-950">Full name</label>
                        <div className='border border-gray-300 flex rounded-md'>
                            <img src={user1} alt="email icon" className='w-[20px] mx-[10px]' />
                            <input type="text" onChange={(e) => setFullName(e.target.value)} id="fullName" name="fullName" className=" bg-nonew-full rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 w-full" autoComplete="off" />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-950">Password</label>
                        <div className='border border-gray-300 flex rounded-md'>
                            <img src={lock} alt="email icon" className='w-[20px] mx-[10px]' />
                            <input type="password" onChange={(e) => setPassword(e.target.value)} id="password" name="password" className=" bg-nonew-full rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 w-full" autoComplete="off" />
                        </div>
                    </div>

                  

                    <DropDown options={options} onStreamChange={handleSelectChange} widthSize={'full'} />



                    <button type="submit" className="bg-pri-500 hover:bg-pri-600 text-white font-semibold rounded-md py-2 px-4 w-full flex justify-center items-center">
                        {
                            isLoading ?
                                <Loading/>:
                                <p>Sign In</p>
                        }
                    </button>
                </form>

                <div>
                    <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                </div>
                <div className="mt-6 text-blue-500 text-center flex gap-2 justify-center">
                    <p className='text-black'>Already have account ?</p>
                    <Link to="/user/log-in" className="hover:underline">Log in</Link>
                </div>
            </div >
        </div >
    )
}

export default SignIn