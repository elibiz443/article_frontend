import React, { Component } from 'react'

class Article extends Component {
  handleClick = () => { this.props.onClick(this.props.article.id) }

  handleDelete = () => { this.props.onDelete(this.props.article.id) }

  render () {
    return(
      <div className="tile">
        <span className="deleteButton" onClick={this.handleDelete}>x</span>
        <h2 onClick={this.handleClick}><u>{this.props.article.title}</u></h2>
        <h2 onClick={this.handleClick}><i>{this.props.article.body}</i></h2>
      </div>
    )
  }
}

export default Article