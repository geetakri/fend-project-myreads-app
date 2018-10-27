import React from 'react'
import {Route} from 'react-router-dom';
import * as BooksAPI from './BooksAPI'


import './App.css'
import MyReads from './components/MyReads';
import Search from './components/Search';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  componentDidMount = () => {
    if (this.state.newBook) {
      this.refreshAllBooks();
    }
  }

  refreshAllBooks = () => {
    // Get all the books currently on the bookshelves and
    // update the state with the fetched list
    BooksAPI
      .getAll()
      .then((list) => {
          this.setState({books:list,newBook: false});
      });
  }

  changeShelf = (book, shelf) => {
    // Calls BooksAPI to update the sheleves
    //when the selected book is moved to the another shelf

    BooksAPI
      .update(book, shelf)
      .then(response => {
        // Update the state of the book. Start with a copy of the list of books.
        let newList = this.state.books.slice(0);
        // Look for the book in the list. It might not be there yet.
        const books = newList.filter(listBook => listBook.id === book.id);
        if (books.length) {
          // Update the book that is already on the shelf
          books[0].shelf = shelf;
        } else {
          // Add the book to the shelf.
          newList.push(book);
        }
        // Update the state with the newList
        this.setState({books: newList});
      })
  }

  render() {
    return (
      <div className="app">
        <Route
          exact
          path='/'
          render={(() => (<MyReads
          books={this.state.books}
          onChangeShelf={this.changeShelf}
          onRefreshAllBooks={this.refreshAllBooks}/>))}/>

        <Route
          exact
          path='/search'
          render={(() => (<Search updatedBooks={this.state.books} onChangeShelf={this.changeShelf}/>))}/>

      </div>
    )
  }
}

export default BooksApp
