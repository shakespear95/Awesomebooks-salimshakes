class Book {
  constructor(name, author, id, date) {
    this.name = name;
    this.author = author;
    this.id = id;
    this.date = date;
  }
}

import { DateTime } from "luxon";

function refreshTime() {
  const timeDisplay = document.getElementById("time");
  const currentDate = DateTime.local();

  const formattedDate = currentDate.toLocaleString({
    month: "long",
    day: "ordinal",
    year: "numeric"
  });

  const formattedTime = currentDate.toLocaleString({
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });

  timeDisplay.textContent = `${formattedDate}, ${formattedTime}`;
}

refreshTime();

class UI {
  constructor(container) {
    this.container = container;
  }

  displayBooks() {
    let books = Store.getBooks();
    books.forEach((book) => this.addBookToList(book));
  }

  addBookToList(book) {
    const bookInfo = document.createElement("div");
    bookInfo.classList.add("book-info");
    bookInfo.innerHTML = `<div class = "textpart">"<span class="book-name">${book.name}</span>" by <span class="book-author">${book.author}</span></div>
                            <div class = "buttonpart"><button class="remove" data-id="${book.id}" data-date="${book.date}">Remove</button></div>`;
    this.container.appendChild(bookInfo);
  }

  removeBook(element) {
    element.remove();
    Store.removeBook(
      element.querySelector(".remove").dataset.id,
      element.querySelector(".remove").dataset.date
    );
  }

  clearFields() {
    document.querySelector("#book-name").value = "";
    document.querySelector("#book-author").value = "";
  }

  showAlert(message, className) {
    const alert = document.createElement("div");
    alert.className = `alert ${className}`;
    alert.appendChild(document.createTextNode(message));
    const form = document.querySelector("#book-form");
    this.container.insertBefore(alert, form);
    setTimeout(() => {
      document.querySelectorAll(".alert").forEach((alert) => alert.remove());
    }, 3000);
  }
}

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(id, date) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (String(book.id) === String(id) && String(book.date) === String(date)) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}

function showSection(sectionToShow) {
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    if (section.classList.contains(sectionToShow)) {
      section.style.display = "block";
    } else {
      section.style.display = "none";
    }
  });
}

const form = document.querySelector("#book-form");
const container = document.querySelector(".container");
const ui = new UI(container);

document.addEventListener("DOMContentLoaded", () => {
  showSection("firstsection");
  ui.displayBooks();
});

document.querySelector(".list").addEventListener("click", (e) => {
  e.preventDefault();
  showSection("firstsection");
});

document.querySelector(".add-new").addEventListener("click", (e) => {
  e.preventDefault();
  showSection("form");
});

document.querySelector(".contact").addEventListener("click", (e) => {
  e.preventDefault();
  showSection("contact-me");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nameInput = document.querySelector("#book-name");
  const authorInput = document.querySelector("#book-author");
  const name = nameInput.value;
  const author = authorInput.value;
  const id = Date.now().toString();
  const date = new Date().toDateString();

  if (name === "" || author === "") {
    ui.showAlert("Please fill in all fields", "error");
  } else {
    const book = new Book(name, author, id, date);
    ui.addBookToList(book);
    Store.addBook(book);
    ui.showAlert("Book added successfully", "success");
    ui.clearFields();
  }
});

container.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove")) {
    ui.removeBook(e.target.parentElement.parentElement);
    ui.showAlert("Book removed", "success");
  }
});

