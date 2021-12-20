const base = 'users';
export default class UsersAPI {
    constructor (instance) {
      this.instance = instance
    }
  
    listAll () {
      return this.instance.get(`/${base}/`)
    }
}
  