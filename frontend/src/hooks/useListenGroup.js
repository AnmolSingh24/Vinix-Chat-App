import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext"
import notificationSound from "../assets/sounds/notification.mp3";
import useGetGroups from "./useGetGroups";

const useListenGroup = () => {
    const { socket } = useSocketContext();
   
    const { groups, setGroups } = useGetGroups();

    useEffect(() => {
        if (!socket) return;

        socket.on("newGroup", (newGroup) => {
            const sound = new Audio(notificationSound);
            sound.play();
            setGroups([newGroup, ...groups]);
        });
        return () => socket.off("newGroup")

    }, [socket, setGroups]);
}

export default useListenGroup