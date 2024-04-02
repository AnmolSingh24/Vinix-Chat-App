import { useEffect, useState } from "react";
import { useSocketContext } from "../context/SocketContext"
import notificationSound from "../assets/sounds/notification.mp3";

const useListenGroup = () => {
    const { socket } = useSocketContext();
    const [ newGroup, setNewGroup ] = useState();

    useEffect(() => {
        socket?.on("newGroup", (newGroup) => {
            const sound = new Audio(notificationSound);
            sound.play();
            setNewGroup(newGroup);
        });
        return () => socket?.off("newGroup")

    }, [socket, setNewGroup])
    return newGroup;

}

export default useListenGroup