# HireMe

HireMe is a React Native application developed with Expo for job finding, backed by a Node.js server. This app allows users to search for job postings, apply for jobs, and receive notifications through Firebase Cloud Messaging (FCM).

## Features

- **Job Search**: Browse and search for job postings.
- **Application Process**: Apply for jobs directly through the app.
- **Notifications**: Receive updates and notifications about job postings and applications.
- **User Authentication**: Secure login and registration using JWT.

## Tech Stack

- **Frontend**: React Native (Expo)
- **Backend**: Node.js
- **Database**: MongoDB
- **Push Notifications**: Firebase Cloud Messaging (FCM)

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (version 12 or higher)
- [MongoDB](https://www.mongodb.com/) database
- [Expo CLI](https://docs.expo.dev/get-started/installation/) for running the app

### Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/alijalloul/HireMe.git
   cd HireMe
   ```

2. **Install dependencies**:

   For the frontend:

   ```bash
   cd frontend
   npm install
   ```

   For the backend:

   ```bash
   cd backend
   npm install
   ```

3. **Environment Variables**:

   Create a `.env` file in the `backend` directory and add the following variables:

   ```env
   MONGODB_URL=<your_mongodb_connection_string>
   FCM_SERVER_KEY=<your_fcm_server_key>
   JWT_SECRET=<your_jwt_secret>
   ```

4. **Run the Application**:

   Start the backend server:

   ```bash
   cd backend
   npm start
   ```

   Start the Expo app:

   ```bash
   cd frontend
   expo start
   ```

## License

This project is licensed under the MIT License.
