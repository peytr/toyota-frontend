import React, { Component } from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import Navbar from './components/layout/Navbar'
import Login from './components/auth/Login'
import Loader from './components/layout/Loader'
import Error404 from './components/errors/Error404'
import Error403 from './components/errors/Error403'
import axios from './api/init'
import adminRoutes from './routes/adminRoutes'
import userRoutes from './routes/userRoutes'

class App extends Component {
  state = {
    loaded: false,
    administrator: false,
    loggedIn: false
  }

  componentDidMount() {
    axios.get('auth')
     .then((response) => {
       this.setState({
        loggedIn: response.data.login,
        administrator: response.data.administrator, 
        loaded: true})
     })
    .catch((error)=>{
       console.log(error);
    })
  }
  
  updateLogin = (data) => {
    console.log(data)
    this.setState({
      loggedIn: true,
      administrator: data.administrator,
      loaded: true
  })
  }

  updateLogout = () => {
    axios.get('/users/logout')
    .then(() => {
      this.setState({
        loggedIn: false,
        administrator: false,
        loaded: true
    })
    })
  }
  
  render() {
    const adminRouteComponents = adminRoutes.map(({path, component}, key) => <Route exact path={path} component={component} key={key} />)
    const forbiddenRouteComponents = adminRoutes.map(({path, component}, key) => <Route exact path={path} component={Error403} key={key} />)
    const userRouteComponents = userRoutes.map(({path, component}, key) => <Route exact path={path} component={component} key={key} />)
    
    if (!this.state.loaded) { return <Loader /> }
    if (!this.state.loggedIn) { return <Login updateLogin={this.updateLogin} /> }
    return(
      <Router>
      <div>
        <Navbar administrator={this.state.administrator} updateLogout={this.updateLogout}/>
        <div className="container">
          <Switch>
            {this.state.administrator ? adminRouteComponents : forbiddenRouteComponents}
            {userRouteComponents}
            <Route component={Error404}/>
          </Switch>
        </div>
      </div>
      </Router>
    )
  }
}

export default App;
