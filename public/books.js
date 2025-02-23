import {
  inputEnabled,
  enableInput,
  setDiv,
  message,
  token,
  setToken,
  showLandingPage,
} from "./index.js";

let trackerPage = null;
let trackerTable = null;
let booksTableHeader = null;
let editBook = null;
let bookTitle = null;
let bookAuthor = null;
let bookCategory = null;
let bookStatus = null;
let currentPage = null;
let editSave = null;
let userInfo = null;

//To add or edit a book entry.
export const handleAddEdit = () => {
  editBook = document.getElementById("edit-book-container");
  bookTitle = document.getElementById("title");
  bookAuthor = document.getElementById("author");
  bookCategory = document.getElementById("category");
  bookStatus = document.getElementById("status");
  currentPage = document.getElementById("currentPage");
  editSave = document.getElementById("save-btn");
  const editCancel = document.getElementById("cancel-edit-btn");

  editBook.addEventListener("click", async (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === editSave) {
        enableInput(false);
        let method = "POST";
        let url = "api/v1/books";

        if (editSave.textContent === "update") {
          method = "PATCH";
          url = `/api/v1/jobs/${editBook.dataset.id}`;
        }

        try {
          const response = await fetch(url, {
            method: method,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              title: bookTitle.value,
              author: bookAuthor.value,
              category: bookCategory.value,
              status: bookStatus.value,
              currentPage: currentPage.value,
            }),
          });

          const data = await response.json();
          if (response.status === 200 || response.status === 201) {
            if (response.status === 200) {
              //successful update
              message.textContent = "The book entry was updated.";
            } else {
              message.textContent = "The book entry was created.";
            }
          }

          bookTitle.value = "";
          bookAuthor.value = "";
          bookCategory.value = "";
          bookStatus.value = "";
          currentPage.value = 0;

          showBooks();
        } catch (error) {
          console.error(error);
          message.textContent = "A communication error occurred.";
        }

        enableInput(true);
      } else if (e.target === editCancel) {
        message.textContent = "";
        showBooks();
      }
    }
  });
};

//To show edit form.
export const showAddEdit = async (bookId) => {
  if (!bookId) {
    bookTitle.value = "";
    bookAuthor.value = "";
    bookCategory.value = "";
    bookStatus.value = "";
    currentPage.value = 0;
    editSave.textContent = "Add";
    message.textContent = "";

    setDiv(editBook);
  } else {
    enableInput(false);

    try {
      const response = await fetch(`api/v1/books/${bookId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.status === 200) {
        bookTitle.value = data.book.title;
        bookAuthor.value = data.book.author;
        bookCategory.value = data.book.category;
        bookStatus.value = data.book.status;
        currentPage.value = data.book.currentPage;
        editSave.textContent = "update";
        message.textContent = "";
        editBook.dataset.id = bookId;

        setDiv(editBook);
      } else {
        message.textContent = "The books entry was not found.";
        showBooks();
      }
    } catch (error) {
      console.log(error);
      message.textContent = "A communication error occurred.";
      showBooks();
    }

    enableInput(true);
  }
};

export const handleBooks = () => {
  trackerPage = document.getElementById("tracker-page");
  const logoff = document.getElementById("logoff-btn");
  const addBook = document.getElementById("add-book");
  trackerTable = document.getElementById("tracker-table");
  booksTableHeader = document.getElementById("books-table-header");
  userInfo = document.getElementById("user-info");

  trackerPage.addEventListener("click", (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === addBook) {
        showAddEdit();
      } else if (e.target === logoff) {
        setToken(null);
        trackerTable.replaceChildren([booksTableHeader]);
        userInfo.style.display = "none";
        showLandingPage();
      } else if (e.target.classList.contains("editButton")) {
        message.textContent = ""; //Clear previous message.
        showAddEdit(e.target.dataset.id);
      } else if (e.target.classList.contains("deleteButton")) {
        message.textContent = "";
        deleteBook(e.target.dataset.id);
      }
    }
  });
};

//To show the book table.
export const showBooks = async () => {
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
    let children = [booksTableHeader];

    if (response.status === 200) {
      if (data.count === 0) {
        trackerTable.replaceChildren(...children);
      } else {
        for (let i = 0; i < data.books.length; i++) {
          let rowEntry = document.createElement("tr");

          let editButton = `<td><button type="button" class="editButton" data-id=${data.books[i]._id}>Edit</button></td>`;

          let deleteButton = `<td><button type="button" class="deleteButton" data-id=${data.books[i]._id}>Delete</button></td>`;

          let rowHTML = `
          <td>${data.books[i].title}</td>
          <td>${data.books[i].author}</td>
          <td>${data.books[i].category}</td>
          <td>${data.books[i].status}</td>
          <td>${data.books[i].currentPage}</td>
          <td>${editButton}${deleteButton}</td>`;

          rowEntry.innerHTML = rowHTML;
          children.push(rowEntry);
        }
        trackerTable.replaceChildren(...children);
      }
    } else {
      message.textContent = data.msg;
    }
  } catch (error) {
    console.error(error);
    message.textContent = "A communication error occurred.";
  }

  enableInput(true);
  setDiv(trackerPage);
};

//To delete a book entry.
const deleteBook = async (bookId) => {
  enableInput(false);

  try {
    const response = await fetch(`api/v1/books/${bookId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 204) {
      message.textContent = `Successfully deleted the book with the book ID ${bookId}.`;

      await showBooks();
    } else {
      const data = await response.json();
      message.textContent = data.msg;
    }
  } catch (error) {
    console.error(error);
    message.textContent = "A communication error occurred.";
  }

  enableInput(true);
};
