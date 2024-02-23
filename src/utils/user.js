import { api_url } from "../constants";

 async function getcurrentUser() {
    try {
        // Make a request to the backend endpoint responsible for retrieving user data
        const accessToken = localStorage.getItem("AccessToken");
        const response = await fetch(`${api_url}/api/v1/users/user`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        // Check if the response is successful
        if (!response.ok) {
            // Handle non-successful response (e.g., authentication error)
            throw new Error("Failed to fetch user data");
        }

        // Parse the response JSON
        const userData = await response.json();

        // If user data is not found, return null
        if (!userData) return null;

        // Return the user data
        return userData.data.user;
    } catch (error) {
        // Handle errors
        console.error("Error fetching user data:", error);
        return null;
    }
}
export {
    getcurrentUser
}