import React, { Component } from 'react'
import './App.css'
import BookShelf from './BookShelf'
import *  as BooksAPI from './BooksAPI'
class BookShelfApp extends Component {

    state = {
        currentlyReading: [],
        wantToRead: [],
        read: []
    }

    componentDidMount = () => {

        //getting books from server
        BooksAPI.getAll()
            .then((data) => {
                this.setState({
                    currentlyReading: data.filter((book) => book.shelf === "currentlyReading"),
                    wantToRead: data.filter((book) => book.shelf === "wantToRead"),
                    read: data.filter((book) => book.shelf === "read")
                })
            })
            .catch((error) => {
                console.log(error)
            })

    }
    // handling shelf change
    onChangeHandle = (e, book) => {

        BooksAPI.update(book, e.target.value).then((data) => console.log("inserted in the server"))
        const { currentlyReading, wantToRead, read } = this.state;
        const books = [...currentlyReading, ...wantToRead, ...read]
        console.log("books", books)
        console.log("book", book)

        let newBook = books.filter(b => b.id === book.id)[0];
        console.log("newbook", newBook)
        newBook.shelf = e.target.value;
        console.log("newbook after change", newBook)

        this.setState({
            currentlyReading: books.filter((book) => book.shelf === "currentlyReading"),
            wantToRead: books.filter((book) => book.shelf === "wantToRead"),
            read: books.filter((book) => book.shelf === "read")
        })

    }

    render() {
        console.log(this.state.currentlyReading)
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>

                <BookShelf
                    title="Currently Reading"
                    books={this.state.currentlyReading}
                    onChangeHandle={this.onChangeHandle}

                />
                <BookShelf
                    title="Want To Read"
                    books={this.state.wantToRead}
                    onChangeHandle={this.onChangeHandle}

                />
                <BookShelf
                    title="Read"
                    books={this.state.read}
                    onChangeHandle={this.onChangeHandle}

                />


            </div>

        )
    }
}

export default BookShelfApp;