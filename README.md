# Playwright UI-Testing

## Parameterize tests
https://playwright.dev/docs/test-parameterize 

## Installation
1. Install the Visual Studio Code [Playwright Test Extension](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) 
2. Run `npm install` inside the project directory of this example of the Node implementation
3. View the [latest Playwright videos](https://www.youtube.com/c/Playwrightdev)



## Special points in the template

### Test cases from CSV

Inside the directory `/tests/vanity-url` there are the tests to validate vanity urls from a CSV file. You will see, how:

- every data row generates a own test case
- the global screenshot and video rules are overwritten
- await to a network idle
- await the document complete loaded 
- soft assertion

[Readme Vanity URL tests](./tests/vanity-url/readme.md)



### Screenshot with masked areas

Inside the directory `/tests/formulare` you will find tests for a form. You will see, how:

- screenshots can have masked areas
- image comparison

[Readme form tests](./tests/formulare/readme.md)



### Soft Assertion

Checkout at the [Readme Vanity URL tests](./tests/vanity-url/readme.md)



### Image Comparison

Checkout at the [Readme form tests](./tests/formulare/readme.md)



### Configuration

In the `playwright.config.ts` you will find all the configuration settings for the tests. They are well documented incl. links to detailed documentations.

The most interesting parts are:

- *line 30* => define the **test reporters**
- *line 36* => define the **global teardown**
- *line 40* => configure the **screenshots** after a test run
- *line 42* => configure the **video recording**
- *line 61* => configure the browser **viewport**

All the **possible options** are described in the **[documentation](https://playwright.dev/docs/test-configuration)**.



### Test reports

In the `playwright.config.ts` it's configured, that reports will generated automatically. You will find the reports in the directory `playwright-report`. You can show the report with the command `npx playwright show-report`inside the test directory.

You can also set in the config a parameter (*line 34*) to **[auto open](https://medium.com/geekculture/how-to-generate-html-report-in-playwright-f9ec9b82427a) the report** after the test run.

In the `globalTeardown.ts` you will find a solution, how you can put the **report into a ZIP file**.



### Global Teardown

In the configuration  `playwright.config.ts`  at *line 36* it is a **global teardown** defined. This will run **after all tests are executed** and the browser are closed. In this example, the report files will put into a ZIP file.



## Some more things

### Test Recorder

A really cool feature of Playwright is the **test recorder** (code generator). This will **save you so much time**.

Check it out at [Playwright code generator](https://www.youtube.com/watch?v=wGr5rz8WGCE&t=276s)



### Work with TAG's

In the form tests you will see at *line 15* that there is a tag **@forms**. with this tag you can define, **which tests should be run**. So you can run **only the form tests** with the command `npx playwright test --report-dir 'test-results/' --grep '@vanitys'`

To read more about the test annotations, read the [docs](https://playwright.dev/docs/test-annotations).



