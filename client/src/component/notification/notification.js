import { useEffect } from "react";
import addNotification from "react-push-notification";
import logo from "../../assets/Logo.png";

export const Notification = (props) => {
  const { id, subject, sender } = props?.message;

  useEffect(() => {
    const buttonClick = () => {
      addNotification({
        title: `New memo ${id}`,
        subtitle: sender,
        message: subject,
        theme: "light",
        icon: logo,
        duration: 5000,
        native: true,
      });
    };
    buttonClick()
  }, [id,sender,subject]);

  return <></>;
};
