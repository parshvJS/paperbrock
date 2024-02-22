import { api_url } from "../constants";

export async function getcurrentUser() {
    try {
        const accessToken = localStorage.getItem("AccessToken");
        const apiData = await fetch(`${api_url}/api/v1/users/user`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        
        if (!apiData.ok) {
            // Handle non-successful response (e.g., authentication error)
            throw new Error("Failed to fetch user data");
        }

        const response = await apiData.json();
        const userData = response.data.user;
        
        // If user data is not found, return null
        if (!userData) return null;

        return userData;
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
}
