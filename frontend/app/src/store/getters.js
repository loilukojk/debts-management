export default {
  loggedIn(state) {
    if (state.token !== null) {
      let numExpirationTime = Number(localStorage.getItem("exp"))
      let numCurrentDateTime = Number(Math.floor(Date.now() / 1000))
      if (numCurrentDateTime <= numExpirationTime) {
        return true;
      }
    }
    return false;
  }
}
