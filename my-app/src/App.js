import React from 'react';
import axios from 'axios';
import './App.css';

function App() {
  return(
    <div>
      <Form />
      <UserCard />
    </div>
  )
}

class Form extends React.Component {
  constructor() {
    super()
    this.state = {
      username: '',
      userInfo: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  handleChange(event) {
    this.setState({
      username: event.target.value
    })
  }

  handleSubmit(event) {

    // axios.get(`https://api.github.com/users/${this.state.username}`)
    // .then(response => response.data)
    // .then(response => {
    //   const {user} = response.data
    //   this.setState({userInfo: user})
    // })

    axios.get(`https://api.github.com/users/${this.state.username}`).then(resp => {
      this.handleSubmit(resp.data)
      this.setState.username('')
    })
    
  }

  render() {
    return (
      <form>
        <input onChange={this.handleChange}/>
        <button onClick={this.handleSubmit}>Search</button>
        <div>{this.state.username}</div>
      </form>
    )
  } 
}

class UserCard extends React.Component {
  constructor() {
    super()
    this.state = {

    }
  }
  render() {
    return (
      <div>
        <img alt='avatar'/>
        <div></div>
      </div>
    )
  } 
}


export default App;
