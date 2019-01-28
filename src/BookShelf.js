import React from 'react'
import './App.css'
import Book from './Book'
import PropTypes from 'prop-types'

const onChangeHandle = (e, book, props) => {
    props.onChangeHandle(e, book)

}
const BookShelf = (props) => {
    return (
        <div className="list-books-content">
            <div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">{props.title}</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {props.books.map((book) => {
                                return <li key={book.id}>
                                    <Book book={book} onChangeHandle={(e, book) => onChangeHandle(e, book, props)} />
                                </li>
                            })}
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    )
}

BookShelf.propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onChangeHandle: PropTypes.func.isRequired
}
export default BookShelf;