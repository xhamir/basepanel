class Form {
  /**
   * Create a new Form instance.
   *
   * @param {object} data
   */
  constructor(data) {
    this.originalData = data
    Object.keys(this.originalData).forEach((key) => {
      this[key] = data[key]
    })
  }

  /**
   * Fetch all relevant data for the form.
   */
  data() {
    const data = {}
    Object.keys(this.originalData).forEach((key) => {
      data[key] = this[key]
    })
    return data
  }

  /**
   * Reset the form fields.
   */
  reset() {
    Object.keys(this.originalData).forEach((key) => {
      this[key] = ''
    })
  }
}

export default Form
