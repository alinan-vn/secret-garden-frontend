let logged_in = false;
let current_user;
let current_user_books = [];
let current_user_bookcases = [];

(function main() {
  fetchBooks();
  clickListener();
})();


function removeChildElementsFor(parentElement) {
  let childElement;
  while (childElement = parentElement.lastElementChild) {
    parentElement.removeChild(childElement);
  }
}

function fetchUsers() {
  fetch(API.users)
  .then(resp => resp.json())
  .then(renderUsers);
}

function renderUsers(users) {
  const main = document.querySelector('main');
  removeChildElementsFor(main);

  const ul = document.createElement("ul");
  ul.insertAdjacentHTML("afterbegin", '<p class="heading">Current bookcases</p>')
  users.forEach(user => renderUser(user, ul));
  main.append(ul);
}

function renderUser(user, ul) {
  const li = document.createElement('li');
  li.dataset.id = user.id;
  li.innerHTML = `${user.username}'s Bookcase`;
  li.className = 'userlist';
  ul.append(li);
}

//fetchbooks or search API
function fetchBooks() {
  fetch(API.books)
  .then(resp => resp.json())
  .then(renderBooks);
}

function renderBooks(books) {
  const main = document.querySelector('main');
  removeChildElementsFor(main);

  main.insertAdjacentHTML("afterbegin", '<p class="heading">All available books</p>');

  const ul = document.createElement("ul");
  books.forEach(book => renderBook(book, ul));
  main.append(ul);
}

function renderBook(book, ul) {
  const li = document.createElement("li");
  li.dataset.id = book.id;
  li.className = 'booklist';
  const p = document.createElement('p');
  p.innerHTML = book.title;
  p.className = 'booklist';
  p.dataset.id = book.id;
  const coverImage = document.createElement('img');
  coverImage.src = book.cover_image;
  coverImage.className = 'booklist';
  coverImage.dataset.id = book.id;
  li.append(coverImage,p);
  ul.append(li);
}
//fetchUsers

//render show User
//Username

function clickListener() {
  document.addEventListener('click',function(e) {
    const click = e.target.className;
    
    switch (click) {
    case 'booklist':
      const bookId = e.target.dataset.id;
      fetch(API.books + bookId)
      .then(resp => resp.json())
      .then(bookPage);
      break;
    case 'userlist':
      const userId = e.target.dataset.id;
      renderBookcase(userId);
      break;
    case 'bookpage-add-button':
      const bookAdd = e.target.parentNode.firstElementChild.dataset.bookId;
      postBookcase(bookAdd);
      break;
    case 'bookpage-remove-button':
      const bookRemove = e.target.dataset.bookcaseId;
      destroyBookcase(bookRemove);
      document.querySelector('main').append(createAddButton());
      document.querySelector('.bookpage-remove-button').remove();
      break;
    case 'remove-button':
      const bookcaseId = e.target.dataset.id;
      destroyBookcase(bookcaseId);
      deleteListItem(e);
      break;
    case 'books-index':
      fetchBooks();
      break;
    case 'signin':
      const loginDiv = document.querySelector('.login-wrap');
      loginDiv.classList.toggle('hide');
      break;
    case 'users-index':
      fetchUsers();
      break;
    case 'button signin':
      const uName = e.target.parentNode.previousElementSibling.lastElementChild.value;
      e.target.parentNode.previousElementSibling.lastElementChild.value = '';
      loginUser(uName);
      break;
    case 'button signup':
      const newUName = e.target.parentNode.previousElementSibling.lastElementChild.value;
      e.target.parentNode.previousElementSibling.lastElementChild.value = '';
      postUser(newUName);
      break;
    case 'signout':
      signout();
      break;
    case 'logged_in':
      renderBookcase(current_user);
      break;
    };
  });
}

function postUser(username) {
  const reqObj = {
    "method": "POST",
    "headers": API.headers,
    "body": JSON.stringify({ username })
  };
  fetch(API.users,reqObj)
  .then(resp => resp.json())
  .then(user => updateCurrentUser(user.data));
}

function loginUser(uName) {
  fetch(API.users)
  .then(resp => resp.json())
  .then(users => findUser(users,uName));
}

function findUser(users,uName) {
  if (users.find(user => user.username.toLowerCase() === uName.toLowerCase())) {
    const user = users.find(user => user.username.toLowerCase() === uName.toLowerCase());
    updateCurrentUser(user);
  }
}

function updateCurrentUser(user) {
  current_user = user.id;
  current_user_books = user.books;
  current_user_bookcases = user.bookcases;
  logged_in = true;

  const loginDiv = document.querySelector('.login-wrap');
  loginDiv.classList.toggle('hide');
  getSignin().classList.toggle('hide');
  const a = document.createElement('a');
  a.innerHTML = `Welcome, ${user.username}  `;
  a.className = 'logged_in';
  const button = document.createElement('button');
  button.className='signout';
  button.innerText="Sign Out";
  const ul = document.querySelector('ul');
  ul.lastElementChild.append(a,button);
  userPage(user);
}

