import React, {Component} from 'react'
// import * as BooksAPI from './BooksAPI'
import Book from "./Book";

class Shelf extends Component {
    state = {}

    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.shelfData.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                    {this.props.shelfData.books.map(book => (
                        <li key={book.id}>
                            <Book book={book} onChangeShelf={this.props.onChangeShelf}/>
                        </li>
                    ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Shelf;
