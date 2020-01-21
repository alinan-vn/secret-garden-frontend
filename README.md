README


Users
has_many UsersBooks
has_many books
username

UsersBooks
belongs_to user, books

Books
has_many UsersBooks
has_many Users
belongs_to Author, Publisher
title
cover_image
author(id)
publisher(id)
page_count
genre

Publisher
has_many books
name

Author
has_many books
name