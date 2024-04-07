import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const { userSendFile } = req.body;
        const { message, sendAudioFile, conversationId } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;
        let conversation;
        if (conversationId) {
            conversation = await Conversation.findOne({
                _id: conversationId
            })
        } else {
            conversation = await Conversation.findOne({
                participants: { $all: [senderId, receiverId] },
            })
        }

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
            userSendFile,
            userSendVoiceNotes: sendAudioFile,
        });

        conversation.messages.push(newMessage._id);

        await Promise.all([conversation.save(), newMessage.save()]);

        // SOCKET IO FUNCTIONALITY WILL GO HERE

        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            //io.to(socketId).emit() used to show events to specific clients
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        return res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getMessages = async (req, res) => {
    try {
        const { id, conversationId } = req.params;
        const senderId = req.user._id;

        let conversation;
        if (conversationId !== "undefined") {
            conversation = await Conversation.findOne({
                _id: conversationId,
            }).populate("messages");
        } else {
            conversation = await Conversation.findOne({
                participants: { $all: [senderId, id] },
            }).populate("messages");
        }

        if (!conversation) return res.status(200).json([]);

        const messages = conversation.messages;

        res.status(200).json(messages);

    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};