import React, { Component } from 'react'

import './TodoForm.scss'

export default class TodoForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      value: ''
    }

    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnAdd = this.handleOnAdd.bind(this)
  }

  handleOnChange (e) {
    this.setState({
      value: e.target.value
    })
  }

  handleOnAdd (todo) {
    if (todo.length > 0) {
      this.props.addTodo(todo)
      this.setState({
        value: ''
      })
    }
  }

  render () {
    return (
      <div className='todo__form'>
        <input type='text' value={this.state.value} className='todo__input' placeholder='Agregar tarea' maxLength='28' onChange={this.handleOnChange} autoFocus />
        <button className='todo__button' onClick={() => this.handleOnAdd(this.state.value)} > Agregar </button>
      </div>
    )
  }
}
