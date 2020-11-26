# Assumptions
- Words are considered to be contiguous blocks of letters - i.e. numbers and special chars are ignored
- Case is ignored when calculating most common letter
- Max file size is set to ~7Mb - large enough for the the entire collection of Sherlock Holmes novels
- Only plain .txt files are considered - .rtf, .doc Formats etc are not accepted
- No persistence 

# Todo
- API
- persistence/server-side processing
- Mean from freq table
- Use closures to capture state (e.g. valid input, word list, etc)
- validate input function that can be used in composition
- round function with the ability to specify precision
- add some text above dropzone to help the user
- improve typography of stats?

# Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

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

