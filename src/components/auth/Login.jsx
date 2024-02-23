import React, { useContext, useState } from 'react'
import side from '../../assets/auth/login-side-img.svg'
import emailIcon from '../../assets/auth/env.svg'
import lock from '../../assets/auth/lock.svg'
import { api_url, headers } from '../../constants.js'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUserContext } from '../../context/authChecked.jsx'

const Login = () => {
    const { setUser,checkAuthUser } = useUserContext();
    let [isLoading, setIsloading] = useState(false)
    const [email, setemail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isError, setIsError] = useState(false)

    const navigate = useNavigate()

    const notify = () => toast.success('Successfully Logged in !', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    async function handleLogIn(e) {
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

    return (
        <div className="bg-white flex justify-center items-center h-screen flex-row-reverse">

            <div className="w-1/2 h-screen hidden lg:block">
                <img src={side} alt="Placeholder Image" className="object-cover w-full h-full" />
            </div>
            <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                <div>
                    <p className='text-[23px] md:text-[25px] font-extrabold text-pri-500 mb-[30px]'>
                        <Link to="/">PaperBrock.</Link>
                    </p>
                    <h1 className="text-2xl font-extrabold mb-4 text-black text-[36px]">Log in to your Account ! </h1>
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
                            <img src={emailIcon} alt="email icon" className='w-[23px] mx-[10px]' />
                            <input onChange={(e) => setemail(e.target.value)} type="email" id="username" name="username" className=" bg-nonew-full rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 w-full" autoComplete="off" />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-950">Password</label>
                        <div className='border border-gray-300 flex rounded-md'>
                            <img src={lock} alt="email icon" className='w-[23px] mx-[10px]' />
                            <input type="password" onChange={(e) => setPassword(e.target.value)} id="password" name="password" className=" bg-nonew-full rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 w-full" autoComplete="off" />
                        </div>
                    </div>

                    {/* <div className="mb-4 flex items-center">
                        <input type="checkbox" id="remember" name="remember" className="text-blue-500" />
                        <label for="remember" className="text-gray-600 ml-2">Remember Me</label>
                    </div> */}

                    {/* <div className="mb-6 text-blue-500">
                        <a href="#" className="hover:underline">Forgot Password?</a>
                    </div> */}

                    <button type="submit" className="bg-pri-500 hover:bg-pri-600 text-white font-semibold rounded-md py-2 px-4 w-full flex justify-center items-center">
                        {
                            isLoading ?
                                <div role="status">
                                    <svg aria-hidden="true" className="w-8 h-8 text-white animate-spin dark:text-white fill-blue-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div> :
                                <p>Log in</p>
                        }
                    </button>
                </form>
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
                <div className="mt-6 text-blue-500 text-center flex gap-2 justify-center">
                    <p className='text-black'>Don't have an account ?</p>
                    <Link to="/user/sign-in" className="hover:underline">Create an account</Link>
                </div>
            </div>
        </div>
    )
}

export default Login