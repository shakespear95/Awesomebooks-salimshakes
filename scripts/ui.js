import Store from './store.js';

class UI {
  constructor(container) {
    this.container = container;
  }

  displayBooks() {
    const books = Store.getBooks();
    books.forEach((book) => this.addBookToList(book));
  }

  addBookToList(book) {
    const bookInfo = document.createElement('div');
    bookInfo.classList.add('book-info');
    bookInfo.innerHTML = `<div class = "textpart">"<span class="book-name">${book.name}</span>" by <span class="book-author">${book.author}</span></div>
                            <div class = "buttonpart"><button class="remove" data-id="${book.id}" data-date="${book.date}">Remove</button></div>`;
    this.container.appendChild(bookInfo);
  }

  removeBook(element) {
    element.remove();
    this.Store.removeBook(
      element.querySelector('.remove').dataset.id,
      element.querySelector('.remove').dataset.date,
    );
  }

  clearFields() {
    this.document.querySelector('#book-name').value = '';
    this.document.querySelector('#book-author').value = '';
  }

  showAlert(message, className) {
    const alert = document.createElement('div');
    alert.className = `alert ${className}`;
    alert.appendChild(document.createTextNode(message));
    const form = document.querySelector('#book-form');
    this.container.insertBefore(alert, form);
    setTimeout(() => {
      document.querySelectorAll('.alert').forEach((alert) => alert.remove());
    }, 3000);
  }
}

export default UI;