import Group from "../models/group.model.js"
import { getReceiverSocketId, io } from "../socket/socket.js";

export const getGroupsForSidebar = async (req, res) => {
    try {

        const loggedInGroupId = req.user._id;

        const filteredUsers = await Group.find({ _id: { $ne: loggedInGroupId } }).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in getGroupsForSidebar controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const createGroup = async (req, res) => {
    try {
        const { groupName, groupDescription, members, profilePicture } = req.body;

        if (!groupName || !groupDescription || !members || members.length === 0 || profilePicture) {
            return res.status(400).json({ error: 'Invalid input data' });
        }

        const newGroup = new Group({
            groupName,
            groupDescription,
            members,
            profilePicture,
        });

        await newGroup.save();
        
        members.forEach(e => {
            const receiverSocketId = getReceiverSocketId(e);
            if (receiverSocketId) {
                //io.to(socketId).emit() used to show events to specific clients
                io.to(receiverSocketId).emit("newGroup", newGroup.groupname);
            }
        });
        return res.status(201).json({ message: 'Group created successfully', group: newGroup });
        //return res.status(200).json(newGroup);

    } catch (error) {
        console.log("Error in createGroup controller: ", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
}