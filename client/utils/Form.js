class FormErrors {
  constructor () {
    this.errors = {}
  }

  get (field) {
    if (this.errors[field]) {
      return this.errors[field]
    }
  }

  has (field) {
    return this.errors.hasOwnProperty(field)
  }

  record (errors) {
    this.errors = errors
  }

  setError (field, message) {
    this.errors[field] = message
  }

  any () {
    return Object.keys(this.errros).length > 0
  }

  clear (field) {
    if (field) delete this.errors[field]
    else this.errors = {}
  }
}

export class Form {
  constructor (data) {
    this.originalData = data
    for (let field in data) {
      this[field] = data[field]
    }
    this.errors = new FormErrors()
  }
  reset () {
    for (let field in this.originalData) {
      this[field] = ''
    }
  }
  data () {
    let data = {}
    for (let property in this.originalData) {
      data[property] = this[property]
    }
    return data
  }
  formData () {
    const data = new window.FormData()

    for (let property in this.originalData) {
      data.append(property, this[property])
    }
    return data
  }
  submit (func) {
    return new Promise((resolve, reject) => {
      func(this.data())
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
