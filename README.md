# Front-End Example

This is an example front end SPA which was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

It automatically builds using GitHub Actions and publishes itself to the `gh-pages` branch for CI purposes.

The example app itself has a very simple Material UI implementation that groups the list items by `listId` into collapsible sub-lists.

View it here: https://erikdunning.github.io/front-end-example/

## General Notes

The application structure should be pretty easy to follow.
Common features for this light application are grouped into folders that describe their function in the application.

They are as follows:
- `src/api` - For an indexed collection of API methods and associated processing helpers that may be selectively exported.
- `src/components` - Contains the custom React components required by the application.
- `src/hooks` - Contains React hooks used to organize common functional behavior.
- `src/types` - Contains common TypeScript definitons.

For deployment management, there are two important files:
- `.github/workflows/ci.yml` - The singular GitHub Actions workflow for this example.
- `scripts/deploy-gh-pages.sh` - A simple script called by the GH Actions to manage the deployment of the `gh-pages` branch.  

### Testing / Linting Notes
- While Jest is used, testing does not presently use more advanced libraries like Enzyme, and I've only assembled one test as a smoke test.
- Additionally, eslint & prettier are present for linting and formatting, but are just using the boilerplate models presently.
- Ideally, real integration testing using Cypress.io or Sauce Labs (or any other browser testing provider / solution) would be
  added to ensure other related infrastructure is working and browser specific breakages would be caught more easily.

### Build Assets
- Thankfully TypeScript makes all the JS nicities easy to use and the rendered assets on the `gh-pages` branch are automatically
  chunked for load time efficiency.
- More advanced build and hosting solutions for a real project would require additional thought, but this serves an illustrative purpose.
- CloudFront / other CDN provided solutions should be considered for mass deployment of build assets, but hosting them in S3
  or other simple storage mechanisms behind the company DNS is also a totally valid option for services with light customer volume.

### Further Improvements
I have a couple other thoughts about things that could be improved in this example depending on the business needs:
- Using `localStorage` or `sessionStorage` to cache the items may or may not be advisable for a real world scenario.
- Additionally, the API used to render the item response could cache items internally with memcache, elasticache, or redis
  or many other forms of caching strategies.  Presently the S3 bucket sets the `no-cache` header to explicitly prevent the
  browser from caching it automatically, but the manual approach would work.

## Available Scripts

In the project directory, you can run:

### `yarn install`

This will install the dependencies bundled with the repo for speed and deployment safety (in the event of a network outage).

Be sure to have yarn and Node.js v16 installed! (ideally using NVM)

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\

### `yarn lint`

Lints the project.
