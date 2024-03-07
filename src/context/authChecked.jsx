
import { useContext, useEffect, useState } from "react"
import { getcurrentUser } from "../utils/user"
import { createContext } from "react"
import { useNavigate,useLocation } from "react-router-dom"

export const INITIAL_USER = {
    plan: '',
    id: '',
    email: '',
    password: '',
    fullName: '',
    stream: '',
    usage:[]
}

export const INITIAL_CONTEXT = {
    user: INITIAL_USER,
    setUser: () => { },
    isContextAuthanticated: () => { },
    setIsContextAuthanticated: () => { },
    isLoading: false,
    setIsLoading: false,
    checkAuthUser: async () => false,
    collapsedCon:false,
    setCollapsedCon:()=>{},
    
}

const authContext = createContext(INITIAL_CONTEXT)

const AuthProvider = ({ children }) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const cookieFallback = localStorage.getItem("AccessToken");
        if (pathname === "/" && !cookieFallback) {
            navigate("/");
        } else if (cookieFallback) {
            navigate('/home');
            checkAuthUser();
        } else {
            navigate("/user/log-in");
        }
    }, []);

    const [user, setUser] = useState(INITIAL_USER);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [collapsedCon, setCollapsedCon] = useState(true);

    const toggleSideBar = () => {
        setCollapsedCon(!collapsedCon);
    };

    const checkAuthUser = async () => {
        try {
            const currentUser = await getcurrentUser();
            if (currentUser?.statuscode === 504 ) {
                navigate("/user/log-in")
              }
            if (!currentUser) {
                setIsAuthenticated(false);
            } else {
                setUser({
                    ...currentUser,
                    usage: currentUser.usage_history // Assuming `usage` should be initialized with `usage_history`
                });
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error("Error checking auth user:", error.message);
            setIsAuthenticated(false);
        }
    };

    const value = {
        user,
        setUser,
        isLoading,
        setIsLoading,
        isAuthenticated,
        checkAuthUser,
        collapsedCon,
        toggleSideBar
    };

    return (
        <authContext.Provider value={value}>
            {children}
        </authContext.Provider>
    );
};


export default AuthProvider;
export const useUserContext = () => useContext(authContext)