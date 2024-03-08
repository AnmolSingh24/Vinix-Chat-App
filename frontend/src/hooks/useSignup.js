import toast from "react-hot-toast";
import { useState } from "react";
import { AuthContext } from "../context/AuthContext";

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = AuthContext;

    const signup = async ({ fullname, username, password, confirmPassword, gender }) => {
        const success = handleInputError({ fullname, username, password, confirmPassword, gender });
        const signupToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWUxY2ZhZjQwOGIwZjFiZDJlMmE2MDQiLCJpYXQiOjE3MDkyOTc1ODMsImV4cCI6MTcxOTY2NTU4M30.Jw5_CRDsTk9hHA9whD7joidLGHl5PumzrsYPYMwcnSE";
        
        if (!success) return;
        setLoading(true);

        try {
            const res = await fetch('/api/auth/signup', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${signupToken}`
                },
                body: JSON.stringify({ fullname, username, password, confirmPassword, gender }),
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
            setLoading(false);
        }
    }

    return { loading, signup };
}

export default useSignup;

function handleInputError({ fullname, username, password, confirmPassword, gender }) {
    if (!fullname || !username || !password || !confirmPassword || !gender) {
        toast.error("Please fill all the fields")
        return false;
    }

    if (password !== confirmPassword) {
        toast.error("Password didn't match")
        return false;
    }

    if (password.length < 6) {
        toast.error("Password must be atleast 6 characters")
        return false;
    }

    return true;
}