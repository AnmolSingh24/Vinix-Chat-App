import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const userLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const login = async (username, password) => {

        const success = handleInputError({ username, password });
        const storedToken = document.cookie.split("=")[1];
        if (!success) return;

        setLoading(true)

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${storedToken}`
                },
                body: JSON.stringify({ username, password }),
            });

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