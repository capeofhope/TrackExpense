# Expense Tracker

A simple full-stack personal finance tool to record and review expenses.

## Stack
- **Backend**: Node.js, Express, MongoDB (Mongoose)
- **Frontend**: React (Vite), Tailwind CSS

## Prerequisites
- Node.js installed
- MongoDB installed and running locally on port 27017 (or update `.env`)

## Setup & Run

### 1. Backend
```bash
cd backend
npm install
# Ensure MongoDB is running
npm start
```
Server runs on `http://localhost:3001`.

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`.

## Features
- Add new expenses (amount, category, description, date)
- View list of expenses
- Filter by category
- Sort by date (newest first)
- Total expense calculation
- Data persistence using MongoDB
- Retry logic for API requests

## Design Decisions
- **Architecture**: Separated frontend and backend for scalability.
- **Database**: MongoDB chosen for flexibility and ease of use with Node.js.
- **Styling**: Tailwind CSS for rapid UI development and clean look.
- **Zero-Config**: Attempted to use defaults where possible (localhost mongo).

## Trade-offs
- No authentication (out of scope).
- Minimal validation on backend (basic types).
- No complex state management (Redux/Context) as local state was sufficient.
