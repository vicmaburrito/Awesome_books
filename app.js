class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

// LocalStorage Class

class LocalStorageforBooks {
  static allBooks() {
    let books;
    if (localStorage.getItem('books') == null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }
  
  static addBook(newBook) {
    const getAllBooks = allBooks();
    getAllBooks.push(newBook);
    localStorage.setItem('books', JSON.stringify(getAllBooks));
  }
  
  static deleteBook(title, author) {
    const books = allBooks();
  
    books.forEach((book, index) => {
      if (book.title === title && book.author === author) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

class UserInterface {
  static IndexBooks(book) {
    const row = document.querySelector('#basic-table');
    const item = document.createElement('tr');
    
    item.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td><button class="destroy btn btn-light">Remove</button></td>
    `;
    
    row.appendChild(item);
  }
  
  static displayBooks() {
    const books = allBooks();
    
    books.forEach((book) => IndexBooks(book));
  }
  
  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }
  
  static destroyBook(element) {
    if (element.classList.contains('destroy')) {
      element.parentElement.parentElement.remove();
    }
  }
}
  
document.addEventListener('DOMContentLoaded', UserInterface.displayBooks());

document.querySelector('#basic-form').addEventListener('submit', (t) => {
  t.preventDefault();

  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;

  if (title === '' || author === '') {
    const error = document.createElement('p');
    const location = document.querySelector('#basic-form');

    error.innerHTML = `
    <small class="alert">Please fill all the fields</small>
  `;

    location.appendChild(error);
  } else {
    const book = {};
    book.title = title;
    book.author = author;

    IndexBooks(book);

    addBook(book);

    const success = document.createElement('p');
    const location = document.querySelector('#basic-form');

    success.innerHTML = `
    <small class="alert">Book added</small>
  `;
    location.appendChild(success);
    clearFields();
  }
  setTimeout(() => document.querySelector('.alert').remove(), 2000);
});

document.querySelector('#basic-table').addEventListener('click', (t) => {
  destroyBook(t.target);

  const delTitle = t.target.parentElement.previousElementSibling.previousElementSibling.textContent;

  const delAuthor = t.target.parentElement.previousElementSibling.textContent;

  deleteBook(delTitle, delAuthor);
});