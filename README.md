# Backend GoKap

This repository contains the backend implementation for the GoKap project. It is built using TypeScript, Express, and TypeORM.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Running the Application with Docker](#running-the-application-with-docker)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v20 or higher)
- npm (v6 or higher)
- PostgreSQL
- Docker (if you want to run the application using Docker)

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/gracious7/backend_gokap.git
    cd backend_gokap
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Set up the environment variables. Create a `.env` file in the root of the project and add the following variables:

    ```env
    PORT=3000
    DATABASE_HOST=localhost
    DATABASE_PORT=5432
    DATABASE_USERNAME=your_db_username
    DATABASE_PASSWORD=your_db_password
    DATABASE_NAME=your_db_name
    ```

4. Run the database migrations:

    ```bash
    npm run typeorm migration:run
    ```

## Running the Application

To start the application, use the following command:

```bash
npm run dev
```

This will start the server in development mode. The server will be accessible at `http://localhost:3000`.

## Running the Application with Docker

To run the application using Docker, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/gracious7/backend_gokap.git
    cd backend_gokap
    ```

2. Set up the environment variables. Create a `.env` file in the root of the project and add the following variables:

    ```env
    PORT=3000
    DATABASE_HOST=database
    DATABASE_PORT=5432
    DATABASE_USERNAME=your_db_username
    DATABASE_PASSWORD=your_db_password
    DATABASE_NAME=your_db_name
    ```

3. Build and run the Docker containers:

    ```bash
    docker-compose up --build
    ```

This will start the server and the PostgreSQL database in Docker containers. The server will be accessible at `http://localhost:3000`.

To stop the containers, use:

```bash
docker-compose down
```

## Project Structure

Here is a brief overview of the project structure:

```
.
├── src
│   ├── controllers
│   ├── entities
│   ├── middlewares
│   ├── routes
│   ├── utils
│   ├── index.ts
├── .env
├── Dockerfile
├── docker-compose.yml
├── ormconfig.json
├── package.json
├── tsconfig.json
└── README.md
```

- **controllers**: Contains the controller files for handling HTTP requests.
- **entities**: Contains the TypeORM entity definitions.
- **middlewares**: Contains the custom middleware files.
- **routes**: Contains the route definitions.
- **utils**: Contains utility functions and classes.

## Environment Variables

The following environment variables are used in the project:

- `PORT`: The port on which the server will run.
- `DATABASE_HOST`: The host of the PostgreSQL database.
- `DATABASE_PORT`: The port of the PostgreSQL database.
- `DATABASE_USERNAME`: The username for the PostgreSQL database.
- `DATABASE_PASSWORD`: The password for the PostgreSQL database.
- `DATABASE_NAME`: The name of the PostgreSQL database.

## API Endpoints

Here are some of the main API endpoints available in the application:

### Task Endpoints

- **GET /api/tasks**: Get all tasks for the authenticated user.
- **POST /api/tasks**: Create a new task.
- **PUT /api/tasks/:taskId**: Update a task.
- **DELETE /api/tasks/:taskId**: Delete a task.
- **GET /api/tasks/sortPriority**: Get tasks sorted by priority.
- **GET /api/tasks/sortStatus**: Get tasks sorted by status.

## Contributing

Contributions are always welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
