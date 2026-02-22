# DecoyPhrase Backend

## Abstract

DecoyPhrase Backend is an enterprise-grade API gateway and bridge designed to facilitate secure, high-throughput interactions with the Arweave permanent storage network via the Turbo SDK. It serves as the centralized orchestration layer for data persistence, wallet initialization, and credit management within the DecoyPhrase ecosystem.

## Architecture

The system implements a Proxy/Gateway architectural pattern built on the Next.js App Router framework. It acts as a trusted middleware layer between client-side applications and decentralized storage protocols.

Key design principles include:

1. **Security Abstraction:** Cryptographic signing operations are performed exclusively server-side using a Master Wallet JWK, preventing exposure of sensitive keys to the client.
2. **Access Control:** All endpoints are protected by a Bearer token authentication mechanism.
3. **Stateless Scalability:** The backend remains stateless, leveraging the Turbo SDK for atomic data bundling and dispatch to the Arweave network.
4. **CORS Enforcement:** Strict cross-origin resource sharing policies are implemented to restrict access to authorized frontend domains.

## Prerequisites

- Node.js LTS (Version 20.x or higher)
- npm version 10.x or higher
- Valid Arweave Master Wallet (JWK JSON format)

## Installation

Clone the repository and install the required dependencies:

```bash
git clone <repository-url>
cd decoyphrase-backend
npm install
```

## Configuration

Configure the following environment variables in a `.env.local` file at the project root:

- `MASTER_WALLET_JWK`: The JSON-formatted Arweave wallet key.
- `API_SECRET_KEY`: A high-entropy string used for API request authorization.

## Usage

Start the development server:

```bash
npm run dev
```

Generate a production-optimized build:

```bash
npm run build
```

Execute the production server:

```bash
npm run start
```

## Testing

The project utilizes TypeScript and ESLint for static analysis and code quality assurance. Execute the validation pipeline with:

```bash
npm run validate
```

This command performs type checking, linting, and formatting verification.

## Project Structure

- `app/api/`: Contains RESTful endpoint definitions for Arweave/Turbo services.
  - `turbo/balance/`: Retrieval of account credit balance in Winc.
  - `turbo/upload/`: Atomic data item bundling and upload.
  - `turbo/wallet/initialize/`: User registration and wallet provisioning triggers.
- `lib/`: Core logic and middleware.
  - `auth.ts`: Authentication, CORS management, and Turbo client initialization.

## Contributing

Technical contributions must adhere to the following workflow:

1. Synchronize the local repository with the `main` branch.
2. Implement changes on a dedicated feature branch.
3. Run `npm run validate` to ensure compliance with codebase standards.
4. Open a Pull Request with a comprehensive description of changes.

## License

MIT License. Copyright (c) 2026 DecoyPhrase.
