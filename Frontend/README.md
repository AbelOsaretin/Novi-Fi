# NOVA FI Frontend

This directory contains the frontend web application for NOVA FI, built with Next.js.

## Tech Stack

- **Framework**: Next.js
- **Styling**: TailwindCSS
- **Blockchain Interaction**: Ethers.js/Wagmi
- **State Management**: React Context API / Redux (specify which one you're using)

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Git

### Installation

```bash
# Install dependencies
npm install
# OR
yarn install

# Set up environment variables
cp .env.example .env.local

# Run the development server
npm run dev
# OR
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
/src
  /components      # Reusable UI components
  /pages           # Next.js pages
  /hooks           # Custom React hooks
  /contexts        # React context providers
  /utils           # Utility functions
  /services        # API and blockchain service integrations
  /styles          # Global styles and Tailwind configuration
  /types           # TypeScript type definitions
  /constants       # Application constants
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality
- `npm run test` - Run tests (if configured)

## Environment Variables

Create a `.env.local` file with the following variables:

```
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_CHAIN_ID=
NEXT_PUBLIC_INFURA_ID=
NEXT_PUBLIC_ENS_CONTRACT=
```

## Connecting to Blockchain

This application uses Wagmi and Ethers.js to interact with the blockchain. The main wallet connection is handled in the `/src/contexts/WalletContext.tsx` file.

## UI Components

We use a component-based architecture. All reusable UI components are in the `/src/components` directory, organized by feature or type.

## Contributing

1. Follow the established code style and naming conventions
2. Write descriptive commit messages
3. Create feature branches from `develop`
4. Submit PRs to `develop` branch for review

## Build and Deployment

The application is built using Next.js standard build process:

```bash
npm run build
```

---

For more detailed information about the NOVA FI project as a whole, please see the main README file in the root directory.
