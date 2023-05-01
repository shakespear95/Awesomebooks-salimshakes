import { ordinalSuffix } from './utils.js';

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(id, date) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (String(book.id) === String(id) && String(book.date) === String(date)) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }

  static generateId() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const milliseconds = date.getMilliseconds();
    const ordinalDay = ordinalSuffix(day);
    return `${year}${month}${ordinalDay}${hours}${minutes}${seconds}${milliseconds}`;
  }
}

export default Store;
