# Analytics dashboard with Prisma, Express, and React

This sample project is a fullstack web application that serves as an analytics dashboard for file uploads. The dashboard displays statistics about the users and files they uploaded to the platform.

## Tech stack
* [Prisma](https://www.prisma.io/) with PostreSQL database for data storage
* [React](https://reactjs.org/) for the frontend
* [Chakra UI](https://chakra-ui.com/) as a component library
* [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) for data fetching and caching
* [Jest](https://jestjs.io/) for testing
* [TypeScript](https://www.typescriptlang.org/) throughout the project
* [ESLint](https://eslint.org/), [Prettier](https://prettier.io/), and [Husky](https://typicode.github.io/husky/#/) for code quality
* [Docker](https://www.docker.com/) to create a separate environment for integration testing

## Setup
1. Create `.env` file inside `packages/dashboard` with `PORT=8081`  (or copy the existing `.env.example` file as `.env`)
2. Create `.env` file inside `packages/server` with `DATABASE_URL` that stores the URL of your running PostreSQL instance (if you don't already have PostreSQL, you can download it from [the official web](https://www.postgresql.org/download/))
3. Install `dotenv-cli` by running `yarn global add dotenv-cli`
4. Run `yarn` from the project root to install the dependencies
5. Start your PostreSQL server
6. Run `yarn migrate` from the project root. This sets up the database and initialises it with sample data. If the database already exists, it resets it.


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

### Server in `packages/server`

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

### Dashboard/client in `packages/dashboard`

`reportingService.ts` in `src/services` defines some of the endpoints provided by the server with the RTK Query framework, and exports hooks to access the data. There are three domains: users, files, and reports, each of which has its own directory with subdirectories for components, pages, etc. The menu component is in `src/navigation` and it also contains the toggle to switch between the light and dark modes. `src/types/serverTypes.ts` re-exports types from the server for reuse in the frontend.

## Testing

All the services from `packages/server/src/services` are tested as integration tests in `packages/server/src/__tests__`. The tests are run in a Docker container with a separate instance of the PostreSQL server. There's only one sample unit test in `packages/server/src/services/user.service.test.ts`, which use a mock of Prisma Client, hence it doesn't connect to a database.

### Setup
* Unit tests should work out of box
* For integration tests, install [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/), and also copy the content of `.env.test.example` in `.env.test` file inside `packages/server`: this sets the testing database URL.

### Run tests
1. Navigate to `packages/server` with your terminal
2. Run `yarn test:unit` for unit tests
3. Run `yarn docker:up` and then `yarn test:integration` for integration tests. The commands first set up the Docker instance, initialises the database, and then runs the tests.
4. `yarn docker:down` stops and removes the Docker container.

## Possible improvements

### Testing
* More unit tests, especially for the validation logic in server controllers.
* Test the server as a whole system with automated API tests, which can be implemented with [Postman API test](https://www.postman.com/api-platform/api-testing/).
* Frontend test with [Testing Library](https://testing-library.com/), for example.
* E2E tests with tools like [Cypress](https://www.cypress.io/)

### Filtering by date
* Add `createdAdd` attribute to the prisma schema like `createdAt DateTime @default(now())`
* When querying the API, specify data range via URL query parameters. Then use these when querying the database.

### Pagination
* Via the `skip` and `take` Prisma parameters when querying the Prisma Client as described [here](https://www.prisma.io/docs/concepts/components/prisma-client/pagination).


## Common issues/FAQ

#### `yarn server` results in errors about `dotenv`
* Make sure that the correct dotenv binary is executed. There may be other global dotenv installations, for example, `pip` and `conda` also have a `dotenv` package. On a mac, you can check which package is executed by running `where dotenv`. Then either delete the other `dotenv` packages or explicitly specify the binary in `packages/server/package.json` scripts.

#### Database has not been seeded/I want to reset the database to initial state.
* From `packages/server` run `yarn prisma:seed` to manually seed the database. You can also run `npx prisma migrate reset` to reset the database to initial state (this runs the seed automatically).
