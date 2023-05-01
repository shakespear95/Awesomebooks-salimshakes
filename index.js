// Import modules
import Book from './scripts/book.js';
import UI from './scripts/ui.js';
import Store from './scripts/store.js';
import { refreshTime, showSection } from './scripts/utils.js';

// DOM elements
const form = document.querySelector('#book-form');
const container = document.querySelector('.container');
const ui = new UI(container);

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  showSection('firstsection');
  ui.displayBooks();
  refreshTime(); // call the refreshTime function to update the time on page load
});

document.querySelector('.list').addEventListener('click', (e) => {
  e.preventDefault();
  showSection('firstsection');
});

document.querySelector('.add-new').addEventListener('click', (e) => {
  e.preventDefault();
  showSection('form');
});

document.querySelector('.contact').addEventListener('click', (e) => {
  e.preventDefault();
  showSection('contact-me');
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nameInput = document.querySelector('#book-name');
  const authorInput = document.querySelector('#book-author');
  const name = nameInput.value;
  const author = authorInput.value;
  const id = Date.now().toString();
  const date = new Date().toDateString();

  if (name === '' || author === '') {
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    const book = new Book(name, author, id, date);
    ui.addBookToList(book);
    Store.addBook(book);
    ui.showAlert('Book added successfully', 'success');
    ui.clearFields();
  }
});

container.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove')) {
    ui.removeBook(e.target.parentElement.parentElement);
    ui.showAlert('Book removed', 'success');
  }
});
