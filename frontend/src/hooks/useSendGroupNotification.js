import { useSocketContext } from "../context/SocketContext"
import notificationSound from "../assets/sounds/notification.mp3";
import { useEffect, useState } from "react";

const useSendGroupNotification = (userId) => {
    const { socket } = useSocketContext();
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        if (!socket) return;

        const handleNotification = (notification) => {
            const sound = new Audio(notificationSound);
            sound.play();
            setNotifications((prevNotifications) => [...prevNotifications, notification]);
        };

        socket.on("notification", handleNotification);

        return () => {
            socket.off("notification", handleNotification);
        };
    }, [socket, userId]);

    return notifications;
};

export default useSendGroupNotification;