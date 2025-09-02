# School API

This is a simple API for managing students, classes, and courses.

## Technologies

This project uses the following technologies:

* **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
* **Fastify**: A fast and low overhead web framework, for Node.js.
* **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
* **PostgreSQL**: A powerful, open source object-relational database system.
* **Drizzle ORM**: A TypeScript ORM for SQL databases.
* **Docker**: A platform for developing, shipping, and running applications in containers.
* **Fastify Swagger**: Plugin for Fastify that provides Swagger/OpenAPI documentation.
* **Fastify Swagger UI**: Plugin for Fastify that provides a web UI for Swagger/OpenAPI documentation.
* **Zod**: A TypeScript-first schema declaration and validation library.
* **Pino Pretty**: A beautiful and customizable logger for Pino.
* **Fastify Type Provider Zod**: Zod type provider for Fastify.
* **@scalar/fastify-api-reference**: A plugin to generate beautiful API reference documentation.
* **pg**: Non-blocking PostgreSQL client for Node.js.
* **Argon2**: A library for securely hashing passwords.
* **JSON Web Token (JWT)**: A compact, URL-safe means of representing claims to be transferred between two parties.

### Development & Testing Tools

* **Vitest**: A blazing fast unit-test framework powered by Vite.
* **Supertest**: A library for testing Node.js HTTP servers.
* **@faker-js/faker**: A library to generate massive amounts of fake data for testing purposes.
* **Drizzle Kit**: A CLI companion for Drizzle ORM, used for migrations and database introspection.
* **Dotenv CLI**: A tool to load environment variables from a `.env` file.
* **Vitest Coverage V8**: A V8 coverage provider for Vitest.

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

* [Node.js](https://nodejs.org/en/)
* [Docker](https://www.docker.com/)

### Installation

1. Clone the repo

    ```sh
    git clone https://github.com/your_username_/Project-Name.git
    ```

2. Install NPM packages

    ```sh
    npm install
    ```

3. Start the database with Docker

    ```sh
    docker-compose up -d
    ```

4. Run the development server

    ```sh
    npm run dev
    ```

## API Documentation (Swagger)

Once the development server is running, you can access the API documentation via Swagger UI at:

`http://localhost:3333/docs`

This interactive documentation allows you to explore the available endpoints, their parameters, and expected responses.

## API Endpoints

(Coming soon)
