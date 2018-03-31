import React, { Component } from 'react'

import TodoForm from './../TodoForm/TodoForm.jsx'
import TodoItem from './../TodoItem/TodoItem.jsx'
import firebase from 'firebase'

import './TodoList.scss'

export default class TodoList extends Component {
  constructor (props) {
    super(props)
    this.user = firebase.auth().currentUser
    this.databaseRef = firebase.database().ref().child('todos')

    this.state = {
      todos: []
    }

    this.addTodo = this.addTodo.bind(this)
    this.removeTodo = this.removeTodo.bind(this)
  }

  addTodo (todoText) {
    this.databaseRef.push({
      todoText: todoText,
      uid: this.user.uid,
      displayName: this.user.displayName,
      avatar: this.user.photoURL
    })
  }

  componentDidMount () {
    let prevState = this.state.todos

    this.databaseRef.on('child_added', data => {
      if (data.val().uid === this.user.uid) {
        prevState.push({ id: data.key, text: data.val().todoText })
      }

      this.setState({
        todos: prevState
      })
    })

    this.databaseRef.on('child_removed', data => {
      if (data.val().uid === this.user.uid) {
        prevState.forEach((todo, index) => {
          if (prevState[index].id === data.key) {
            prevState.splice(index, 1)
          }
        })
      }

      this.setState({
        todos: prevState
      })
    })
  }

  removeTodo (id) {
    this.databaseRef.child(id).remove()
  }

  render () {
    return (
      <div className='todo'>
        <h1 className='todo__title'>LISTA DE TAREAS</h1>
        <div className='todo__user'>
          <p className='todo__user-name' >{this.user.displayName}</p>
          <img className='todo__user-photo' src={this.user.photoURL} alt='Foto de perfil' />
        </div>
        <TodoForm todoText='' addTodo={this.addTodo} />
        <ul className='todo__list' >
          {
            this.state.todos.length
            ? this.state.todos.map(todo => (
              <TodoItem todo={todo} key={todo.id} id={todo.id} removeTodo={this.removeTodo} />
            ))
            : <p>No hay tareas agregadas!</p>
          }
        </ul>
      </div>
    )
  }
}
