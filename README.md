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

### Build Assets
- Thankfully TypeScript makes all the JS nicities easy to use and the rendered assets on the `gh-pages` branch are automatically
  chunked for load time efficiency.
- More advanced build and hosting solutions for a real project would require additional thought, but this serves an illustrative purpose.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
