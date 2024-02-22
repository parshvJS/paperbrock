
import { useContext, useEffect, useState } from "react"
import { getcurrentUser } from "../utils/user"
import { createContext } from "react"
import { useNavigate } from "react-router-dom"

export const INITIAL_USER = {
    plan:'',
    id:'',
    email : '',
    password:'',
    fullName:'',
    stream:''
}

export const INITIAL_CONTEXT = {
    user:INITIAL_USER,
    setUser : () =>{},
    isContextAuthanticated : ()=>{},
    setIsContextAuthanticated : ()=>{},
    isLoading : false,
    setIsLoading : async () => false,
}

const  authContext = createContext(INITIAL_CONTEXT)

const AuthProvider = ({children}) => {
    const [user,setUser] =useState(INITIAL_USER);
    const [isContextAuthanticated,setIsContextAuthanticated] = useState(false)
    const [isLoading,setIsLoading] = useState(false)
    

    const checkAuthUser = async () => {
        try {
            const currentUser = await getcurrentUser()
            if (!currentUser) {
             return false
            }
            else {
                setUser({
                    id: currentUser._id,
                    email: currentUser.email,
                    fullName: currentUser.fullName,
                    stream : currentUser.stream
                })
                setIsContextAuthanticated(true)
                return true
            }
            return false
        } catch (error) {
            console.log(error.message);
            throw Error(error.message)
            return false
            
        }
    }

    const navigate = useNavigate()
    useEffect(() => {

        const cookieFallback = localStorage.getItem("AccessToken");
        if (
            cookieFallback === "[]" ||
            cookieFallback === null ||
            cookieFallback === undefined
        ) {
            navigate("/user/log-in");
        }

        checkAuthUser();
    }, [])

    const value = {
        user,
        setUser,
        isLoading,
        isContextAuthanticated,
        setIsContextAuthanticated,
        checkAuthUser
    }

    return (

        <authContext.Provider value={value}>
            {children}
        </authContext.Provider>


    )
}

export default AuthProvider;
export const useUserContext = () => useContext(authContext)