// import axios from "axios";

export default {
  retrieveToken(context, {username, password}) {
    console.log(username);
    console.log(password);
    return new Promise((resolve) => {
      context.state.isLoggedIn = true;
      resolve(true);
    });
  }
};
