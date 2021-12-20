export default {
  retrieveToken(state, token) {
    state.token = token;
  },
  destroyToken(state) {
    state.token = null;
  },
  clearUserInfo() {
    localStorage.clear();
  }
};