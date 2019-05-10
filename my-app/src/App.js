import React from 'react';
import axios from 'axios';
import './App.css';

function App() {
  return(
    <div>
      <Form />
    </div>
  )
}

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
      <div>
        <form>
          <input onChange={this.handleChange}/>
          <button onClick={this.handleSubmit}>Search</button>
          <div>{this.state.username}</div>
        </form>
        {
          (this.state.isRendering && 
            <div className='userCard'>
              <img alt='avatar'/>
              <h3>{this.state.username}</h3>
              <p>{this.state.userInfo.__proto__.data.bio}</p>
              <p>{this.state.userInfo.__proto__.data.blog}</p>
            </div>)
        }
      </div>
    )
  } 
}



export default App;
