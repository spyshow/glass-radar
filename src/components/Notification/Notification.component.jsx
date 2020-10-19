import { notification } from "antd";

//notification
const openNotification = (type, title, desc) => {
  notification[type]({
    message: title,
    description: desc,
    duration: 3,
  });
};

export default openNotification;
