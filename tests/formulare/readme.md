 # Test a form

In this test we wanna **validate a form** including image comparison with a masked area. 



## What you will see

1. At the beginning (*line 4*) we generate with [Day.js](https://day.js.org/docs/en/get-set/get ) **the 15. of the actual year and month**. With this informations we select later (*line 48*) the date inside the date picker.
2. The first test (*line 17*) make a simple **image comparison test** with a masked area (*line 22*), disabled animations (*line 21*) and with a threshold of 0.01 percent (*line 28*).
3. The **screenshots** will be later in the folder `formulare.specs.ts-snapshots`
4. In the second test (*line 32*) we fill out the form. At *line 53* you will see, how you can **click a input behind a wrapper** div.
5. At *line 56* we wait until the **network is idle**, so we know the new page is loaded.

