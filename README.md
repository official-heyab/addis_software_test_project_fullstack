## MERN Stack CRUD Song Application (Dockerized)

This project is a full-stack application built with the MERN stack (MongoDB, Express, React, and Node.js) for CRUD (Create, Read, Update, Delete) operations on song information. The application is Dockerized for easy deployment and development.

### Prerequisites

* Docker installed: [https://www.docker.com/](https://www.docker.com/)

### Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/official-heyab/addis_software_test_project_fullstack.git
   ```

2. **Run the application:**

   ```bash
   docker-compose up -d
   ```

   This command will build the Docker images for the frontend, backend, and MongoDB services and then start them in detached mode (`-d`).

### Accessing the application

* **Frontend:** http://localhost:80 
* **Backend API:** http://localhost:5000 
* **MongoDB:** You can access MongoDB using a client tool like MongoDB Compass by connecting to `localhost:27017` (default port).



### Contributing

Feel free to contribute to this project by creating pull requests. We appreciate any suggestions or improvements!
