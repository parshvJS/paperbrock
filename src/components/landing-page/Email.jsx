import React, { useEffect, useState } from 'react';
import createDoc from '../../utils/appwrite';

function Email() {
    const [emailAddress, setEmailAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const [validEmail, setValidEmail] = useState(true); // Track email validity

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        if (emailAddress === "") {
            setValidEmail(false); // Empty email
            return;
        }
        if (!isValidEmail(emailAddress)) {
            setValidEmail(false); // Invalid email format
            return;
        }
        setValidEmail(true); // Reset email validity
        try {
            setLoading(true);
            await createDoc(emailAddress);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            setEmailAddress("");
        }
    };

    const isValidEmail = (email) => {
        // Regular expression for email validation
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleButtonClick = (e) => {
        if (emailAddress === "") {
            setValidEmail(false); // Empty email
            return;
        }
        if (!isValidEmail(emailAddress)) {
            setValidEmail(false); // Invalid email format
            return;
        }
        handleSubmit(e); // Valid email, proceed with form submission
    };

    return (
        <>
            <div className='flex justify-center items-center rounded-full bg-white md:p-2 '>
                <form onSubmit={handleSubmit} className='flex items-center justify-center'>
                    <div className='mx-2 ml-5 sm:ml-1 sm:mx-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                        </svg>
                    </div>
                    <input type="email" name="email" id="betaEmail" value={emailAddress} placeholder='Enter Your Email' onChange={(e) => {setEmailAddress(e.target.value); setValidEmail(true);}} className={`outline-none border-none px-2 py-1 ${!validEmail ? "border-red-500" : ""}`} />
                    <button type="button" onClick={handleButtonClick} className='px-4 py-2 m-1 md:px-5 md:py-3 md:m-0  text-white bg-gradient-to-br from-[#2272FF] from-50 to-[#0D03C3] to-[99%]  rounded-full hover:font-semibold'>
                        {
                            loading ?
                                <div role="status">
                                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>
                                : <p>Register</p>
                        }
                    </button>
                </form>
            </div>
        </>
    );
}

export default Email;
