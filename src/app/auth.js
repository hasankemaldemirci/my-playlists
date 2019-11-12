import hash from "../utils/hash";
import history from "../utils/history";

const isAuthenticated = () => {
  const token = hash.access_token || localStorage.getItem("token");
  if (token) {
    localStorage.setItem("token", token);
    history.replace("/");
    return token;
  } else {
    history.replace("/login");
  }
};

export default isAuthenticated();
