# Task Manager App

A full-stack task management application built with React and Node.js. This application allows users to create, edit, delete, and manage tasks with file attachments and due dates.

## Features

- ✅ Create, edit, and delete tasks
- 📅 Set due dates for tasks
- 📎 Attach files to tasks
- 🔍 View tasks in a clean table interface
- 📱 Responsive design with Material-UI
- 🚀 Real-time updates

## Tech Stack

### Frontend

- **React 19** - Frontend framework
- **Vite** - Build tool and development server
- **Material-UI (MUI)** - UI component library
- **Axios** - HTTP client for API calls
- **ESLint** - Code linting

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database with Mongoose ODM
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## Project Structure

```
taskManager/
├── backend/
│   ├── config/          # Configuration files (multer, etc.)
│   ├── controllers/     # Route controllers
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   └── index.js         # Server entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── config/      # Frontend configuration
│   │   └── App.jsx      # Main App component
│   └── index.html       # HTML template
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB database
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd taskManager
   ```

2. **Setup Backend**

   ```bash
   cd backend
   npm install
   ```

3. **Setup Frontend**

   ```bash
   cd frontend
   npm install
   ```

4. **Environment Configuration**

   Create a `.env` file in the backend directory:

   ```env
   PORT=8082
   MONGODB_URL=your_mongodb_connection_string
   ```

   The frontend is configured to use:

   - Local development: `http://localhost:8082`
   - Production: `https://task-manager-crio-64n5.onrender.com`

### Running the Application

1. **Start the Backend Server**

   ```bash
   cd backend
   npm run server    # Development with nodemon
   # or
   npm start        # Production
   ```

2. **Start the Frontend Development Server**

   ```bash
   cd frontend
   npm run dev
   ```

3. **Access the Application**
   - Frontend: `http://localhost:5173` (default Vite port)
   - Backend API: `http://localhost:8082`

## Available Scripts

### Backend

- `npm start` - Start production server
- `npm run server` - Start development server with nodemon
- `npm test` - Run tests (placeholder)
- `npm run build` - Build command (placeholder)

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## API Endpoints

- `GET /tasks` - Retrieve all tasks
- `POST /tasks` - Create a new task
- `PUT /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task

## Deployment

The application is configured for deployment on Render.com:

- Backend API: `https://task-manager-crio-64n5.onrender.com`
- Frontend Live URL: `https://task-manager-crio.vercel.app/`

## Contributing

This is a Crio learning project. For contributions:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

ISC License
