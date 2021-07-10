# Analytics dashboard with Prisma, Express, and React

This sample project is a fullstack web application that serves as an analytics dashboard for file uploads. The dashboard displays statistics about the users and files they uploaded to the platform.

## Tech stack
* [Prisma](https://www.prisma.io/) with PostreSQL database for data storage
* [React](https://reactjs.org/) for the frontend
* [Chakra UI](https://chakra-ui.com/) as a compoent library
* [Jest](https://jestjs.io/) for testing
* [TypeScript](https://www.typescriptlang.org/) throughout the project
* [ESLint](https://eslint.org/), [Prettier](https://prettier.io/), and [Husky](https://typicode.github.io/husky/#/) for code quality
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


## Architecture

This project has been set up as monorepo with [yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/). There are two packages: `server` and `dashboard` (client).

Functional programming has been used where possible to provide clean and easily readable code. TypeScript provides static types checks. In addition, code quality is maintained with ESLint, Prettier, and Husky.

### Server inside `packages/server`

At the very core, there's `prisma/schema.prisma` file that defines the data model and hence the database structure. Prisma Client, which is automatically generated, encapsulates TypeScript types derived from the data model. These types are reused across the project, including the frontend, for consistency.

Services in `src/services` provide functions that encapsulate database queries. Controllers in `src/controllers` then wrap services with web-related functionality like reading parameters from the request object and generating JSON response. They also provide validation code for any input parameters. Routes in `src/routes` link controllers and validation logic to a specific route. All the routes are then put together in `src/index.ts`.

The following REST API is made available by the server

| Methods | Urls                                      | Actions                                          |
|---------|-------------------------------------------|--------------------------------------------------|
| GET     | /api/reports/fileCount                    | get total number of files                        |
| GET     | /api/reports/fileCount/:userId            | get number of files for specific user            |
| GET     | /api/reports/fileStats                    | get stats about files grouped by their file type |
| GET     | /api/reports/averageFileSize              | get average file size                            |
| GET     | /api/reports/averageFileSize/:userId      | get average file size for specific user          |
| GET     | /api/reports/averageVideoDuration         | get average video duration                       |
| GET     | /api/reports/averageVideoDuration/:userId | get average video duration for specific user     |
| POST    | /api/users                                | create new user                                  |
| GET     | /api/users                                | get all users                                    |
| POST    | /api/files                                | create new file                                  |
| GET     | /api/files                                | get all files                                    |

## Test setup
* Install [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/)



