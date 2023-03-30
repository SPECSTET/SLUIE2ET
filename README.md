# Playwright UI-Testing

## Required environment variables

### For the Playwright tests

<dl>
    <dt><b>SLUIE2ET_CUG_USER</b></dt>
        <dd>User for Closed User Group if exists</dd>
    <dt><b>SLUIE2ET_CUG_PW</b></dt>
        <dd>Dito password</dd>
    <dt><b>SLUIE2ET_ENV</b></dt>
        <dd>Name of the environment to seperate screenshots etc.</dd>
    <dt><b>SLUIE2ET_HAS_DISCLAIMER</b></dt>
        <dd>Set to '1' if the page has a disclaimer or '0' if not</dd>
    <dt><b>SLUIE2ET_URL</b></dt>
        <dd>URL every test will call</dd>
</dl>

### For the powershell test runner

<dl>
    <dt><b>SLUIE2ET_URL_UAT</b></dt>
        <dd>URL for UAT tests. The test runner Will then temporary copied this value to SLUIE2ET_URL</dd>
    <dt><b>SLUIE2ET_URL_PAV</b></dt>
        <dd>Dito for PAV tests</dd>
    <dt><b>SLUIE2ET_BLOB_URL</b></dt>
        <dd>BLOB Url for AzCopy so the test runner can copy the test result to this host</dd>
    <dt><b>SLUIE2ET_REPORT_URL</b></dt>
        <dd>Public URL of this BLOB Storage</dd>
</dl>

| Please remember that Visual Studio Code must be restarted if an environment variable has been changed!

## Parameterize tests

To run the tests parameterized you can use the PowerShell test runner:
| Script | Env | HasDisclaimer | Tag | Comment |
|--- |--- |--- |--- |--- |
| .\run.ps1 | pav | 1 | components | Tests all components on PAV (PAV has a disclaimer) |
| .\run.ps1 | uat | 0 | forms | Run all form tests on UAT (UAT has a disclaimer) |
--grep-invert @vanitys

### More about parametrization

- https://playwright.dev/docs/test-parameterize
- https://playwright.dev/docs/test-cli
- https://playwright.dev/docs/test-reporters#built-in-reporters

## Installation

1. **[Node with npm](https://phoenixnap.com/kb/install-node-js-npm-on-windows)**
2. **[azcopy](https://adamtheautomator.com/azcopy-download/)** in windows directory
3. [posh-git](https://computingforgeeks.com/posh-git-powershell-environment-for-git/)
4. **[Visual Studio Code](https://code.visualstudio.com/download)**
5. **Install** the Visual Studio Code **Extension** [Playwright Test Extension](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)
6. **Run** `npm install` inside the project directory
7. **Run** `npx playwright install` inside the project directory
8. **View** the [latest Playwright videos](https://www.youtube.com/c/Playwrightdev)

## Special points in the template

### Test cases from CSV

Inside the directory `/tests/vanity-url` there are the tests to validate vanity urls **from a CSV file**. You will see, how:

- every data row generates a own test case
- the global screenshot and video rules are overwritten
- await to a network idle
- await the document complete loaded
- soft assertion

| [Readme Vanity URL tests](./tests/vanity-url/readme.md)

### Screenshot with masked areas

Inside the directory `/tests/formulare` you will find tests for a form. You will see, how:

- screenshots can have masked areas
- image comparison

| [Readme form tests](./tests/formulare/readme.md)

### Soft Assertion

| Checkout at the [Readme Vanity URL tests](./tests/vanity-url/readme.md)

### Image Comparison

| Checkout at the [Readme form tests](./tests/formulare/readme.md)

### Configuration

In the `playwright.config.ts` you will find all the configuration settings for the tests. They are well documented incl. links to detailed documentations.

The most interesting parts are:

- _line 30_ => define the **test reporters**
- _line 36_ => define the **global teardown**
- _line 40_ => configure the **screenshots** after a test run
- _line 42_ => configure the **video recording**
- _line 61_ => configure the browser **viewport**

All the **possible options** are described in the **[documentation](https://playwright.dev/docs/test-configuration)**.

### Test reports

In the `playwright.config.ts` it's configured, that reports will generated automatically. You will find the reports in the directory `playwright-report`. You can show the report with the command `npx playwright show-report`inside the test directory.

You can also set in the config a parameter (_line 34_) to **[auto open](https://medium.com/geekculture/how-to-generate-html-report-in-playwright-f9ec9b82427a) the report** after the test run.

In the `globalTeardown.ts` you will find a solution, how you can put the **report into a ZIP file**.

### Global Teardown

In the configuration `playwright.config.ts` at _line 36_ it is a **global teardown** defined. This will run **after all tests are executed** and the browser are closed. In this example, the report files will put into a ZIP file.

## Some more things

### Test Recorder

A really cool feature of Playwright is the **test recorder** (code generator). This will **save you so much time**.

Check it out at [Playwright code generator](https://www.youtube.com/watch?v=wGr5rz8WGCE&t=276s)

### Work with TAG's

In the form tests you will see at _line 15_ that there is a tag **@forms**. with this tag you can define, **which tests should be run**. So you can run **only the form tests** with the command `npx playwright test --report-dir 'test-results/' --grep '@vanitys'`

To read more about the test annotations, read the [docs](https://playwright.dev/docs/test-annotations).

## More stuff

- [Playwright YouTube Playlist](https://www.youtube.com/playlist?list=PLriKR1xQz6aLcOx7QXvaBeSeMSDK0lZHF)
- [Playwright + Azure Pipeline](https://www.youtube.com/watch?v=RCzXuCt8Lng)
- [Playwright YouTube channel](https://www.youtube.com/@Playwrightdev)
- [Playwright on Github](https://github.com/microsoft/playwright)

## [TODO]

- https://stackoverflow.com/questions/70262213/playwright-before-each-for-all-spec-files
- await page.setExtraHTTPHeaders({'Funky': 'Play'});
