# To-Do App

A full-stack To-Do application built with **React**, **Express**, and **Prisma**, featuring user authentication, profile management, and a modern UI with dark/light mode.  

<img width="1913" height="995" alt="Screenshot 2026-01-08 170225" src="https://github.com/user-attachments/assets/96b40170-4b70-4359-a4ce-db42e6ac9636" />

This project demonstrates a complete authentication flow using **JWT**, task management with CRUD operations, filtering, pagination, and user personalization.

Live project url: https://to-do-theta-ten-77.vercel.app/
---

## Features

- **Authentication**: Login and Signup using JWT
- **Profile Management**: Edit profile details and upload profile picture
- **UI Modes**: Switch between dark and light mode
- **Task Management**: Create, edit, delete, and view tasks
- **Pagination & Filtering**: Easily browse and filter tasks
- **Secure Backend**: JWT authentication protects API endpoints

---

## Tech Stack

- **Frontend**: React.js, React Router, Tailwind CSS 
- **Backend**: Node.js, Express.js
- **Database**: Prisma ORM with PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **File Uploads**: Profile pictures stored on server or cloud storage
- **Environment Management**: dotenv

---

## Folder Structure

<img width="281" height="803" alt="Screenshot 2026-01-08 165014" src="https://github.com/user-attachments/assets/cd077ecd-e925-4a5d-9737-a20c2bd21d7b" />

---

## Getting Started

### Prerequisites
- Node.js >= 18
- npm or yarn
- PostgreSQL database or url to connect to your online DB
- Git

---

### Installation

#### Backend

cd backend
npm install

Create a .env file in backend:

PORT = 5000
DATABASE_URL = your_DB_URL
JWT_SECRET = your_secret
DUMMY_HASH = your_hash
CLOUDINARY_CLOUD_NAME = your_cloudinary_cloud_name
CLOUDINARY_API_KEY = your_cloudinary_api_key
CLOUDINARY_API_SECRET = your_cloudinary_api_secret
CLOUDINARY_DEFAULT_AVATAR = your_cloudinary_default_avatar

CLIENT_URL = http://localhost:5173
NODE_ENV = development

Run migration (if using Prisma):
your_cloudinary_cloud_name

Start Backend
npm run dev or node server.js


#### Frontend
cd frontend
npm install

Create a .env file in frontend:
VITE_API_URL=http://localhost:5000
VITE_MODE=development

npm run dev
The frontend will run on http://localhost:5173 by default.

### API Endpoints (Backend)

#### Authentication (/api/auth)

| Method | Endpoint       | Description                 | Auth Required |
| ------ | -------------- | --------------------------- | ------------- |
| POST   | `/auth/signup` | Register a new user         | No            |
| POST   | `/auth/login`  | Login and receive JWT token | No            |
| POST   | `/auth/logout` | Logout the current user     | Yes           |

#### User (/api/user)

All profile endpoints require a valid JWT in the Authorization: Bearer <token> header.

| Method | Endpoint                 | Description               |
| ------ | ------------------------ | ------------------------- |
| GET    | `/users/me`              | Get current user profile  |
| PUT    | `/users/edit`            | Edit user profile details |
| POST   | `/users/uploadprofile`   | Upload profile picture    |
| PUT    | `/users/change-password` | Change user password      |

#### Todo (/api/todo)

All todo endpoints require JWT authentication.

| Method | Endpoint            | Description               |
| ------ | ------------------- | ------------------------- |
| POST   | `/todos/add`        | Add a new todo            |
| GET    | `/todos/get`        | Get all todos             |
| GET    | `/todos/get/:id`    | Get a specific todo by ID |
| PUT    | `/todos/edit/:id`   | Edit a todo by ID         |
| DELETE | `/todos/delete/:id` | Delete a todo by ID       |

---
## Screenshots

### Add Task

<img width="1909" height="996" alt="Screenshot 2026-01-08 170340" src="https://github.com/user-attachments/assets/f8d92d86-6f57-459c-859e-388b837b3f14" />

### Edit Task

<img width="1914" height="998" alt="Screenshot 2026-01-08 170421" src="https://github.com/user-attachments/assets/c276b6eb-6781-4f04-a3a1-7f0a33dd758c" />

### Profile 

<img width="1909" height="998" alt="Screenshot 2026-01-08 170454" src="https://github.com/user-attachments/assets/a32bae3a-e7f2-4916-a4d9-452cb08237f2" />

### Login 

<img width="1910" height="991" alt="Screenshot 2026-01-08 170526" src="https://github.com/user-attachments/assets/4dfba790-63fc-4347-8ad5-c10a465f5d7d" />

### Light Mode

<img width="1917" height="997" alt="Screenshot 2026-01-08 170603" src="https://github.com/user-attachments/assets/5d10df24-82c8-4982-899f-4b31cf16a129" />





