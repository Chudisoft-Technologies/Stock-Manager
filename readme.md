# Stock Management System

This project is a simple stock management system built with Angular for the frontend, Flask for the backend, and MongoDB database.

## Features

- CRUD operations for managing items, suppliers, staff, and PPEs.
- Responsive user interface.
- RESTful API endpoints for interacting with the database.
- User authentication and authorization.

## Setup Guide

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- Node.js and npm (Node Package Manager)
- Python 3.x
- MongoDB (or you can use a cloud-based MongoDB service)

### Installation

1. Clone the repository:
    bash
    ``git clone <repository_url>``

# Navigate to the project directory

``cd stock-manager``

# Install backend dependencies

``cd "Python API"
pip install -r requirements.txt``

# Set up the MongoDB database

- Install MongoDB on your system if you haven't already

- Start the MongoDB service

- Create a new database for the project (e.g., stock_db)

- Configure the backend

- Rename .env.example to .env

- Update .env file with your MongoDB connection URI and other configuration settings

# Run the backend server

``python main.py``

# Install frontend dependencies

``cd "Angular UI"``
``npm install``

# Configure the frontend

- Update src/environments/environment.ts and src/environments/environment.prod.ts files with the appropriate backend API URL

- Run the frontend development server

``npm start``

- Open your web browser and navigate to http://localhost:4200 to view the application.

# Usage
- Sign up for an account or log in if you already have one.
- Login and navigate to the dashboard.
- Use the navigation menu to access different features such as managing items, suppliers, staff, and PPEs.
- Perform CRUD operations on the respective entities.
