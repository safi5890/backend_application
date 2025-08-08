# Todo App with Authentication

A full-featured Todo application built with Node.js, Express, and SQLite with JWT-based authentication and authorization.

## Features

- **User Authentication**
  - User registration with password hashing (bcrypt)
  - User login with JWT token generation
  - Password security with bcryptjs

- **Todo Management**
  - Create new todos
  - Read/View todos (with pagination)
  - Update todo status (mark as completed/incomplete)
  - Delete todos
  - User-specific todos (users can only access their own todos)

- **Security**
  - JWT (JSON Web Token) based authentication
  - Protected routes requiring valid tokens
  - Password hashing for secure storage
  - Environment variable configuration

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: SQLite with sqlite package
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Environment**: dotenv support

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/safi5890/backend_application.git
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   touch .env
   ```
   Add the following to your `.env` file:
   ```
   JWT_SECRET=your-secret-key-here
   PORT=5000
   ```

4. **Run the application:**
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication Routes

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
    "username": "user@example.com",
    "password": "your-password"
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
    "username": "user@example.com",
    "password": "your-password"
}
```

### Todo Routes (Protected - Requires JWT Token)

#### Get All Todos
```http
GET /todos
Authorization: <jwt-token>
```

#### Create New Todo
```http
POST /todos
Content-Type: application/json
Authorization: <jwt-token>

{
    "task": "Your todo task"
}
```

#### Update Todo
```http
PUT /todos/:id
Content-Type: application/json
Authorization: <jwt-token>

{
    "completed": 1
}
```

#### Delete Todo
```http
DELETE /todos/:id
Authorization: <jwt-token>
```

## Database Schema

### Users Table
- `id`: Primary key (auto-increment)
- `username`: User's email/username (unique)
- `password`: Hashed password

### Todos Table
- `id`: Primary key (auto-increment)
- `user_id`: Foreign key referencing users.id
- `task`: Todo task description
- `completed`: Boolean (0 or 1)
- `created_at`: Timestamp

## Project Structure

```
chapter_3/
├── src/
│   ├── routes/
│   │   ├── authRoutes.js    # Authentication endpoints
│   │   └── todoRoutes.js    # Todo CRUD endpoints
│   ├── middleware/
│   │   └── authMiddleware.js # JWT verification middleware
│   ├── db.js               # Database configuration
│   └── server.js           # Main server file
├── todo-app.rest          # REST client requests for testing
├── package.json
├── .env                   # Environment variables
├── .gitignore
└── README.md
```

## How to Test

Use the provided `todo-app.rest` file with the REST Client extension in VS Code, or use tools like Postman or curl.

### Testing Flow:
1. Register a new user
2. Login to get JWT token
3. Use the token to access protected todo routes
4. Create, read, update, and delete todos

## Security Features

- **Password Hashing**: All passwords are hashed using bcryptjs before storage
- **JWT Authentication**: Stateless authentication using JSON Web Tokens
- **Protected Routes**: Todo operations require valid JWT token
- **User Isolation**: Users can only access their own todos

## Development

The project uses Node.js `--watch` flag for automatic server restart during development.

```bash
npm run dev
```

## Environment Variables

- `JWT_SECRET`: Secret key for JWT token signing
- `PORT`: Server port (default: 5000)

## License

ISC License

## Author

safi khan
