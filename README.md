Clone the repository:
    git clone https://github.com/Saroj1132/library-management-api.git
    cd library-management-api

------------------------------------------------------------------------------------
Install dependencies:
    npm install

------------------------------------------------------------------------------------

After running npm install, create a new database called lms as defined in db/config/config.json.

------------------------------------------------------------------------------------
Uncomment the sync method in each model to create the tables in the database.

------------------------------------------------------------------------------------
Run the application:
    node app.js

------------------------------------------------------------------------------------

API Endpoints
    Authentication

    POST /api/v1/register
        Registers a new user (admin, librarian, or member). The password is auto-generated and emailed to the user.

    POST /api/v1/login
        Logs in an existing user and returns a JWT token for subsequent requests.

Book Management

    POST /api/v1/add
        Adds a new book (admin only).

    PUT /api/v1/update/:id
        Updates an existing book's details (admin only).

    DELETE /api/v1/delete/:id
        Deletes a book from the system (admin only).

    GET /api/v1/view
        Views all available books (librarian or member).


Borrowing & Returning Books

    POST /api/v1/borrow
        Allows a member to borrow a book (member only).

    POST /api/v1/return
        Allows a member to return a borrowed book (member only).

    POST /api/v1/record
        Lists borrowing and returning records (librarian only).

User Management

    POST /api/v1/addusers
        Adds a new user (admin only).

    PUT /api/v1/updateUser
        Updates an existing user's details (admin only).

    DELETE /api/v1/deleteUser/:userId
        Deletes a user from the system (admin only).


------------------------------------------------------------------------------------