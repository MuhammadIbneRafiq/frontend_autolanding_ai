import { useEffect, useState } from "react";

import { UserData } from "@/types/UserData";
import { jwtDecode } from "jwt-decode";
import { useLocation } from "react-router-dom";
import useUserSessionStore from "@/services/state/useUserSessionStore";

export const useAuth = () => {
    const setUser = useUserSessionStore((state) => state.setUser);
    // return true or false if user is authenticated
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const location = useLocation();

    const handleLogout = () => {
        localStorage.clear();
        setIsAuthenticated(false);
        setUser(undefined);
    };

    useEffect(() => {
        async function fetchUser() {
            setLoading(true);
            const accessToken = localStorage.getItem("accessToken");
            if (!accessToken) {
                console.log("Access Token doesn't exist");
                handleLogout();
                setLoading(false);
                return;
            }

            const decoded = jwtDecode(accessToken || "");

            if (!decoded.exp || decoded.exp * 1000 < Date.now()) {
                console.log("Access Token has expired");
                handleLogout();
                setLoading(false);
                return;
            }

            setUser((decoded as any).user_metadata as UserData);
            setIsAuthenticated(true);
            setLoading(false);
        }

        fetchUser();

        // TODO: Fix this later
        // // Set up an interval to fetch data every minute
        // const intervalId = setInterval(fetchUser, 60000); // 60000 ms = 1 minute

        // // Cleanup function to clear the interval when the component unmounts
        // // or when the pathname changes
        // return () => {
        //     clearInterval(intervalId);
        // };
    }, [location.pathname]);

    return { isAuthenticated, loading };
};
