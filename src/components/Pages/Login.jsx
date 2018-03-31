import React, { Component } from 'react'

import { googleSignIn } from './../../config/Auth.jsx'

import './Login.scss'

export default class Login extends Component {
  constructor (props) {
    super(props)

    this.state = {
      loginMessage: null
    }

    this.handleOnSubmit = this.handleOnSubmit.bind(this)
  }

  handleOnSubmit (e) {
    e.preventDefault()
    googleSignIn()
  }

  render () {
    return (
      <div className='main'>
        <div className='main__container'>
          <h1 className='main__container__title'>NOTAS</h1>
          <img src='https://image.flaticon.com/icons/svg/683/683508.svg' alt='logo' />
          <form action='' onSubmit={this.handleOnSubmit} className='main__container__form' >
            <input type='submit' value='Iniciar sesión' className='main__container__form__button' />
          </form>
        </div>
      </div>
    )
  }
}
