import React from 'react'
import './App.css'
import ShelfChanger from './ShelfChanger'
import PropTypes from 'prop-types'

const onChangeHandle = (e, props) => {
    props.onChangeHandle(e, props.book)
}
const Book = (props) => {

    const backgroundImage = props.book.imageLinks ?
        props.book.imageLinks.smallThumbnail :
        "https://via.placeholder.com/128x188"

    const authors = props.book.authors ? props.book.authors : ["Unknown"]

    return (
        <div className="book">
            <div className="book-top">

                <div
                    className="book-cover"
                    style={{
                        width: 128,
                        height: 188,
                        backgroundImage: `url(${backgroundImage})`
                    }}>
                </div>
                }
            <ShelfChanger
                    book={props.book}
                    onChangeHandle={(e) => onChangeHandle(e, props)}
                />
            </div>
            <div className="book-title">{props.book.title}</div>
            <div className="book-authors">{authors.map(author => <span key={author}>{author} &nbsp;</span>)} </div>
        </div>
    )
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    onChangeHandle: PropTypes.func.isRequired
}
export default Book;
