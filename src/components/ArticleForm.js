import React, { Component } from 'react'
import axios from 'axios'

class ArticleForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.article.title,
      body: this.props.article.body
    }
  }

  handleInput = (e) => {
    this.props.resetNotification()
    this.setState({[e.target.name]: e.target.value})
  }

  handleBlur = () => {
    const article = {title: this.state.title, body: this.state.body }
    axios.put(
      `http://localhost:3001/api/v1/articles/${this.props.article.id}`,
      {article: article}
      )
    .then(response => {
      console.log(response)
      this.props.updateArticle(response.data)
    })
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="tile">
        <form onBlur={this.handleBlur} >
          <input className='input' type="text" name="title" placeholder='Enter a Title'
            value={this.state.title} onChange={this.handleInput}
            ref={this.props.titleRef} />
          <textarea className='input' name="body" placeholder='Describe your article'
            value={this.state.body} onChange={this.handleInput}></textarea>
        </form>
      </div>
    );
  }
}

export default ArticleForm
