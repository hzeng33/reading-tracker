import {
  inputEnabled,
  enableInput,
  setDiv,
  message,
  token,
  setToken,
} from "./index.js";
// import { showLoginRegister } from "./loginRegister.js";
// import { showAddEdit } from "addEdit.js";

let trackerPage = null;
let trackerTable = null;
let booksTableHeader = null;

export const handleBooks = () => {
  trackerPage = document.getElementById("tracker-page");
  const logoff = document.getElementById("logoff-btn");
  const addBook = document.getElementById("add-book");
  trackerTable = document.getElementById("tracker-table");
  booksTableHeader = document.getElementById("books-table-header");

  trackerPage.addEventListener("click", (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === addBook) {
        //showAddEdit();
      } else if (e.target === logoff) {
        setToken(null);
        message.textContent = "You have been logged off.";
        trackerTable.replaceChildren([booksTableHeader]);
        //showLoginRegister();
      } else if (e.target.classList.contains("editButton")) {
        message.textContent = ""; //Clear previous message.
        //showAddEdit(e.target.dataset.id);
      } else if (e.target.classList.contains("deleteButton")) {
        message.textContent = "";
        deleteBook(e.target.dataset.id);
      }
    }
  });
};

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
          `;

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
