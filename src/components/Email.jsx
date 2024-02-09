import React, { useState } from 'react';

function Email() {
    const [emailAddress, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        // Handle form submission
        try {
            setLoading(true);
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: emailAddress })
            };
            await fetch('http://localhost:8000/api/v1/beta/register', options);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleButtonClick = (e) => {
        e.stopPropagation(); // Prevent event propagation
        handleSubmit(); // Call the form submission handler
    };

    return (
        <>
            <div className='flex bg-white w-auto md:w-auto  md:p-2 rounded-full  justify-center items-center '>
                <form onSubmit={handleSubmit} className='flex items-center justify-center'>
                    <div className='mx-5'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                        </svg>
                    </div>
                    <input type="email" name="email" id="betaEmail" value={emailAddress} placeholder='Enter Your Email' onChange={(e) => setEmail(e.target.value)} className="outline-none border-none px-2 py-1 " />
                    <button type="button" onClick={handleButtonClick} className='text-white bg-gradient-to-br from-[#2272FF] from-50 to-[#0D03C3] to-[99%]  md:h-11 md:w-33 sm:h-[40px] m-1 px-5 py-2 rounded-full hover:font-semibold'>Register</button>
                </form>
            </div>
        </>
    );
}

export default Email;
