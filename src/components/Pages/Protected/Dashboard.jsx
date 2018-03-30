import React, { Component } from 'react'

import TodoList from './../../TodoList/TodoList.jsx'

export default class DashboardTodo extends Component {
  render () {
    return (
      <article>
        <TodoList />
      </article>
    )
  }
}