function signout() {
  logged_in = false;
  getSignin().classList.toggle('hide');
  document.querySelector('a#logged_in').remove();
}

function getSignin() {
  return document.querySelector('.signin');
}

function postBookcase(bookId) {
  const reqObj = {
    "method": "POST",
    "headers": API.headers,
    "body": JSON.stringify(
      {
        "user_id": current_user,
        "book_id": bookId
      }
    )
  };
  fetch(API.bookcases,reqObj)
  .then(resp => resp.json())
  .then(bookcase => renderBookcase(bookcase.data.user_id));
  //what do we do after adding a book to bookcase
}

function destroyBookcase(id) {
  const reqObj = {
    "method": "DELETE",
    "headers": API.headers
  }
  fetch(API.bookcases + id,reqObj)
  .then(resp => resp.json())
  .then(console.log);
}

function deleteListItem(click) {
  click.target.parentNode.remove();
}

function renderBookcase(userId) {
  fetch(API.users + userId)
  .then(resp => resp.json())
  .then(userPage);
}

function userPage(user) {
  const main = document.querySelector('main');
  removeChildElementsFor(main);

  const h2 = document.createElement('h2');
  h2.innerHTML = `${user.username}'s Bookcase`;
  h2.className = "heading user-bookcase";

  const ul = document.createElement("ul");
  // user.books.forEach(book => renderBook(book, ul));
  if (user.hasOwnProperty('books') && user.books.length > 0 ) {
    console.log(user.books.length);
    for (let i = 0; i < user.books.length; i++) {
      const li = document.createElement("li");

      const bookTitle = document.createElement('p');
      bookTitle.setAttribute("title", "Book title");
      bookTitle.innerHTML = user.books[i].title;

      const bookCover = document.createElement('img');
      bookCover.setAttribute("title", "Book cover image");
      bookCover.setAttribute("src", user.books[i].cover_image);

      // 'class' and 'data-id' setup
      let targetElements = [li, bookTitle, bookCover];
      for (const targetElement of targetElements) {
        targetElement.className = 'booklist';
        targetElement.dataset.id = user.books[i].id;
      }

      li.append(bookCover, bookTitle);

      if (logged_in && user.id == current_user) {
        const rmvBtn = document.createElement('button');
        rmvBtn.innerText = "Remove";
        rmvBtn.className = 'remove-button';
        rmvBtn.dataset.id = user.bookcases[i].id;
        li.append(rmvBtn);
      }

      ul.append(li);
      main.append(h2,ul);
      // temp button hiding
      hideButtons();
    }
  } else {
    const p = document.createElement('p');
    p.innerHTML = "This Bookcase is empty";
    main.append(h2,p);
  }
  const h4 = document.createElement('h4');
  h4.className = 'books-index';
  h4.innerText = "Go back to All Bookcases";
  main.append(h4);
}

// Book Show Page
function bookPage(book) {
  let bookId = book.id;
  const main = document.querySelector('main');
  removeChildElementsFor(main);
  window.scrollTo(0,0);

  const h2 = document.createElement("h2");
  h2.innerHTML = book.title;
  h2.dataset.bookId = bookId;

  const cover = document.createElement("img");
  cover.src = book.cover_image;

  const h3 = document.createElement("h3");
  h3.innerHTML = `<span>Author</span>: ${book.author}`;

  const h4 = document.createElement("h4");
  h4.innerHTML = `<span>Publisher</span>: ${book.publisher}`;

  const desc = document.createElement("p");
  desc.innerHTML = `<span>Description</span>: ${book.description}`;

  const pages = document.createElement("p");
  pages.innerHTML = `<span>Pages</span>: ${book.page_count}`;

  const genre = document.createElement("p");
  genre.innerHTML = `<span>Genre</span>: ${book.genre}`;

  /** additional class (for specific styling for now) */
  let els = [h2, cover, h3, h4, desc, pages, genre];
  for (const el of els) {
    el.classList.add("book-details");
  }

  main.append(h2,cover,h3,h4,desc,pages,genre);

  const ownedBook = current_user_books.some( book => book.id  === bookId);
  if (logged_in && !ownedBook) {
    main.append(createAddButton());
  } else if (logged_in && ownedBook) {
    const rmvBtn = document.createElement('button');
    rmvBtn.innerText = "Remove from Bookcase";
    rmvBtn.className = "bookpage-remove-button";
    const bookcase = current_user_bookcases.find( bookcase => bookcase.book_id === bookId);
    rmvBtn.dataset.bookcaseId = bookcase.id;
    main.append(rmvBtn);
  }
}

function createAddButton() {
  const addBtn = document.createElement('button');
  addBtn.innerText = "add to Bookcase";
  addBtn.className = "bookpage-add-button";
  return addBtn;
}


