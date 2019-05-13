import React from 'react';
import axios from 'axios';
import './App.css';

// App function which renders to root
function App() {
  return(
    <div className='mainForm'>
      <h1>GitHub Profile Viewer</h1>
      <Form />
    </div>
  )
}


// Stateful form component. Stores user data received from API
class Form extends React.Component {
  constructor() {
    super()
    this.state = {
      username: '',
      userInfo: {},
      isRendering: false
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
    event.preventDefault()
    const url = `https://api.github.com/users/${this.state.username}`
    axios.get(url)
    .then(data => this.setState({userInfo: data, isRendering: true})).then(console.log(this.state.userInfo))
    
  }

  render() {
    return (
      <div className='subForm'>
        <form>
          <input onChange={this.handleChange}/>
          <button onClick={this.handleSubmit}>Search</button>
        </form>
        {
          (this.state.isRendering && 
            <div className='userCard'>
              <img alt='avatar' src={this.state.userInfo.data.avatar_url}/>
              <div>
                <h3>{this.state.userInfo.data.login}</h3>
                <p>Bio: {this.state.userInfo.data.bio}</p>
                <p>Blog: {this.state.userInfo.data.blog}</p>
                <div className='followSection'>
                  <div>
                  <p>Following</p>
                  <h3>{this.state.userInfo.data.following}</h3>
                  </div>
                  <div>
                  <p>Followers</p>
                  <h3>{this.state.userInfo.data.followers}</h3>
                  </div>
                </div>
                <i href={this.state.userInfo.data.html_url}></i>
              </div>
            </div>)
        }
        {
          (!this.state.userInfo) && <p>There is no user on GitHub with the username {this.state.username}</p>
        }
      </div>
    )
  } 
}



export default App;
