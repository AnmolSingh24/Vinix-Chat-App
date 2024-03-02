import bcrypt from "bcryptjs"
import User from "../models/user.models.js";
import generateTokenAndSetCookie from "../utils/generateTokens.js";

export const signup = async (req, res) => {
    try {
        const { fullname, username, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Password didn't match" });
        }

        const user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({ error: "Username already exists" });
        }

        //HASH PASSWORD HERE
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        

        // https://avatar-placeholder.iran.liara.run/

        const boyProfilPic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilPic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullname,
            username,
            password: hashedPassword,
            gender,
            profilePicture: gender === "male" ? boyProfilPic : girlProfilPic
        });

        if (newUser) {
            //Generate JWT Token here
            generateTokenAndSetCookie(newUser._id, res)
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
                profilePicture: newUser.profilePicture
            });
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }

    } catch (err) {
        console.log("Error in sign up controller", err.message)
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" })
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: newUser._id,
            fullname: newUser.fullname,
            username: newUser.username,
            profilePicture: newUser.profilePicture
        });

    } catch (err) {
        console.log("Error in login controller", err.message)
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0});
        res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
        console.log("Error in logout controller", err.message)
        return res.status(500).json({ err: "Internal Server Error" });
    }
}