import axios from "axios";
import jwt from "jsonwebtoken";

export default {
  getAPIKey(context) {
    return new Promise((resolve) => {
      let serverDomain = context.state.serverDomain;
      let bucket = "crm_app";
      let url = serverDomain + "/api/core/v1/device/detail/" + bucket;
      let config = {
        headers: {
          userid: "user1",
        },
      };
      axios
        .get(url, config)
        .then((res) => {
          let respData = res.data;
          let apiKey = respData.data_item.apiKey;
          context.state.auth.Authorization = "Bearer " + apiKey;
          resolve("done");
        })
        .catch(() => {
          resolve("done");
        });
    })
  },
  startReLogin(context) {
    context.state.token = null;
    localStorage.clear();
    this.$router.push({ name: "Login" });
  },
  destroyToken(context) {
    // axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
    if (context.getters.loggedIn) {
      return new Promise((resolve) => {
        localStorage.removeItem("access_token");
        context.commit("destroyToken");
        let response = "oke";
        resolve(response);
      });
    }
  },
  retrieveToken(context, credentials) {
    return new Promise((resolve, reject) => {
      // authen by calling api
      let serverDomain = context.state.serverDomain;
      let authenBucket = context.state.authenBucket;
      let loginAPI = serverDomain + "/api/core/v1/user/login/" + authenBucket;
      let config = {
        headers: context.getters.getAuthConfig,
      };
      axios
        .post(
          loginAPI,
          {
            username: credentials.username,
            password: credentials.password,
          },
          config
        )
        .then((response) => {
          if (response.data.token != undefined) {
            const token = response.data.token;
            let secretKey = "secret";
            jwt.verify(token, secretKey, function(err, decoded) {
              if (err != null) {
                console.log(err);
                reject(err);
              }
              if (decoded.roles == "crm_admin") {
                let data = {
                  token: context.state.auth.Authorization,
                  username: decoded.information.username,
                  roles: decoded.roles,
                  exp: decoded.exp,
                  userID: decoded.information.user_id,
                  fullname:
                    decoded.information.last_name +
                    " " +
                    decoded.information.first_name,
                  phone: decoded.information.phone_number,
                };
                localStorage.setItem("access_token", data.token);
                localStorage.setItem("username", data.username);
                localStorage.setItem("userID", data.userID);
                localStorage.setItem("fullname", data.fullname);
                localStorage.setItem("phone", data.phone);
                localStorage.setItem("exp", data.exp);
                localStorage.setItem("roles", data.roles);
                context.commit("retrieveToken", data.token);
                resolve(data);
              } else {
                reject("roles is not enough");
              }
            });
          } else {
            reject(response.data.message);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  clearUserInfo(context) {
    context.commit("clearUserInfo");
  }
};
