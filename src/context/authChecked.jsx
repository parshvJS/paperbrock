
import { useContext, useEffect, useState } from "react"
import { getcurrentUser } from "../utils/user"
import { createContext } from "react"
import { useNavigate } from "react-router-dom"

export const INITIAL_USER = {
    plan: '',
    id: '',
    email: '',
    password: '',
    fullName: '',
    stream: ''
}

export const INITIAL_CONTEXT = {
    user: INITIAL_USER,
    setUser: () => { },
    isContextAuthanticated: () => { },
    setIsContextAuthanticated: () => { },
    isLoading: false,
    setIsLoading: false,
    checkAuthUser: async () => false,

}

const authContext = createContext(INITIAL_CONTEXT)

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const cookieFallback = localStorage.getItem("AccessToken");

        if (!cookieFallback) {
            navigate("/user/log-in");
        } else {
            navigate('/dashboard')
            checkAuthUser();
        }
    }, []);

    const [user, setUser] = useState(INITIAL_USER);
    const [isContextAuthenticated, setIsContextAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const checkAuthUser = async () => {
        try {
            const currentUser = await getcurrentUser();

            if (!currentUser) {
                setIsContextAuthenticated(false);
                return;
            } else {
                setUser(prevUser => ({
                    ...prevUser,
                    id: currentUser._id,
                    email: currentUser.email,
                    fullName: currentUser.fullName,
                    stream: currentUser.stream
                }));
                setIsContextAuthenticated(true);
            }
        } catch (error) {
            console.error("Error checking auth user:", error.message);
            setIsContextAuthenticated(false);
        }
    };

    const value = {
        user,
        setUser,
        isLoading,
        isContextAuthenticated,
        setIsContextAuthenticated,
        checkAuthUser
    };

    return (
        <authContext.Provider value={value}>
            {children}
        </authContext.Provider>
    );
};


export default AuthProvider;
export const useUserContext = () => useContext(authContext)