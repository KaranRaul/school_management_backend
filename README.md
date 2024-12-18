# School Management System API

This is a Node.js API to manage school data, including adding schools and retrieving a list of schools sorted by proximity to a user-specified location using PostgreSQL.

## Features

- Add a school with name, address, latitude, and longitude.
- List schools sorted by proximity to a given latitude and longitude.

## Technologies

- **Node.js**
- **Express.js**
- **PostgreSQL** (Aiven)
- **Haversine formula** for calculating distances.

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (Aiven or local setup)
- `.env` file for environment variables

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/school-management-api.git
   cd school-management-api

2. Install dependencies:
    ```bash
    npm install

3. Set up a PostgreSQL instance (Aiven or local):
    ```bash
    PG_HOST=your_pg_host
    PG_PORT=your_pg_port
    PG_USER=your_pg_user
    PG_PASSWORD=your_pg_password
    PG_DATABASE=your_pg_database

4. Start the server:
    ```bash
    npm start