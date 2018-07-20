import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import Navbar from './components/layout/Navbar'
import NavbarAdmin from './components/layout/NavbarAdmin'
import NavbarUser from './components/layout/NavbarUser'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import MySop from './components/sop/MySop'
import MyProfile from './components/user/MyProfile'
import ManageSop from './components/sop/ManageSop'
import ManageUsers from './components/user/ManageUsers'
import ViewUser from './components/user/ViewUser'
import AdminViewUser from './components/user/AdminViewUser'



class App extends Component {

  state = {
    admin: false,
    loggedIn: false
  }

  updateLogin = (data) => {
    this.setState({
      loggedIn: true,
      admin: data.admin
    })
  }
  
  render() {
    return(<AdminViewUser/>)
    // return(<ViewUser/>)
    // return(<MyProfile/>)

  }
  

//   render() {
//     const isAdmin = this.state.admin
//     const isLoggedIn = this.state.loggedIn
//     // if(isLoggedIn){
      
//     // }
//     if(isAdmin && isLoggedIn){
//     return (
//       <Router>
//         <div className="App">
        
//           <NavbarAdmin admin={this.state.admin} isLoggedIn={this.state.loggedIn}/>
//           <Route exact path="/" render={() => <MySop updateLogin={this.updateLogin} />}/>
           
//           <Route exact path="/register" component={ Register } />
//           <Route exact path="/myprofile" component={ MyProfile } />
//           <Route exact path="/managesop" component={ ManageSop } />
//           <Route exact path="/manageusers" component={ ManageUsers } />
//           <Route exact path={"/user/:id"} component={ ViewUser } />
      
    
//         </div>
//       </Router>
//     );
//   }
//   if(isLoggedIn && !isAdmin){
//     return (
//       <Router>
//         <div className="App">
        
//           <NavbarUser admin={this.state.admin} isLoggedIn={this.state.loggedIn}/>
//           <Route exact path="/" render={() => <MySop updateLogin={this.updateLogin} />}/>
           
//           <Route exact path="/register" component={ Register } />
//           <Route exact path="/myprofile" component={ MyProfile } />
          
//         </div>
//       </Router>
//     )}
//     else {
//       return (
//         <Router>
//           <div className="App">
          
//             <Navbar admin={this.state.admin} isLoggedIn={this.state.loggedIn}/>
//             <Route exact path="/" render={() => <Login updateLogin={this.updateLogin} />}/>
//             <Route exact path="/register" component={ Register } />
           
//           </div>
//         </Router>
//       )
//     }
// }
}

export default App;
