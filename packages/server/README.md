## Testing
* Unit tests have `.test.ts` extension, while integration tests are placed inside a `__tests__` directory.
* For unit tests, run `yarn test:unit`
* For integration tests, run `yarn test:integration`. This creates a docker container with isolated database.
* After the integration tests, run `yarn docker:down` to destroy the container.
