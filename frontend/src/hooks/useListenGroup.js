import { useEffect, useState } from "react";
import { useSocketContext } from "../context/SocketContext"
import notificationSound from "../assets/sounds/notification.mp3";

const useListenGroup = () => {
    const { socket } = useSocketContext();
    const [ newGroup, setNewGroup ] = useState();

    useEffect(() => {
        if (!socket) return;
        socket.on("newGroup", (newGroup) => {
            const sound = new Audio(notificationSound);
            sound.play();
            setNewGroup(newGroup);
        });
        return () => socket.off("newGroup")

    }, [socket, setNewGroup])
    return {newGroup, setNewGroup};

}

export default useListenGroup