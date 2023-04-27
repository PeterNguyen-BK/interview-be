# Test App

This project has been generated using the `express` for back end integration, `vite-typescript` for front end integration

## Installation/deployment instructions

Depending on your preferred package manager, follow the instructions below to deploy your project.

> **Requirements**: NodeJS `18`. If you're using nvm, run `nvm use` to ensure you're using the same Node version in local and in your lambda's runtime.

### Using NPM

- Run `npm i` to install the project dependencies

### Using Yarn

- Run `yarn` to install the project dependencies

## Test your service

This code base does not use any API since we are sending event through SocketIO. Please refer to this: 

- http://18.136.210.152:4173/client: for two buttons code frontend
- http://18.136.210.152:4173/dashboard: to see the changes made by the client

### Locally

In order to test the hello function locally, run the following command:

- `npm run start` if you're using NPM
- `yarn start` if you're using Yarn


## Template features

### Project structure

The project code base is mainly located within the `src` folder. This folder is divided in:

- `index.ts`: bootstrapping the whole application in typescript. The file will be built into Javascript in the `dist` folder .

#### Back-end:


.
├── dist
│   ├── index.js
├── src
│   ├── index.ts
├── package.json
├── tsconfig.json               # Typescript compiler configuration
├── tsconfig.paths.json         # Typescript paths


#### Front-end:


.
├── dist
├── src
├── assets
├── context
├── pages
├── App.tsx
├── index.tsx


### 3rd party libraries

- Socket.IO - using socket.io for communication between client and the dashboard as the backend act as a middleman
- vite - using to build React application
- express - using to build the backend

### Environment Variables

- PORT (Backend)