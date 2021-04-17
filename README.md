# SChallenge
Summary: Parse a CSV file containing corporate profits over the years. Print out some properties about the data, convert the data to json, and sort the data by profit.

## Algorithm Overview
* Count the rows of data in the CSV file: After the data is read from the file, trim the data so that any trailing newlines are removed. Next split the data by newlines to create an array where each array entry is one line of corporate data. Remove the first entry of the array which corresponds to the headers. The length of the array is equal to the number of rows of data. The number of rows of data is printed. 

* Removing non-numeric profit data: Use javascript string manipulation functions (substring, lastIndexOf) to extract the profit data from each line. Use `isNaN(profit)` to check if the profit is a valid number. Use the array `filter()` function to remove lines with non-numeric profit data. The length of the array after filtering is printed.

* Convert to Json: For each row of data we split the string by the comma delimiter (taking special care to handle company names that contain commas). This results in an array of company data. Next we convert each row into an object of key-value pairs. The resulting array of objects is written to a file (data2.json) via `JSON.stringify()`.

* Sort by Profit: Starting with the array of json objects, we pass a custom function to the `sort()` command to sort the data by descending profit. The top 20 rows are extracted using an array `slice()` and these values are printed.

## To Run
`sh run.sh`

## Tests
Some optional tests are included. To run:

`npm install`

`npm run test`

## Output
```
25499 rows of data read in.
25130 rows after removing invalid data.
[
  {
    year: 2005,
    rank: 2,
    company: 'Exxon Mobil',
    revenue: 270772,
    profit: 25330
  },
  {
    year: 1999,
    rank: 2,
    company: 'Ford Motor',
    revenue: 144416,
    profit: 22071
  },
  {
    year: 2004,
    rank: 2,
    company: 'Exxon Mobil',
    revenue: 213199,
    profit: 21510
  },
  {
    year: 2004,
    rank: 8,
    company: 'Citigroup',
    revenue: 94713,
    profit: 17853
  },
  {
    year: 2001,
    rank: 1,
    company: 'Exxon Mobil',
    revenue: 210392,
    profit: 17720
  },
  {
    year: 2005,
    rank: 8,
    company: 'Citigroup',
    revenue: 108276,
    profit: 17046
  },
  {
    year: 2005,
    rank: 5,
    company: 'General Electric',
    revenue: 152363,
    profit: 16593
  },
  {
    year: 2002,
    rank: 2,
    company: 'Exxon Mobil',
    revenue: 191581,
    profit: 15320
  },
  {
    year: 2003,
    rank: 6,
    company: 'Citigroup',
    revenue: 100789,
    profit: 15276
  },
  {
    year: 2004,
    rank: 5,
    company: 'General Electric',
    revenue: 134187,
    profit: 15002
  },
  {
    year: 2005,
    rank: 18,
    company: 'Bank of America Corp.',
    revenue: 63324,
    profit: 14143
  },
  {
    year: 2002,
    rank: 7,
    company: 'Citigroup',
    revenue: 112022,
    profit: 14126
  },
  {
    year: 2003,
    rank: 5,
    company: 'General Electric',
    revenue: 131698,
    profit: 14118
  },
  {
    year: 2002,
    rank: 6,
    company: 'General Electric',
    revenue: 125913,
    profit: 13684
  },
  {
    year: 2001,
    rank: 6,
    company: 'Citigroup',
    revenue: 111826,
    profit: 13519
  },
  {
    year: 2005,
    rank: 6,
    company: 'ChevronTexaco',
    revenue: 147967,
    profit: 13328
  },
  {
    year: 2001,
    rank: 5,
    company: 'General Electric',
    revenue: 129853,
    profit: 12735
  },
  {
    year: 2001,
    rank: 10,
    company: 'Verizon Communications',
    revenue: 64707,
    profit: 11797
  },
  {
    year: 2003,
    rank: 3,
    company: 'Exxon Mobil',
    revenue: 182466,
    profit: 11460
  },
  {
    year: 2005,
    rank: 24,
    company: 'Pfizer',
    revenue: 52921,
    profit: 11361
  }
]
```

## File Overview:
run.sh - script to run the challenge solution (highestProfit.js)

package.json - required packages to run the tests

data/data.csv - source data for the challenge

data/test.csv - subset of data used for manual testing

src/parse.js - functions implementing the logic for this challenge

test/sanity.test.js - short tests of the non-I/O functions

highestProfit.js - top-level solution for challenge