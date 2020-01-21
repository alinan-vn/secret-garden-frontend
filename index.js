


(function main() {
    // showCreateUser();
    fetchBooks();
    clickListerner();
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
//     //login = e.target.value
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
    const main = document.querySelector('.main');
    const ul = document.createElement('ul');
    books.forEach(book => renderBook(book,ul));
    main.append(ul);
};

function renderBook(book,ul) {
    const li = document.createElement('li');
    li.dataset.id = book.id;
    li.innertext = book.title;
    ul.append(li);
}
//fetchUsers

//render show User
//Username
//fetchbookList

//Book Show Page
//get coverImage
//get title
//get description
//get publisher
//get genre
//get page count