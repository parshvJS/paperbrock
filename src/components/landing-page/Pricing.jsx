import React from 'react'
import roller from '../../assets/roller.svg'
import Email from '../Email'
import { Link } from 'react-router-dom'
import ticked from '../../assets/landingpage/ticked.svg'
import unticked from '../../assets/landingpage/unticked.svg'
import tickedw from '../../assets/landingpage/ticked-white.svg'
import logo from '../../assets/landingpage/PaperPro.svg'
const Pricing = () => {

    const tickedMenu1 = [
        {
            label: "PYQ Analyzer",
            svg: ticked
        },
        {
            label: "5 papers at a time",
            svg: ticked
        },
        {
            label: "Additional Insights",
            svg: ticked
        },
        {
            label: "AI Answer Solver",
            svg: unticked
        },
        {
            label: "Practice Paper Generator",
            svg: unticked
        }
    ];

    const tickedMenu2 = [
        {
            label: "PYQ Analyzer",
            svg: tickedw
        },
        {
            label: "5 papers at a time",
            svg: tickedw
        },
        {
            label: "Additional Insights",
            svg: tickedw
        },
        {
            label: "AI Answer Solver",
            svg: tickedw
        },
        {
            label: "Practice Paper Generator",
            svg: unticked
        }
    ];

    const tickedMenu3 = [
        {
            label: "PYQ Analyzer",
            svg: ticked
        },
        {
            label: "5 papers at a time",
            svg: ticked
        },
        {
            label: "Additional Insights",
            svg: ticked
        },
        {
            label: "AI Answer Solver",
            svg: ticked
        },
        {
            label: "Practice Paper Generator",
            svg: ticked
        }
    ];

    return (
        <div>
            <div>
                <div>
                    <img src={roller} className='w-[300px] absolute top-[100px] right-[1350px] ' alt="" />
                </div>
                <div>
                    <img src={roller} className='w-[300px] absolute hidden top-[100px] left-[2150px] ' alt="" />
                </div>

            </div>

            <div className='bg-gradient-to-tl to-black from-[#0C00FF] w-full h-[400px] md:h-[500px]'>

                <div>
                    <Link to="/">
                    <p className="text-white font-semibold text-[24px] absolute top-[15px] left-[15px] md:left-[55px] md:top-[30px]">PaperBrock.</p>

                        {/* <img src={logo} className='absolute top-[15px] left-[15px] md:left-[55px] md:top-[30px]' /> */}
                    </Link>
                </div>
                <div className='flex justify-center items-center '>
                    <p className='font-bold text-white text-[30px] w-[400px] md:text-[50px] md:w-[800px] text-center mt-[100px] md: '>Register your email and get lifetime access </p>
                </div>

                <div className='flex justify-center items-center mt-[80px] w-full'>
                    <Email />
                </div>
            </div>





            <div className='bg-[#EFEFEE]'>
                <div className='flex justify-center items-center font-bold text-[30px]  md:text-[50px] '>
                    <p className='text-center mt-[20px] md:mt-[30px]'>Pricing after beta</p>
                </div>
                <div className='flex flex-col gap-[14px] md:flex-row justify-center items-center'>


                    <div className='bg-white w-[400px] h-[400px] sm:w-[80%] md:w-[380px] md:h-[450px] rounded-lg flex justify-start mt-5  p-4 pl-5 flex-col'>
                        <p className='font-semibold text-[24px]'>Pro</p>
                        <p className='font-bold text-[50px] text-[#0F0BC7]'>$5 <span className='text-[16px] text-gray-700 '>/Month</span></p>
                        <hr className='border-black my-5' />
                        <ul>

                            {tickedMenu1.map((menu) => {
                                return (
                                    <li className='flex flex-1 mt-[14px] md:mt-[24px]' key={`${menu.label}`}>
                                        <img src={menu.svg} className='mr-4' />
                                        <p className='font-medium text-[14px]'>{menu.label}</p>
                                    </li>)
                            })}

                        </ul>
                    </div>


                    <div className='bg-gradient-to-tl from-[#2272FF] to-[#0D03C3] w-[400px] h-[400px] md:w-[380px] md:h-[500px] rounded-lg flex justify-start mt-5  p-4 pl-5 flex-col'>
                        <p className='font-semibold text-[24px] text-white'>Popular</p>
                        <p className='font-bold text-[50px] text-white'>$10 <span className='text-[16px] text-white'>/Month</span></p>
                        <hr className='border-white my-5' />
                        <ul>

                            {tickedMenu2.map((menu) => {
                                return (
                                    <li className='flex flex-1 mt-[14px] md:mt-[24px]' key={`${menu.label}`}>
                                        <img src={menu.svg} alt="ticked" className='mr-4' />
                                        <p className='font-medium text-[14px] text-white'>{menu.label}</p>
                                    </li>)
                            })}

                        </ul>
                    </div>


                    <div className='bg-white w-[400px] h-[400px] md:w-[380px] md:h-[450px] rounded-lg flex justify-start mt-5  p-4 pl-5 flex-col '>
                        <p className='font-semibold text-[24px]'>Advanced</p>
                        <p className='font-bold text-[50px] text-[#0F0BC7]'>$15 <span className='text-[16px] text-gray-700'>/Month</span></p>
                        <hr className='border-black my-5' />
                        <ul>

                            {tickedMenu3.map((menu) => {
                                return (
                                    <li className='flex flex-1 mt-[14px] md:mt-[24px]' key={`${menu.label}`}>
                                        <img src={menu.svg} alt="ticked" className='mr-4' />
                                        <p className='font-medium text-[14px]'>{menu.label}</p>
                                    </li>)
                            })}

                        </ul>
                    </div>
                </div>

            </div>


        </div>
    )
}

export default Pricing