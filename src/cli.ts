#!/usr/bin/env node

const inquirer = require('inquirer');

const { A11yConverter } = require('./index');
const { writeFileSync } = require('fs');

inquirer
  .prompt([
    {
      type: 'input',
      name: 'url',
      message: 'Enter the URL to convert:',
      validate: (input: string) => {
        if (!input) {
          return 'Please enter a valid URL';
        }
        return true;
      },
    },
  ])
  .then((answers) => {
    const { url } = answers;
    const converter = new A11yConverter();
    converter
      .convert({
        url,
        method: 'GET',
      })
      .then(({ html }) => {
        writeFileSync('output.html', html);
      });
  })
  .catch((error) => {
    console.error(error);
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
