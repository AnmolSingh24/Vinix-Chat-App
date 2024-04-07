import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
    groupName: {
        type: String,
        required: true
    },
    groupDescription: {
        type: String,
        required: true,
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    profilePicture: {
        type: String,
        size: String,
        default: ""
    },
    conversation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation"
    }
}, { timestamps: true });

const Group = mongoose.model("Group", groupSchema);
export default Group;