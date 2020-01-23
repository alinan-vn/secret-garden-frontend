let logged_in = false;
let current_user;
let current_user_books = [];

(function main() {
  fetchBooks();
  clickListener();
})();


function removeChildElementsFor(parentElement) {
  let childElement;
  while (childElement = parentElement.lastElementChild) {
    parentElement.removeChild(childElement);
  };
};

function fetchUsers() {
  fetch(API.users)
  .then(resp => resp.json())
  .then(renderUsers);
};

function renderUsers(users) {
  const main = document.querySelector('main');
  removeChildElementsFor(main);

  const ul = document.createElement("ul");
  users.forEach(user => renderUser(user, ul));
  main.append(ul);
};

function renderUser(user, ul) {
  const li = document.createElement('li');
  li.dataset.id = user.id;
  li.innerHTML = `${user.username}'s Bookcase`;
  li.className = 'userlist';
  ul.append(li);
};

//fetchbooks or search API
function fetchBooks() {
  fetch(API.books)
  .then(resp => resp.json())
  .then(renderBooks);
};

function renderBooks(books) {
  const main = document.querySelector('main');
  removeChildElementsFor(main);

  const ul = document.createElement("ul");
  books.forEach(book => renderBook(book, ul));
  main.append(ul);
};

function renderBook(book, ul) {
  const li = document.createElement("li");
  li.dataset.id = book.id;
  li.innerHTML = book.title;
  li.className = 'booklist';
  ul.append(li);
};
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
      fetch(API.users + userId)
      .then(resp => resp.json())
      .then(userPage);
      break;
    case 'add-button':
      const bookAdd = e.target.dataset.bookId;
      postBookcase(bookAdd);
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
      console.log(e.target.parentNode.previousElementSibling.lastElementChild.value);
      e.target.parentNode.previousElementSibling.lastElementChild.value = '';
      postUser();
      break;
    };
  });
};

function loginUser(uName) {
  fetch(API.users)
  .then(resp => resp.json())
  .then(users => findUser(users,uName));
};

function findUser(users,uName) {
  if (users.find(user => user.username.toLowerCase() === uName.toLowerCase())) {
    const user = users.find(user => user.username.toLowerCase() === uName.toLowerCase())
    current_user = user.id;
    logged_in = true;

    const loginDiv = document.querySelector('.login-wrap');
    loginDiv.classList.toggle('hide');
    const signin = document.querySelector('.signin');
    signin.classList.toggle('hide');
    const a = document.createElement('a');
    a.innerHTML = `Welcome, ${user.username}  <button class="signout">Sign Out</button>`;
    const ul = document.querySelector('ul');
    ul.lastElementChild.append(a);
    userPage(user);
  };
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
  .then();
};


function userPage(user) {
  const main = document.querySelector('main');
  removeChildElementsFor(main);

  const h2 = document.createElement('h2');
  h2.innerHTML = `${user.username}'s Bookcase`;

  const ul = document.createElement("ul");
  // user.books.forEach(book => renderBook(book, ul));
  for (let i = 0; i < user.books.length; i++) {
    const li = document.createElement("li");
    li.dataset.id = user.books[i].id;
    li.innerHTML = user.books[i].title;
    li.className = 'booklist';
    if (logged_in && user.id == current_user) {
      const rmvBtn = document.createElement('button');
      rmvBtn.innerText = "Remove";
      rmvBtn.className = 'remove-button';
      rmvBtn.dataset.id = user.bookcases[i].id;
      li.append(rmvBtn);
    }
    ul.append(li);
  };
  main.append(h2,ul);
};

// //Book Show Page
function bookPage(book) {
  let bookId = book.id;
  const main = document.querySelector('main');
  removeChildElementsFor(main);

  const h2 = document.createElement("h2");
  h2.innerHTML = book.title;

  const cover = document.createElement("img");
  cover.src = book.cover_image;

  const h3 = document.createElement("h3");
  h3.innerHTML = book.author;

  const h4 = document.createElement("h4");
  h4.innerHTML = book.publisher;

  const desc = document.createElement("p");
  desc.innerHTML = book.description;

  const pages = document.createElement("p");
  pages.innerHTML = `${book.page_count} pages`;

  const genre = document.createElement("p");
  genre.innerHTML = `Genre: ${book.genre}`;

  main.append(h2,cover,h3,h4,desc,pages,genre);
  const addBtn = document.createElement('button');
  addBtn.innerText = "add to Bookcase";
  addBtn.className = "add-button";
  addBtn.dataset.bookId = bookId;
  main.append(addBtn);

  // needs add/read button, only shown if logged_in
  if (!logged_in) {
      addBtn.classList.toggle('hide');
  };
};
