import React, { Component } from 'react'
import axios from 'axios'
import Article from './Article'
import ArticleForm from './ArticleForm'
import update from 'immutability-helper'
import Notification from './Notification'

class ArticlesContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      articles: [],
      editingArticleId: null,
      notification: '',
      transitionIn: false
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/v1/articles.json')
    .then(response => {
      this.setState({articles: response.data})
    })
    .catch(error => console.log(error))
  }

  addNewArticle = () => {
    axios.post('http://localhost:3001/api/v1/articles', {article: {title: '', body: ''}})
    .then(response => {
      const articles = update(this.state.articles, { $splice: [[0, 0, response.data]]})
      this.setState({articles: articles, editingArticleId: response.data.id})
    })
    .catch(error => console.log(error))
  }

  updateArticle = (article) => {
    const articleIndex = this.state.articles.findIndex(x => x.id === article.id)
    const articles = update(this.state.articles, {[articleIndex]: { $set: article }})
    this.setState({articles: articles, notification: 'All changes saved', transitionIn: true})
  }

  deleteArticle = (id) => {
    axios.delete(`http://localhost:3001/api/v1/articles/${id}`)
    .then(response => {
      const articleIndex = this.state.articles.findIndex(x => x.id === id)
      const articles = update(this.state.articles, { $splice: [[articleIndex, 1]]})
      this.setState({articles: articles})
    })
    .catch(error => console.log(error))
  }

  resetNotification = () => {this.setState({notification: '', transitionIn: false})}

  enableEditing = (id) => {
    this.setState({editingArticleId: id}, () => { this.title.focus() })
  }

  render() {
    return (
      <div>
        <div>
          <button className="newArticleButton" onClick={this.addNewArticle} >
            New Article
          </button>
          <Notification in={this.state.transitionIn} notification= {this.state.notification} />
        </div>
        {this.state.articles.map((article) => {
          if(this.state.editingArticleId === article.id) {
            return(<ArticleForm article={article} key={article.id} updateArticle={this.updateArticle}
                    titleRef= {input => this.title = input}
                    resetNotification={this.resetNotification} />)
          } else {
            return (<Article article={article} key={article.id} onClick={this.enableEditing}
                    onDelete={this.deleteArticle} />)
          }
        })}
      </div>
    );
  }

}

export default ArticlesContainer
