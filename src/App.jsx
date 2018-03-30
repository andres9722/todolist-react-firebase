import React, { Component, Fragment } from 'react'
import { Route, BrowserRouter as Router, Link, Redirect, Switch } from 'react-router-dom'

import firebase from 'firebase'
import { init } from './config/config.jsx'
import { googleSignOut } from './config/Auth.jsx'

import Error404 from './components/Pages/Error404.jsx'
import DashboardTodo from './components/Pages/Protected/Dashboard.jsx'
import Login from './components/Pages/Login.jsx'

import './index.scss'

const PrivateRoute = ({ component: Component, authed, rest }) => (
  <Route
    {...rest}
    render={
      props => authed === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    }
  />
)

const PublicRoute = ({component: Component, authed, rest}) => (
  <Route
    {...rest}
    render={
      props => authed === false
        ? <Component {...props} />
        : <Redirect to='/home' />
    }
  />
)

export default class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      authed: false,
      loading: true
    }
  }

  componentDidMount () {
    init()
    this.removeListener = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authed: true,
          loading: false
        })
      } else {
        this.setState({
          loading: false
        })
      }
    })
  }

  componentWillUnmount () {
    this.removeListener()
  }

  render () {
    return this.state.loading === true
    ? (<Fragment>
      <h1>Cargando...</h1>
    </Fragment>)
    : (
      <Router>
        <Fragment>
          {
            (this.state.authed)
              ? <Fragment>
                <li className='menu__item'><Link to='/' onClick={() => {
                  googleSignOut()
                  this.setState({
                    authed: false
                  })
                }} className='menu__logout' > Salir </Link> </li>
              </Fragment>
              : <Fragment />
          }
          <main className='principal'>
            <Switch>
              <PublicRoute authed={this.state.authed} exact path='/' component={Login} />
              <PrivateRoute authed={this.state.authed} path='/home' component={DashboardTodo} />
              <Route component={Error404} />
            </Switch>
          </main>
        </Fragment>
      </Router>
    )
  }
}
