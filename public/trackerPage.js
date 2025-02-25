import { setDiv, token, enableInput } from "./index.js";

const trackerPage = document.getElementById("tracker-page");
const trackerTable = document.getElementById("tracker-table");
const booksTableHeader = document.getElementById("books-table-header");

// Insert form elements for adding/editing books.
const insertForm = document.getElementById("insert-form");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const categoryInput = document.getElementById("category");
const statusSelect = document.getElementById("status");
const currentPageInput = document.getElementById("currentPage");
const saveBtn = document.getElementById("save-btn");
const cancelEditBtn = document.getElementById("cancel-edit-btn");

//Elements for search and sort.
const searchBar = document.getElementById("search-bar");
const searchBtn = document.getElementById("search-btn");
const sortAscBtn = document.getElementById("sort-asc");
const sortDsecBtn = document.getElementById("sort-desc");

// This variable holds the book id being edited
let editingBookId = null;

// Global variables to hold the current books and sort order
let allBooks = []; // Will store the fetched list of books.
let currentSort = null; // Can be "asc", "desc", or null.

// Show tracker page
export const showReadingTracker = () => {
  setDiv(trackerPage);

  showBooks();
};

// Attach event listeners for tracker page buttons.
export const handleTrackerActions = () => {
  // Listener for "Add Book" button:
  const addBookBtn = document.getElementById("add-book");
  addBookBtn.addEventListener("click", () => {
    editingBookId = null;

    titleInput.value = "";
    authorInput.value = "";
    categoryInput.value = "";
    statusSelect.value = "";
    currentPageInput.value = "";
    saveBtn.textContent = "Add";
    setDiv(insertForm);
  });

  // Handle edit and delete button clicks on the tracker table.
  trackerTable.addEventListener("click", (e) => {
    if (e.target.nodeName === "BUTTON") {
      if (e.target.classList.contains("editButton")) {
        // Get the book id from a data attribute.
        editingBookId = e.target.dataset.id;
        loadBookForEditing(editingBookId);
      } else if (e.target.classList.contains("deleteButton")) {
        deleteBook(e.target.dataset.id);
      }
    }
  });

  // Listener for Save/Update button on the insert/edit form.
  insertForm.addEventListener("click", async (e) => {
    if (e.target.nodeName === "BUTTON") {
      if (e.target === saveBtn) {
        enableInput(false);
        let method = "";
        let url = "";
        if (editingBookId) {
          method = "PATCH";
          url = `/api/v1/books/${editingBookId}`;
        } else {
          method = "POST";
          url = "api/v1/books";
        }

        try {
          const response = await fetch(url, {
            method: method,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              title: titleInput.value,
              author: authorInput.value,
              category: categoryInput.value,
              status: statusSelect.value,
              currentPage: currentPageInput.value,
            }),
          });
          const data = await response.json();
          if (response.status === 200 || response.status === 201) {
            editingBookId ? alert("Book updated.") : alert("Book added.");
            showBooks();
          } else {
            alert(data.msg);
          }
        } catch (error) {
          console.error(error);
          alert("A communication error occurred.");
        }
        enableInput(true);
      } else if (e.target === cancelEditBtn) {
        showBooks();
      }
    }
  });

  // When "Ascending" button is clicked, set sort order to ascending.
  sortAscBtn.addEventListener("click", () => {
    currentSort = "asc";
    updateDisplay();
  });

  //When "Dscending" button is clicked, set sort order to descending.
  sortDsecBtn.addEventListener("click", () => {
    currentSort = "desc";
    updateDisplay();
  });

  // When the user types in the search bar, update the display.
  searchBar.addEventListener("input", () => {
    updateDisplay();
  });

  // When the new Search button is clicked, update the display.
  searchBtn.addEventListener("click", () => {
    updateDisplay();
  });
};

// Load books from the server and display them in the table.
export async function showBooks() {
  try {
    enableInput(false);
    const response = await fetch("/api/v1/books", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    if (response.status === 200) {
      allBooks = data.books;

      updateDisplay();
    } else {
      alert(data.msg);
    }
  } catch (error) {
    console.error(error);
    alert("A communication error occurred.");
  }

  enableInput(true);
  setDiv(trackerPage);
}

// Helper function to render an array of books into the tracker table.
const renderBooks = (booksArray) => {
  let rows = [booksTableHeader];

  if (booksArray.length === 0) {
    trackerTable.replaceChildren(...rows);
    return;
  }

  booksArray.forEach((book) => {
    let row = document.createElement("tr");

    // Create table cells for book properties.
    row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.category}</td>
            <td>${book.status}</td>
            <td>${book.currentPage}</td>
            <td><button type="button" class="editButton" data-id="${book._id}">Edit</button></td>
            <td><button type="button" class="deleteButton" data-id="${book._id}">Delete</button></td>
          `;
    rows.push(row);
  });
  trackerTable.replaceChildren(...rows);
};

//// Helper function to update the table based on the current search text and sort order.
const updateDisplay = () => {
  const searchTerm = searchBar.value.toLowerCase();

  // Filter books using the search term.
  let filteredBooks = allBooks.filter((book) =>
    book.title.toLowerCase().includes(searchTerm)
  );

  // Sort the filtered books if a sort order is active.
  if (currentSort === "asc") {
    filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
  } else if (currentSort === "desc") {
    filteredBooks.sort((a, b) => b.title.localeCompare(a.title));
  }

  renderBooks(filteredBooks);
};

// Load a book's data into the form for editing.
async function loadBookForEditing(bookId) {
  try {
    enableInput(false);
    const response = await fetch(`/api/v1/books/${bookId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.status === 200) {
      titleInput.value = data.book.title;
      authorInput.value = data.book.author;
      categoryInput.value = data.book.category;
      statusSelect.value = data.book.status;
      currentPageInput.value = data.book.currentPage;
      saveBtn.textContent = "Update";
      setDiv(insertForm);
    } else {
      alert("Book not found.");
      showBooks();
    }
  } catch (error) {
    console.error(error);
    alert("A communication error occurred.");
    showBooks();
  }
  enableInput(true);
}

// Delete a book.
async function deleteBook(bookId) {
  try {
    enableInput(false);
    const response = await fetch(`/api/v1/books/${bookId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 204) {
      alert(`Book with id:${bookId} deleted.`);
      await showBooks();
    } else {
      const data = await response.json();
      alert(data.msg);
    }
  } catch (error) {
    console.error(error);
    alert("A communication error occurred.");
  }
  enableInput(true);
}
