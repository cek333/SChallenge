const { getFileArgument, getDataFromFile, dataToRows, 
        removeRowsWithNonNumericProfit, dataToJson, writeJsonToFile,
        sortByProfitInPlace } = require('./src/parse');

function main() {
  const fileIn = getFileArgument();
  if (fileIn === null) {
    console.log('Plese specify the file to parse.');
    process.exit(1);
  }
  
  const dataIn = getDataFromFile(fileIn);
  if (dataIn.length === 0) {
    console.log('No usable data found.');
    process.exit(2);
  }

  const dataAsRows = dataToRows(dataIn);
  console.log(`${dataAsRows.length} rows of data read in.`);

  const dataAsRowsClean = removeRowsWithNonNumericProfit(dataAsRows);
  console.log(`${dataAsRowsClean.length} rows after removing invalid data.`);

  const dataAsJson = dataToJson(dataAsRowsClean);

  writeJsonToFile(dataAsJson);

  sortByProfitInPlace(dataAsJson);
  
  // Print first 20
  console.log(dataAsJson.slice(0,20));
}

main();
