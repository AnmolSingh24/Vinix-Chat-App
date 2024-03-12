import User from "../models/user.models.js";

export const getUsersForSidebar = async (req, res) => {
    try {

        console.log("Hello");
        // const loggedInUserId = req.user.username;

        const filteredUsers = await User.find({})
        console.log(filteredUsers);

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in getUsersForSidebar controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}