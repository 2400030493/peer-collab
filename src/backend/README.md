# Peer Review System Backend

A complete backend for a peer review system using Node.js, Express, and MongoDB.

## Features
- User authentication (Signup, Login with JWT)
- Review system (Create, Read, Update, Delete reviews for projects)
- MongoDB integration with Mongoose
- Environment variables support with dotenv
- Error handling middleware
- CORS enabled

## Prerequisites
- Node.js installed
- MongoDB installed and running (or a MongoDB Atlas connection string)

## Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env` file in the root directory and add the following:
    ```
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/peer-review-system
    JWT_SECRET=your_jwt_secret_key
    NODE_ENV=development
    ```

4.  **Run the application:**
    ```bash
    # For production
    npm start

    # For development (requires nodemon)
    npm run dev
    ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user and get JWT token

### Reviews
- `GET /api/reviews` - Get all reviews
- `GET /api/reviews/:id` - Get a single review
- `POST /api/reviews` - Add a new review (Authenticated)
- `PUT /api/reviews/:id` - Update a review (Authenticated, Author only)
- `DELETE /api/reviews/:id` - Delete a review (Authenticated, Author only)

## Sample Review Request Body (POST /api/reviews)
```json
{
  "title": "Excellent Project",
  "text": "This project was well-structured and easy to follow.",
  "rating": 9,
  "project": "E-commerce App"
}
```
