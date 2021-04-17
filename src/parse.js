const fs = require('fs');

const headers = [ 'year', 'rank', 'company', 'revenue', 'profit' ];

function getFileArgument() {
  // Get file to parse from command-line arguments
  if (process.argv.length <= 2) {
    return null;
  } else {
    return process.argv[2];
  }
}

function getDataFromFile(fileIn) {
  let dataIn;
  try {
    dataIn = fs.readFileSync(fileIn, 'utf8');
  } catch (err) {
    console.error(`Unable to read file: ${err}`);
    dataIn = '';
  }
  return dataIn.trim();
}

function dataToRows(dataIn) {
  const dataAsRows = dataIn.split(/\s*\n/);
  dataAsRows.shift(); // remove header row
  return dataAsRows;
}

function removeRowsWithNonNumericProfit(rowsIn) {
  // rowsIn has 5 columns. 'profit' is the last column.
  const filtered = rowsIn.filter(row => {
    // Extract profit
    const profit = row.substring(row.lastIndexOf(',')+1);
    return !isNaN(profit);
  });
  return filtered;
}

function dataToJson(rowsIn) {
  const rowsAsJson = rowsIn.map(row => {
    // Check if the company name contains quotes
    const quoteCheck = row.match(/["'](.*?)["']/);
    // console.log(quoteCheck);
    let companyName = null;
    if (quoteCheck) {
      companyName = quoteCheck[1];
      // Replace quoted string with placeholder string
      row = row.replace(companyName, 'companyName');
    }
    const cols = row.split(/,/);
    const colsAsJson = cols.reduce((acc, col, idx) => {
      const key = headers[idx];
      // create key value pair in object
      acc[key] = key==='company' ? col : Number(col); 
      return acc;
    }, {});
    // Restore company name if necessary
    if (companyName) {
      colsAsJson.company = companyName;
    }
    return colsAsJson;
  });
  return rowsAsJson;
}

function writeJsonToFile(jsonIn) {
  try {
    fs.writeFileSync('data2.json', JSON.stringify(jsonIn));
  } catch (err) {
    conosle.error(`Unable to write to file: ${err}`);
  }
}

function sortByProfitInPlace(jsonIn) {
  // Sort descending
  jsonIn.sort((a,b) => b.profit - a.profit);
}

module.exports = { getFileArgument, getDataFromFile, dataToRows, 
                   removeRowsWithNonNumericProfit, dataToJson, writeJsonToFile,
                   sortByProfitInPlace };