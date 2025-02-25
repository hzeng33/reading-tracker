# Reading Tracker App

A web application designed to help you keep track of your reading progress. With this app, you can easily add, edit, and delete books from your reading list. It also features search and sorting functionalities to help you quickly find the books you're looking for.

## Table of Contents

- [Data Models](#data-models)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)

## Data Models

### User Model

- **name:** The user's name.
- **email:** The user's email address.
- **password:** The user's password (stored securely).

### Book Model

- **Title:** The title of the book.
- **Author:** The author of the book.
- **Category:** The genre or category of the book.
- **Status:** Indicates whether the book is "Want to Read", "Reading", or "Completed".
- **Current Page:** A number that tracks the current page for reading progress.

## Features

- **User Authentication:**

  - Users can register, log in, and log out using JSON Web Tokens (JWT) for secure authentication.

- **Book Management:**

  - Add new books to your reading list.
  - Edit book details including title, author, category, status, and current page.
  - Delete books from your list.

- **Search and Sorting:**
  - **Search:** Users can search for books by author.
  - **Sort:** Users can sort the reading list alphabetically by author.

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/reading-tracker-app.git
   cd reading-tracker-app

   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

## Usage

1. **Run the Application:**

   ```bash
    npm start

   ```

2. **Open in Browser:**
   Open your browser and navigate to http://localhost:3000.

3. **How to Use the App:**

- User Authentication: Register or log in to access your reading tracker.
- Book Management: Use the interface to add, edit, or delete books from your reading list.
- Search and Sorting: Use the search bar (and search button) to filter books by author, and sort your list alphabetically by author using the sort buttons.
