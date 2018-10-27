# MyReads Project
Frontend-Nanodegree-MyReads: A Book Tracking App
===============================

## Table of Contents

* [Project Overview](#project-overview)
* [Prerequisites](#prerequisites)
* [To install and launch the project](#to-install-and-launch-the-project)
* [Backend Server](#backend-server)
* [Important](#important)
* [Acknowledgments](#acknowledgements)


## Project Overview
MyReads project, is a bookshelf app that allows you to select and categorize books you have read, are currently reading, or want to read. The application is build using React and has an API server and client library that is used to persist information while interacting with the application.

## Prerequisites

The project can be built with npm or yarn, so choose one of the approach bellow in case you don't have any installed on your system.

* **Npm** is distributed with Node.js which means that when you download Node.js, you automatically get npm installed on your computer. [Download Node.js](https://nodejs.org/en/download/)

* **Yarn** is a package manager built by Facebook Team and seems to be faster than npm in general.  [Download Yarn](https://yarnpkg.com/en/docs/install)

## To install and launch the project
* Go to [repository link](https://github.com/geetakri/fend-project-myreads-app.git). Either clone or download the repository to your local computer.
* `cd` fend-project-myreads-app folder
* install all project dependencies with `npm install`
* start the development server with `npm start`
* with your server running, visit the site: `http://localhost:3000` if doesn't open automatically

## Backend Server

To simplify the development process, Udacity provided a backend server to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods that are used to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Acknowledgments
* [Udacity](https://www.udacity.com/)
* Doug Brown [Project Coach]
