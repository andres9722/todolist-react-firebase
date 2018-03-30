import React, { Component } from 'react'

import './TodoItem.scss'

export default class TodoList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      active: false
    }

    this.removeTodo = this.removeTodo.bind(this)
    this.handleOnActive = this.handleOnActive.bind(this)
  }

  removeTodo (id) {
    this.props.removeTodo(id)
  }

  handleOnActive () {
    this.setState(prevState => {
      return {
        active: !prevState.active
      }
    })
  }

  render () {
    return (
      <li className={this.state.active ? 'todo__item todo__item--active' : 'todo__item'} onClick={this.handleOnActive} >
        <button className='todo__item--remove' onClick={(e) => this.removeTodo(this.props.id)} > Eliminar </button> {this.props.todo.text}
      </li>
    )
  }
}
