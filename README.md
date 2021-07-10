# Analytics dashboard with Prisma, Express, and React

This sample project is a fullstack web application that serves as an analytics dashboard for file uploads. The dashboard displays statistics about the users and files they uploaded to the platform.

## Tech stack
* [Prisma](https://www.prisma.io/) with PostreSQL database for data storage
* [React](https://reactjs.org/) for the frontend
* [Chakra UI](https://chakra-ui.com/) as a compoent library
* [Jest](https://jestjs.io/) for testing
* [TypeScript](https://www.typescriptlang.org/) throughout the project
* [Docker](https://www.docker.com/) to create a separate environment for integration testing

## Setup
1. Create `.env` file inside `packages/dashboard` with `PORT=8081`  (or copy the existing `.env.example` file as `.env`)
2. Create `.env` file inside `packages/server` with `DATABASE_URL` that stores the URL of your running PostreSQL instance (if you don't already have PostreSQL, you can download it from [the official web](https://www.postgresql.org/download/))
3. Install `dotenv-cli` by running `yarn global add dotenv-cli`
4. Run `yarn` from the project root to install the dependencies


## Running the project
Firstly, follow the instructions in [Setup](#setup).
1. Run `yarn server` to start the server.
2. In a new terminal window, run `yarn dashboard` to start the dashboard

The database has been automatically seeded with sample data during the installation process. Opening http://localhost:8081/ shows the dashboard with statistics about the file uploads (totals and then segmented by file type). It also lists all users and files.

### Night mode
The UI has two color modes: light and dark. These can be changed by clicking the moon/sun icon in the menu.

## Test setup
* Install [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/)
