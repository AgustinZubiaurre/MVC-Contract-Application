/**
 * @class Model
 *
 * Manages the data of the application.
 */
 class Model {
    constructor() {
      this.contracts = JSON.parse(localStorage.getItem('contracts')) || []
    }
  
    bindcontractListChanged(callback) {
      this.onContractListChange = callback
    }
  
    _commit(contracts) {
      this.onContractListChange(contracts)
      localStorage.setItem('contracts', JSON.stringify(contracts))
    }
  
    addContract(contractText) {
      const contract = {
        id: this.contracts.length > 0 ? this.contracts[this.contracts.length - 1].id + 1 : 1,
        text: contractText,
        complete: false,
      }
  
      this.contracts.push(contract)
  
      this._commit(this.contracts)
    }
  
    editContract(id, updatedText) {
      this.contracts = this.contracts.map(contract =>
        contract.id === id ? { id: contract.id, text: updatedText, complete: contract.complete } : contract
      )
  
      this._commit(this.contracts)
    }
  
    deleteContract(id) {
      this.contracts = this.contracts.filter(contract => contract.id !== id)
  
      this._commit(this.contracts)
    }
  
    toggleContract(id) {
      this.contracts = this.contracts.map(contract =>
        contract.id === id ? { id: contract.id, text: contract.text, complete: !contract.complete } : contract
      )
  
      this._commit(this.contracts)
    }
  }
  
  /**
   * @class View
   *
   * Visual representation of the model.
   */
  class View {
    constructor() {
      this.app = this.getElement('#root')
      this.form = this.createElement('form')
      this.input = this.createElement('input')
      this.input.type = 'text'
      this.input.placeholder = 'Nuevo contrato'
      this.input.name = 'contract'
      this.submitButton = this.createElement('button')
      this.submitButton.textContent = 'Agregar'
      this.form.append(this.input, this.submitButton)
      this.title = this.createElement('h1')
      this.title.textContent = 'Contratos'
      this.contractList = this.createElement('ul', 'contract-list')

      this.app.append(this.title, this.form, this.contractList)

      this._temporarycontractText = ''
      this._initLocalListeners()
    }
  
    get _contractText() {
      return this.input.value
    }
  
    _resetInput() {
      this.input.value = ''
    }
  
    createElement(tag, className) {
      const element = document.createElement(tag)
  
      if (className) element.classList.add(className)
  
      return element
    }
  
    getElement(selector) {
      const element = document.querySelector(selector)
  
      return element
    }
  
    displayContracts(contracts) {
      // Delete all nodes
      while (this.contractList.firstChild) {
        this.contractList.removeChild(this.contractList.firstChild)
      }
  
      // Show default message
      if (contracts.length === 0) {
        const p = this.createElement('p')
        p.textContent = 'Todavia no hay contratos. Agregue algunos!'
        this.contractList.append(p)
      } else {
        // Create nodes
        contracts.forEach(contract => {
          const li = this.createElement('li')
          li.id = contract.id
  
          const checkbox = this.createElement('input')
          checkbox.type = 'checkbox'
          checkbox.checked = contract.complete
  
          const span = this.createElement('span')
          span.contentEditable = true
          span.classList.add('editable')
  
          if (contract.complete) {
            const strike = this.createElement('s')
            strike.textContent = contract.text
            span.append(strike)
          } else {
            span.textContent = contract.text
          }
  
          const deleteButton = this.createElement('button', 'delete')
          deleteButton.textContent = 'Delete'
          li.append(checkbox, span, deleteButton)
  
          // Append nodes
          this.contractList.append(li)
        })
      }
  
      // Debugging
      console.log(contracts)
    }
  
    _initLocalListeners() {
      this.contractList.addEventListener('input', event => {
        if (event.target.className === 'editable') {
          this._temporarycontractText = event.target.innerText
        }
      })
    }
  
    bindaddContract(handler) {
      this.form.addEventListener('submit', event => {
        event.preventDefault()
  
        if (this._contractText) {
          handler(this._contractText)
          this._resetInput()
        }
      })
    }
  
    binddeleteContract(handler) {
      this.contractList.addEventListener('click', event => {
        if (event.target.className === 'delete') {
          const id = parseInt(event.target.parentElement.id)
  
          handler(id)
        }
      })
    }
  
    bindeditContract(handler) {
      this.contractList.addEventListener('focusout', event => {
        if (this._temporarycontractText) {
          const id = parseInt(event.target.parentElement.id)
  
          handler(id, this._temporarycontractText)
          this._temporarycontractText = ''
        }
      })
    }
  
    bindtoggleContract(handler) {
      this.contractList.addEventListener('change', event => {
        if (event.target.type === 'checkbox') {
          const id = parseInt(event.target.parentElement.id)
  
          handler(id)
        }
      })
    }
  }
  
  /**
   * @class Controller
   *
   * Links the user input and the view output.
   *
   * @param model
   * @param view
   */
  class Controller {
    constructor(model, view) {
      this.model = model
      this.view = view
  
      // Explicit this binding
      this.model.bindcontractListChanged(this.onContractListChange)
      this.view.bindaddContract(this.handleaddContract)
      this.view.bindeditContract(this.handleeditContract)
      this.view.binddeleteContract(this.handledeleteContract)
      this.view.bindtoggleContract(this.handletoggleContract)
  
      // Display initial contracts
      this.onContractListChange(this.model.contracts)
    }
  
    onContractListChange = contracts => {
      this.view.displayContracts(contracts)
    }
  
    handleaddContract = contractText => {
      this.model.addContract(contractText)
    }
  
    handleeditContract = (id, contractText) => {
      this.model.editContract(id, contractText)
    }
  
    handledeleteContract = id => {
      this.model.deleteContract(id)
    }
  
    handletoggleContract = id => {
      this.model.toggleContract(id)
    }
  }
  
  const app = new Controller(new Model(), new View())