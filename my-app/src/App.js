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
      isRendering: false,
      animation: ''
    }
    //binding for button and input 
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  //Handle change event for input including regex to remove spaces from username 
  handleChange(event) {
    let result = event.target.value.replace(/\s+/g, '')
    this.setState({
      username: result
    })
  }


  //Handle submit event for submit button. Sets username to url and return data from that user url
  //Removes animation class after 1.5s from userCard to restart animation on next submission
  handleSubmit(event) {
    event.preventDefault()
    const url = `https://api.github.com/users/${this.state.username}`
    axios.get(url)
    .then(res => {
      this.setState({userInfo: res, isRendering: true, animation: 'animation'})
    }
      )
    .then(
      setTimeout(() => {
        this.setState({
          animation: ''
        })
      }, 1500)
    )
  }

  render() {
    return (
      <div className='subForm'>
        <form>
          <input onChange={this.handleChange} placeholder='Enter GitHub username'/>
          <button onClick={this.handleSubmit}>Search</button>
        </form>
        {
          (this.state.isRendering && 
            <div className={`userCard ${ this.state.animation }`}>
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
                <div className='gitLink'><a href={this.state.userInfo.data.html_url} target='_blank' rel="noopener noreferrer"><i className="fab fa-github"></i></a></div>
              </div>
            </div>)
        }
        {
          (this.state.userInfo.status === 404) && this.state.isRendering &&
          <div className={`userCard ${ this.state.animation }`}>
            <p>There is no user on GitHub with the username {this.state.username}</p>
          </div>
        }
      </div>
    )
  } 
}



export default App;
