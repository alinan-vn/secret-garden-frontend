let logged_in = false;
let current_user;
let current_user_books = [];

(function main() {
    // showCreateUser();
    fetchBooks();
    clickListener();
})();

// function showCreateUser() {
//     const button = document.querySelector('button#create-user');
//     button.addEventListener('click', showUserForm(event));
// };

// function loginForm() {
//     submitListener();
//     //enter username User.create_or_find_by username
//     //document.querySelector('#username')
//     //if logged in, hide form, add logout button
    
// };

// function submitListener() {
//     const form = document.querySelector('form#login');
//     form.addEventListener('submit',login(event));
// };

// function login(e) {
//     e.preventDefault();
//     //const username = e.target.value
    //fetch(API.users + username)
    //.then(resp => resp.json())
    //.then(logUserIn);
// };

//function logUserIn(user) {
    //current_user = user.id;
    //current_user_books = user.books;
// };

//list of books or booksearch that try to pull from 
//display list of users
//book show page from with add/read button
//user profile page with list of read books

//fetchbooks or search API
function fetchBooks() {
    fetch(API.books)
    .then(resp => resp.json())
    .then(renderBooks);
};

function renderBooks(books) {
    const main = document.querySelector('div.main');
    const ul = document.createElement('ul');
    ul.id = "booklist";
    books.forEach(book => renderBook(book,ul));
    main.append(ul);
};

function renderBook(book,ul) {
    const li = document.createElement('li');
    li.dataset.id = book.id;
    li.innerHTML = book.title;
    ul.append(li);
}
//fetchUsers

//render show User
//Username

function clickListener() {

    
    document.addEventListener('click',function(e) {
        //switch case 
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
    let bookId = book.id
    const main = document.querySelector('.main');
    main.firstElementChild.remove();

    const h2 = document.createElement('h2');
    h2.innerHTML = book.title;
    
    const cover = document.createElement('img');
    cover.src = book.cover_image;

    const h3 = document.createElement('h3');
    h3.innerHTML = book.author;

    const h4 = document.createElement('h4');
    h4.innerHTML = book.publisher;

    const desc = document.createElement('p');
    desc.innerHTML = book.description;

    const pages = document.createElement('p');
    pages.innerHTML = `${book.page_count} pages`;

    const genre = document.createElement('p');
    genre.innerHTML = `Genre: ${book.genre}`;

    main.append(h2,cover,h3,h4,desc,pages,genre);

    if (logged_in) {
        if (!current_user_books.some(bookId)){
            const addBtn = document.createElement('button');
            button.innerText = "add to Bookcase";
            button.id = "add-button";
            button.dataset.bookId = bookId;
            main.append(addBtn);
        };
    };

    //needs add/read button, only shown if logged_in
    // if (!logged_in) {
    //     genre.classList.toggle('hide');
    // }
};