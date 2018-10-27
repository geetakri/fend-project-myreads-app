import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import Shelf from "./Shelf";

class MyReads extends Component {
    state = {}

    componentDidMount = () => {
        // Update the list of all books
        this.props.onRefreshAllBooks();
    }

    updateShelves = () => {

        // Update the state of each of the three shelves
        const currentlyReading = {
            title: "Currently Reading",
            books: this.props.books.filter(book => book.shelf === 'currentlyReading')
        };
        const wantToRead = {
            title: "Want to Read",
            books: this.props.books.filter(book => book.shelf === "wantToRead")
        };
        const read = {
            title: "Read",
            books: this.props.books.filter(book => book.shelf === "read")
        };

        return ([currentlyReading, wantToRead, read]);
    }

    render() {
        let shelves = [];
        if (this.props.books && this.props.books.length)
            shelves = this.updateShelves();

        return (
            <div className="app">
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    <div className="list-books-content">
                        <div>
                            {shelves && shelves.map((shelf) => (<Shelf
                                key={shelf.title}
                                shelfData={shelf}
                                onChangeShelf={this.props.onChangeShelf}
                            />))}
                        </div>
                    </div>
                    <div className="open-search">
                        <Link to='/search'>Add a book</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default MyReads;
