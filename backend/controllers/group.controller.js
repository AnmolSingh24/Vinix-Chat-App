import Conversation from "../models/conversation.model.js";
import Group from "../models/group.model.js"
import { getReceiverSocketId, io } from "../socket/socket.js";

export const createGroup = async (req, res) => {
    console.log(req.body);
    try {
        const { groupName, groupDescription, members, profilePicture } = req.body;

        if (!groupName || !groupDescription || !members || members.length === 0 || profilePicture) {
            return res.status(400).json({ error: 'Invalid input data' });
        }

        const conversation = await Conversation.create({
            participants: members,
        });

        const newGroup = new Group({
            groupName,
            groupDescription,
            members,
            profilePicture,
            conversation: conversation._id
        });
        await newGroup.save();

        members.forEach(e => {
            const receiverSocketId = getReceiverSocketId(e);
            if (receiverSocketId) {
                //io.to(socketId).emit() used to show events to specific clients
                io.to(receiverSocketId).emit("newGroup", newGroup);
            }
        });
        return res.status(201).json({ message: 'Group created successfully', group: newGroup });

    } catch (error) {
        console.log("Error in createGroup controller: ", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const getGroups = async (req, res) => {
    try {
        const senderId = req.user._id;

        const groups = await Group.find({
            members: { $in: [senderId] }
        }).populate("members");

        if (!groups) return res.status(200).json([]);

        res.status(200).json(groups);

    } catch (error) {
        console.log("Error in getGroups controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getGroup = async (req, res) => {
    try {
        const { groupId } = req.params;
        const senderId = req.user._id;

        const group = await Group.findOne({
            members: { $all: [senderId, groupId] },
        }).populate("members");

        if (!group) return res.status(200).json([]);

        const groups = group.members;

        res.status(200).json(groups);

    } catch (error) {
        console.log("Error in getGroup controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};