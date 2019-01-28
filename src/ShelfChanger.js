import React, { Component } from 'react'
import './App.css'
import PropTypes from 'prop-types'

class ShelfChanger extends Component {

    static propTypes = {
        book: PropTypes.object.isRequired,
        onChangeHandle: PropTypes.func.isRequired
    }
    /*
    Bad Practice:-"If a component does not own a datum, then that datum should not influence it’s state"

    According to the best practices " if you don’t care about props after the component is initialized, then this entire rule doesn’t apply."

    Because in this case we only care about props during initialization phase,
    so we are allowed to use props in state.

     */
    state = {
        value: this.props.book.shelf || "none"
    }

    onChangeHandle = (e) => {
        this.setState({ value: e.target.value });
        this.props.onChangeHandle(e);

    }
    render() {
        let { value } = this.state;
        return (
            <div className="book-shelf-changer">
                <select value={value} onChange={this.onChangeHandle}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        )
    }
}
export default ShelfChanger;