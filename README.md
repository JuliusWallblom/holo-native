# React Native + Vite

This project is a React Native-based application built using Vite as the development toolchain. It incorporates various modern libraries and tools to ensure a highly scalable, unified, predictable, maintainable, and testable codebase.

All tests use the colocation pattern and has 100% coverage.

## Technologies Used

- React 18.3
- React Native 0.75.3
- React Native Web 0.19.12
- Vite
- Axios
- GraphQL
- Apollo Client (for GraphQL queries & mutations)
- Tanstack Query (for REST queries & mutations)
- Tanstack Router
- Jest
- ESLint
- Prettier

## Getting Started

### Installing the node packages

To install the node packages, run the following command from the root directory of the project:

```bash
#using npm
npm install

#using yarn
yarn install
```

### Running the development server

To run the development server, run the following command from the root directory of the project:

```bash
#using npm
npm run dev

#using yarn
yarn dev
```

### Building web for production

To build the web application for production, run the following command from the root directory of the project:

```bash
#using npm
npm run build:web

#using yarn
yarn build:web
```

### Running the Tests

To run the tests, run the following command from the root directory of the project:

```bash
#using npm
npm run test

#using yarn
yarn test
```

#### Watch

```bash
#using npm
npm run test:watch

#using yarn
yarn test:watch
```

#### With coverage

```bash
#using npm
npm run test:coverage

#using yarn
yarn test:coverage
```

## Project Structure

- `src/app`: Anything related to the entry-point of the application
- `src/assets`: Graphical assets
- `src/components`: UI & core components
- `src/constants`: General constants not related to a particular module
- `src/hooks`: General hooks not related to a particular module
- `src/lib`: Implementations of third-party libraries
- `src/styles`: Stylesheets not related to a particular module
- `src/types`: General types not related to a particular module
- `src/utils`: General helper functions & utilities not related to a particular module
