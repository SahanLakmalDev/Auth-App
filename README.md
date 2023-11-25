# MERN Authentication App

Welcome to the MERN Authentication App, a powerful full-stack web application that showcases the seamless integration of MongoDB, Express.js, React.js, and Node.js to deliver a robust authentication experience.

**Source code:** [GitHub Repository](https://github.com/SahanLakmalDev/Auth-App.git)

## Table of Contents

1. [Overview](#overview)
    - [Frontend Setup](#frontend-setup)
    - [Authentication Mastery](#authentication-mastery)
    - [Efficient State Management with Redux Toolkit](#efficient-state-management-with-redux-toolkit)
    - [Ironclad Profile Pages](#ironclad-profile-pages)
    - [Dynamic Profile Management](#dynamic-profile-management)
    - [Account Deletion](#account-deletion)
    - [Masterful CRUD Operations](#masterful-crud-operations)
    - [Deployment and Sharing](#deployment-and-sharing)
2. [Technologies](#technologies)
    - [Frontend](#frontend)
    - [Backend](#backend)
3. [How to Use](#how-to-use)
    - [Installation](#installation)
    - [Configuration](#configuration)
    - [Run the App](#run-the-app)
    - [Open in Browser](#open-in-browser)
    - [Explore and Enjoy](#explore-and-enjoy)
4. [License](#license)
5. [Version](#version)

## Overview

Utilizing the latest versions of React, MongoDB, Node.js, and Express, this project covers crucial aspects to ensure your success.

### Frontend Setup

- Install React.js and integrate Tailwind CSS.
- Utilize React Router Dom for a robust routing system.
- Create authentication pages as a foundation for the application.

### Authentication Mastery

- Support email and password authentication via JSON Web Tokens (JWT).
- Explore the integration of Google OAuth for seamless sign-ins.

### Efficient State Management with Redux Toolkit

- Use Redux Toolkit for streamlined state management.

### Ironclad Profile Pages

- Implement dual layers of protection for certain pages, ensuring security on both client and backend sides.

### Dynamic Profile Management

- Enable users to update profiles, including usernames, emails, and passwords.
- Explore image profile updates using Firebase Storage.

### Account Deletion

- Safely delete user accounts with checks for JWT cookies.

### Masterful CRUD Operations

- Dive into Create, Read, Update, and Delete (CRUD) operations using MongoDB.

### Deployment and Sharing

- Harness Render to deploy your full-stack authentication app without cost.
- Share it with others or add it to your portfolio.

## Technologies

### Frontend

- React.js
- Tailwind CSS
- React Router Dom
- Redux Toolkit

### Backend

- Node.js
- Express
- MongoDB
- JSON Web Tokens (JWT)
- Firebase Storage (for image profile updates)

## How to Use

### Installation 
`git clone https://github.com/sahandghavidel/mern-auth.git`

### Configuration

Install dependencies: `npm install` (in the root directory and the 'client' directory)


### Run the App
Create a `.env` file in the root of the project and in the `client` directory with the following content:

#### Root Directory (.env)

```env
MONGO=Your MongoDB Key

JWT_SECRET=YOUR_JWT_SECRET
```
#### Client Directory (.env)
```
VITE_FIREBASE_API=Your FIREBASE Key
```
#### Navigate to the client directory
```
cd client
npm run dev
```
The React development server will be running on http://localhost:3000

#### Navigate to the api directory
```
cd api
npm run dev
```
The server will be running on http://localhost:5000

### Explore and Enjoy
Explore the live demo: [MERN Authentication App](https://mern-auth-agw4.onrender.com/)


## License
This project is licensed under the MIT license. See [License.txt](License.txt)

## Version 
1.0.0