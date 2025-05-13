# Metlabs Project

## Overview

The Metlabs project is a full-stack application that leverages modern technologies to provide a robust and scalable solution. The backend is built with TypeScript and Node.js, while the frontend is developed using Next.js. The project also integrates Docker for containerization and Prisma as the ORM for database management.

## Key Features

- **Backend:** Built with TypeScript and Node.js.
- **Frontend:** Developed using Next.js.
- **Database:** Managed using Prisma ORM with PostgreSQL.
- **Containerization:** Docker is used to containerize the application for easy deployment and scalability.
- **Smart Contract Integration:** Interacts with Ethereum smart contracts using TypeChain and ethers.js.

## Project Structure

The project is organized into the following main directories:

- `metlabs-pt-back/`: Contains the backend code, including API routes, Prisma schema, and smart contract utilities.
- `webapp/`: Contains the frontend code built with Next.js.
- `docs/`: Documentation for the project, including API references and development guides.

## Database Management with Prisma and Docker

### Prisma ORM

Prisma is used as the ORM to manage the PostgreSQL database. It provides a type-safe and developer-friendly way to interact with the database.

### Docker Integration

Docker is used to containerize the database and the application. This ensures consistency across development and production environments.

### Setting Up the Database

1. **Install Docker:** Ensure Docker is installed on your system.
2. **Start the Database Container:** Use the `docker-compose.yml` file to start the PostgreSQL database container.

   ```bash
   docker-compose up -d
   ```

3. **Run Prisma Migrations:** Apply the Prisma migrations to set up the database schema.

   ```bash
   npx prisma migrate dev
   ```

## Environment Variables

The project requires the following environment variables to be set in a `.env` file:

### Backend

- `DATABASE_URL`: The connection string for the PostgreSQL database.
- `PORT`: The port on which the backend server runs.
- `JWT_SECRET`: Secret key for JWT authentication.
- `ALCHEMY_API_URL`: Alchemy API URL for Ethereum network interaction.
- `ALCHEMY_SEPOLIA_API_KEY`: Alchemy API key for the Sepolia network.
- `CONTRACT_ADDRESS`: Address of the deployed smart contract.
- `WALLET_PRIVATE_KEY`: Private key for the wallet used in smart contract interactions.

## Running the Project

### Run Backend

1. Navigate to the backend directory:

   ```bash
   cd metlabs-pt-back
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

### Run Frontend

1. Navigate to the frontend directory:

   ```bash
   cd webapp
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

## Notes

- Ensure the `.env` file is properly configured before running the project.
- Use Docker to manage the database container for consistency.
- Prisma migrations should be applied whenever the database schema is updated.

## References

- [Prisma Documentation](https://www.prisma.io/docs/)
- [Docker Documentation](https://docs.docker.com/)
- [Ethers.js Documentation](https://docs.ethers.org/)
- [TypeChain Documentation](https://github.com/dethcrypto/TypeChain)
