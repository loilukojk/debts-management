const base = 'debts';
export default class DebtsAPI {
    constructor (instance) {
      this.instance = instance
    }
  
    listAll () {
      return this.instance.get(`/${base}/`)
    }

    retrieve (id) {
      return this.instance.get(`/${base}/${id}/`)
    }

    create (data) {
      return this.instance.post(`/${base}/`, data)
    }

    update (id, data) {
      return this.instance.put(`/${base}/${id}/`, data)
    }

    delete (id) {
      return this.instance.delete(`/${base}/${id}/`)
    }
  }
  