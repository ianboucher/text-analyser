# Text Analyser - Introduction

This project is the output of a technical challenge with the requirement to build an SPA that calculates statistics about text files submitted to it and displays those statistics in a useful form.

### Required Statistics
- Whitespace delimited word count
- Line count
- Mean(to 1decimal place), mode and median letters per word
- Most common letter
---

### Scope (AKA Excuses!)
Given the above requirements and the available time, I decided to build this app in a manner simlar to some of the simple online text/JSON formatting tools available, where no persistence is expected and no authentication is required. The user simply reads a file from their filesystem and is able to view the statistics detailed above.

There is no authentication, and all processing of the text files is done client-side, hence there is no API or communication with a server, thus side-stepping many of the associated security concerns. Were this to be implemented on a company web-property and there were an explicit expectation of persistence, I would have added authentication and an API layer (given time). Had there been a requirement for very large files or more complex processing, I would probably consider something like uploading to S3 and triggering a Lambda function to process the file asychronously.

Whilst not a "full-featured" app, hopefully I have met the brief and avoided falling into the trap of building things that were not asked for. I have attempted to apply a functional-style of JavaScript, to the best of my ability, and I hope the project is sufficiently readable and well-structured.  

### Assumptions
In processing the files to extract the required statistics, I made the following assumptions:
- **Max file size is set to 10Mb** - if this needs increasing, please let me know and I will add a fix
- Only plain .txt files are considered - .rtf, .doc formats etc are not accepted
- No persistence of either the files or the associated statistics
- Words are considered to be contiguous blocks of letters - i.e. numbers and special chars are ignored
- Numbers or special characters adjacent to letters are ommitted from word length calculations - so "3rd" is considered a 2 letter word
- Case is ignored when calculating most common letter - i.e A = a
- More than one modal word length or most common letter are possible - in the case of a tiebreak, each value is displayed

<br/>

---
<br/>

## Getting Up & Running

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), so it should behave like any other React app. Clone the repo, and from the project directory run:
#### `yarn start`
<br />

Which should start the app in the development mode, whereupon you can open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---
<br/>

To run the unit test suite, run:
#### `yarn test`
<br/>
Which launches the test runner in the interactive watch mode. 

---
<br/>

To build the app for production and bundle it to the `build` folder, run: 
#### `yarn build`
<br />

Which correctly bundles React in production mode and optimizes the build for the best performance.The build is minified and the filenames include the hashes. The app is ready to be deployed!
