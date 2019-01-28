import React, { Component } from 'react'
import './App.css'
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import { DebounceInput } from 'react-debounce-input'
class Search extends Component {

  componentDidMount = () => {
    BooksAPI.getAll().then(data => {
      return this.booksInShelf = data
    })
  }

  state = {
    value: "",
    books: []
  }

  static propTypes = {
    history: PropTypes.object.isRequired
  }

  onClick = () => {
    this.props.history.push("/");
  }

  onChangeHandle = (e) => {
    this.setState({
      value: e.target.value
    });

    BooksAPI.search(e.target.value).then((data) => {
      console.log(data);
      !data ? this.setState({ books: [] }) :
        data.items ? this.setState({ books: data.items }) :
          this.setState({ books: data })
    })
  }
  onShelfChangeHandle = (e, book) => {
    console.log(e.target.value, book, this.booksInShelf)
    BooksAPI.update(book, e.target.value)
  }


  render() {
    console.log("ytyjhk", this.booksInShelf)
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button className="close-search" onClick={this.onClick}>Close</button>
          <div className="search-books-input-wrapper">

            <DebounceInput

              minLength={2}
              debounceTimeout={300}
              type="text"
              placeholder="Search by title or author"
              value={this.state.value}
              onChange={this.onChangeHandle}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {

              this.state.books.map(book => {
                const bookInShelf = this.booksInShelf.filter(b => {
                  return b.id === book.id
                });
                bookInShelf.length > 0 && (book.shelf = bookInShelf[0].shelf)
                return (<li key={book.id}><Book
                  book={book}
                  onChangeHandle={this.onShelfChangeHandle} /></li>)
              })
            }
          </ol>
        </div></div>
    )
  }

}

export default Search;