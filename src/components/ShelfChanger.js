import React, {Component} from 'react'
// import * as BooksAPI from './BooksAPI'

class ShelfChanger extends Component {
    state = {
        shelfSelection: this.props.book.shelf || "none"
    }

    onChangeShelf = (bookToMove, selectedShelf) => {
        // Set the state for the shelf selection and make the call back up the chain
        this.setState({shelfSelection: selectedShelf});
        this.props.onChangeShelf(bookToMove, selectedShelf);
    }

    componentWillReceiveProps = (props) => {
        this.props = props;
        this.setState({shelfSelection: this.props.book.shelf});
    }

    render = () => {
        return (

            <div className="book-shelf-changer">
                <select
                    value={this.state.shelfSelection}
                    onChange={(event) => this.onChangeShelf(this.props.book, event.target.value)}>
                    <option value="" disabled>Move to...</option>
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
