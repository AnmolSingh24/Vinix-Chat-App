import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const userLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const login = async (username, password) => {

        const success = handleInputError({ username, password });
        const loginToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWU4MTA4NGE4OTVjMjljZGIwMWYyYmIiLCJpYXQiOjE3MTAyNjExOTcsImV4cCI6MTcyMDYyOTE5N30._cyYdUTtZFCjtQYxs3Une1b8bNF2rD8lPTSWjONl5_k";
        if (!success) return;

        setLoading(true)

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${loginToken}`
                },
                body: JSON.stringify({ username, password }),
            });

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`)
            }

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.setItem("chat-user", JSON.stringify(data));
            setAuthUser(data);

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false)
        }
    }
    return { loading, login };
}

export default userLogin;


function handleInputError({ username, password }) {
    if (!username || !password) {
        toast.error("Please fill all the fields")
        return false;
    }
    return true;
}