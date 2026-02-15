# Bellcorp Event Management Application

A full-stack Event Discovery and Registration platform built using the MERN stack.
Users can browse events, search and filter dynamically, register for events, and manage their personal dashboard.

## Features
### Authentication

- User Registration
- User Login (JWT-based)
- Protected Routes for authenticated users
- Password hashing using bcryptjs

### Event Discovery Experience

- Browse large event collections
- Real-time search using flexible text queries
- Filter events by location, category, and date
- Dynamic data fetching
- Maintains browsing state across navigation
- Handles changing event availability

### Event Details

#### Each event contains:

- Event Name
- Organizer
- Location
- Date & Time
- Description
- Available Seats / Capacity
- Category or Tags

#### Users can:

- View event details
- Register for an event
- Cancel event registration
- Prevent duplicate registrations

### User Dashboard

- View registered events
- Upcoming events (date > today)
- Past events history (date < today)

## 🛠 Tech Stack

### Frontend
- React.js (Functional Components + Hooks)
- Tailwind CSS
- React Router DOM
- Context API for global authentication state

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs

## Project Structure

Event Management Application/
│
├── client/        # React Frontend
│   ├── src/
│   ├── components/
│   └── pages/
│
├── server/        # Node/Express Backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── config/
│
├── README.md
└── .gitignore

## Authentication Flow

- JWT stored in localStorage
- Protected routes use Bearer token
- Backend middleware validates token

## Dashboard Logic

- Fetch user registrations
- Categorized into:
   1.Upcoming Events (future date)
   2.Past Events (past date)

## Database Design
Relationships
User
|
Registration
|
Event
- One User - Many Registrations
- One Event - Many Registrations
- Registration links UserId and EventId

## Installation & Setup (Run Locally)
### Clone the Repository

- git clone <your-repository-url>
- cd bellcorp-event-management

### Backend Setup
- cd server
- npm install

#### Create a .env file inside the server folder:

- MONGO_URI=your_mongodb_connection_string
- JWT_SECRET=your_secret_key
- PORT=5000

#### Start the server:

- npm start

### Frontend Setup

- cd client
- npm install
- npm start

### API Base URL

- Make sure the frontend .env file contains:
- REACT_APP_BASE_URL=https://your-backend-link


## Live Demo

Deployment links will be updated after hosting on Vercel (Frontend) and Render (Backend).