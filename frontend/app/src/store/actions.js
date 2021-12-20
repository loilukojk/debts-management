import axios from "axios";

export default {
  async retrieveToken(context, {username, password}) {
    let api = "http://localhost:8080/api/v1/auth/login";
    let data = {
      email: username,
      password: password,
    };
    let res = await axios.post(api, data);
    if (res) {
      context.state.isLoggedIn = true;
    } else {
      context.state.isLoggedIn = false;
    }
  }
};
