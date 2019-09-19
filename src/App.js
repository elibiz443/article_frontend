import React, { Component } from 'react'
import './App.css'
import ArticlesContainer from './components/ArticlesContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>My Articles</h1>
        </div>
        <ArticlesContainer />
      </div>
    );
  }
}

export default App
