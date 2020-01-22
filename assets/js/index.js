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
    ul.id = "userlist";
    users.forEach(user => renderUser(user, ul));
    main.append(ul);
};

function renderUser(user, ul) {
    const li = document.createElement('li');
    li.dataset.id = user.id;
    li.innerHTML = `${user.username}'s Bookcase`;
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
    ul.id = "booklist";
    books.forEach(book => renderBook(book, ul));
    main.append(ul);
};

function renderBook(book, ul) {
  const li = document.createElement("li");
  li.dataset.id = book.id;
  li.innerHTML = book.title;
  ul.append(li);
};
//fetchUsers

//render show User
//Username

function clickListener() {
    document.addEventListener('click',function(e) {
        const click = e.target.parentNode.id
        
        switch (click) {
        case 'booklist':
            const id = e.target.dataset.id;
            fetch(API.books + id)
            .then(resp => resp.json())
            .then(bookPage);
            break;
        case 'add-button':
            const bookId = e.target.dataset.bookId;
            postBookcase(bookId);
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
        };
    });
};

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
}
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
    button.innerText = "add to Bookcase";
    button.id = "add-button";
    button.dataset.bookId = bookId;
    main.append(addBtn);

    // needs add/read button, only shown if logged_in
    if (!logged_in) {
        attBtn.classList.toggle('hide');
    };
};
