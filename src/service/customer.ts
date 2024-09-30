import CRUD from './CRUD'
const url = '/customer'

class Customer extends CRUD {
  constructor() {
    super(url)
  }
}

export const CustomerApi = new Customer()
