 # Run a single test with parameters from a CSV file

For this test I received a CSV file from the marketing department, with which they want to check the vanity URLs. 



## What you will see

1. First, **I disable the screenshots and videos** (line 5) that were configured in playwright.config.ts, as it makes no sense for these tests.

2. After that **I [read the CSV file](https://csv.js.org/parse/options/)** (line 11). Here it is important that it is NOT read in as a stream.

3. With this array I then **generate the test cases** (line 28). These then appear **[as individual tests per data set](https://playwright.dev/docs/test-parameterize#create-tests-via-a-csv-file)**.

4. In line 31 I **wait until the page is completely loaded**, i.e. there is **[no more network traffic](https://playwright.dev/docs/navigations#custom-wait-1)**.

5. In line 33 I wait **for the response** to check its status later (line 54). I then check this status with a **soft assertion**, so that the test does not abort here.

6. At the end I check if the correct URL was called. This with **a custom** **[exception message](https://www.youtube.com/watch?v=z0EOFvlf14U&t=637s)**.

