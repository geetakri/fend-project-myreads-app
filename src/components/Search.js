import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from '../BooksAPI';


class Search extends Component {

    state = {
        query: "",
        books: [],
    };

    queryTimer = null;

    changeQuery = (value) => {
        // Updates the query then wait a quarter second
        //before actually executing the search
        clearTimeout(this.queryTimer);
        this.setState({query: value});
        this.queryTimer = setTimeout(this.updateSearch, 250);
    }

    updateSearch = () => {
        // When a string is empty , search is not performed
        //and clear the list of the books
        if (this.state.query === "") {
            this.setState({error: false, books: []});
            return;
        }

        // Execute the search on the query string and then process the response
        BooksAPI
            .search(this.state.query)
            .then(response => {
                let resultList = [];
                let newError = false;


                //Checks for the error , if there is any error sets the error to true
                if (response === undefined || (response.error && response.error !== "Query is empty")) {
                    newError = true;
                } else if (response.length) {
                    // Check the list of books on each of the shelf against the
                    // search results and update shelf data accordingly
                    resultList = this.mergeShelfAndSearch(this.props.updatedBooks, response);
                }

                // Set the state based on the new response
                this.setState({error: newError, books: resultList});
            })
    }

    componentWillReceiveProps = (props) => {
        // Re-merge the shelf and search list and set the state
        this.props = props;
        let resultList = this.mergeShelfAndSearch(this.props.updatedBooks, this.state.books);
        this.setState({books: resultList});
    }

    mergeShelfAndSearch = (books, searchResults) => {
      // For each book in the search results, check if it already
      // exists in the shelf data
      const hashTable = {};
      books.forEach(bk => hashTable[bk.id] = bk.shelf);

      searchResults.forEach(bk => {
          bk.shelf = hashTable[bk.id] || 'none';
      });

      return searchResults;
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            onChange={(e) => this.changeQuery(e.target.value)}
                            value={this.state.query.value}/>
                    </div>
                </div>
                <div className="search-books-results">
                    {this.state.error && (
                        <div className="search-error">
                            There was a problem with your search</div>
                    )}
                    {!this.state.error && (
                        <span className="search-count">
                            {this.state.books.length}&nbsp; books match your search
                        </span>
                    )}

                    <ol className="books-grid">
                        {this.state.books && this
                            .state
                            .books
                            .map(book => (
                                <li key={book.id}>
                                    <Book
                                        book={book}
                                        onChangeShelf={this.props.onChangeShelf}
                                        />
                                </li>
                            ))}
                    </ol>
                </div>
            </div >
        )
    }
}

export default Search;
