import { feathersApp } from "../store/index";
import useRecoilValue from "recoil";
import { useHistory } from "react-router-dom";

const feathersAppInstance = useRecoilValue(feathersApp);
let history = useHistory();

const login = async (credentials) => {
  try {
    if (!credentials) {
      // Try to authenticate using an existing token
      await feathersAppInstance.reAuthenticate();
    } else {
      // Otherwise log in with the `local` strategy using the credentials we got
      await feathersAppInstance.authenticate({
        strategy: "local",
        ...credentials,
      });
    }

    // If successful,  Returns the authenticated user
    return await feathersAppInstance.get("authentication");
  } catch (error) {
    // If we got an error, show the login page
    history.push("/login");
  }
};

const logout = () => {
  feathersAppInstance.logout();
};

const getCurrentUser = () => {
  return feathersAppInstance.get("authentication");
};

const isAdmin = () => {
  return feathersAppInstance.get("authentication").isAdmin;
};

export default {
  login,
  logout,
  getCurrentUser,
  isAdmin,
};
