import { DateTime } from "luxon";
import { ordinalSuffix } from "./utils.js";

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

  static generateId() {
    const date = DateTime.local();
    const year = date.year;
    const month = date.month;
    const day = date.day;
    const hours = date.hour;
    const minutes = date.minute;
    const seconds = date.second;
    const milliseconds = date.millisecond;
    const ordinalDay = ordinalSuffix(day);
    return `${year}${month}${ordinalDay}${hours}${minutes}${seconds}${milliseconds}`;
  }
}

export { Store };

