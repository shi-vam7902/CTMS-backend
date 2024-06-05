Sure, here's the updated README file with the database connection folder included in the folder structure:

---

# Collaborative Task Management System

## Overview

The Collaborative Task Management System is a backend application designed for managing projects and tasks collaboratively, similar to platforms like Trello or Asana. This system allows users to create projects, manage tasks within projects, assign tasks to team members, and track progress. The application features user authentication, role-based access control, and email notifications for task updates.

---

## 🚀 Running the Project

### Prerequisites

Ensure you have the following installed:
- Node.js
- MongoDB or MySQL
- Git

### Steps to Run the Project

1. **Clone the repository:**
   ```sh
   git clone https://github.com/shi-vam7902/CTMS-backend.git
   cd CTMS-backend
   ```

2. **Install project dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the required environment variables (example provided in `.env.example`).

4. **Start the server using nodemon:**
   ```sh
   nodemon index.js
   ```

5. **Access the application on port 3000 (recommended):**
   ```sh
   http://localhost:3000
   ```

Feel free to use a different port if port 3000 is already in use, but it's recommended to stick with the default port for consistency.

---

## 📁 Folder Structure

```
- 🎮 controller/
  - [Controller files]
- 📦 model/
  - [Model files]
- 🛣️ routes/
  - [Route files]
- 🛠️ util/
  - [Utility files]
- 🛡️ services/
  - [Service files]
- ⚙️ config/
  - [Configuration files]
- 🗄️ database/
  - dbconnection.js
- 📦 package.json
- 🚪 index.js (*Entry point*)
```

---

## 🛠️ Components

1. **🎮 controller/**: Contains individual controller files responsible for handling HTTP requests and responses.

2. **📦 model/**: Houses model files, representing the data structures and business logic of the application.

3. **🛣️ routes/**: Contains route files defining the application's endpoints and their corresponding controller methods.

4. **🛠️ util/**: Includes utility files providing common functionalities or helper functions used across the application.

5. **🛡️ services/**: Contains service files encapsulating complex business logic or external integrations.

6. **⚙️ config/**: Holds configuration files for setting up environment variables, database connections, etc.

7. **🗄️ database/**: Contains the database connection file (`dbconnection.js`) for setting up and managing the database connection.

8. **📦 package.json**: Manages project dependencies and scripts.

9. **🚪 index.js**: Entry point of the application.

---

## 📋 API Documentation

### Authentication and Authorization

- **User Authentication**: Implement JWT (JSON Web Tokens) for secure login and session management.
- **Social Media Login**: Support login via Google.
- **User Roles**: Define roles (admin, member) with different access levels.

### Project and Task Management

- **Project Management**: API endpoints to create, update, and delete projects.
- **Task Management**: Create tasks within projects, assign them to team members, set due dates, and track statuses (to-do, in progress, completed).

### Collaboration Features

- **Invite Team Members**: Features for users to invite team members to projects and assign tasks.
- **Email Notifications**: Trigger email notifications for task assignments, status changes, and comments.

### Data Modeling and Relationships

- **Database**: Use MongoDB or MySQL to model projects, tasks, users, and their relationships.

### Advanced Querying and Filtering

- **Task Management**: Advanced querying and filtering options (status, due date, assignee), and sorting and pagination of task lists.

### Error Handling and Validation

- **Error Handling**: Implement robust error handling and data validation.
- **Middleware**: Use middleware to validate incoming requests and handle exceptions.

---

## 🚀 Usage

- Ensure proper installation of dependencies by running `npm install`.
- Start the application by running `npm start`.
- Utilize `.then()` and `.catch()` for error handling throughout the codebase.
- Maintain strict adherence to schema validations using the Zod middleware.

---

## 📝 Notes

- Schema validations should be performed exclusively using the Zod middleware. Direct schema validations are not allowed.
- Follow the MVC pattern diligently to ensure clean separation of concerns and maintainable codebase.

---

## 🛠️ Tools and Technologies

- Node.js
- Express.js
- MongoDB or MySQL
- JWT for authentication
- Nodemailer for email notifications

---

## 📄 Documentation

Document the API endpoints, request/response formats, and authentication mechanisms for client developers. Use tools like Postman to create a collection for testing and interacting with the API endpoints.

---

## 🗄️ Database

Ensure to share the database link or the database file with stored data.

---

## 📝 License

This project is licensed under the MIT License.

---

If you encounter any issues or have questions regarding the setup, feel free to reach out for assistance.

---

Feel free to modify and extend this README as necessary for your project documentation.

---

This README should give a comprehensive guide to setting up, running, and understanding the backend of the Collaborative Task Management System.
