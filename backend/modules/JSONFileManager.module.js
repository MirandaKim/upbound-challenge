const fs = require('fs');
const path = require('path');

/**********************************************************/
/*                                                       */
/*   JSON File Manager                                  */
/*                                                     */
/******************************************************/
/*
Functions intened to create/read/update/delete content from JSON files.

*** NOTE: Not all functions are active/created at this time.

*****************
*   Contents:   *
*****************

  # Read
  # Write
  # Delete
  # Validations
  # Logs
  # Exports

******************/

/********************************************/
/*   # Read                                */
/******************************************/

/*
Read All:
Read all items from a JSON file and return as a parsed JS object.*/
const readAll = (fileName) => {
  try{
    let contentStr = fs.readFileSync(fileName, 'utf-8');
    let items = JSON.parse(contentStr);
    return items;
  }catch(e){
    _logError(e);
    return [];
  }
}

/*
Get Items:
Read all items from a JSON file and return the items matching the property/value criteria provided as parameters.
Returns values as JS objects.
More than one item will be returned if criteria matches for more than one item.
Filter is strict (no trims or capitalization checks)
*/
const getItems = (fileName, property, value) => {
  let items = readAll(fileName);
  let filtered = items.filter((item) => {
    return item[property] === value;
  });
  return filtered;
}


/********************************************/
/*   # Write                               */
/******************************************/

/*
Write File:
Write JSON content to the file.
This is meant to override any existing content.
*/
const writeFile = (fileName, items) => {
  console.log('Welcome to JSON write file:');
  console.log('This functionality is still under construction and DOES NOT modify any actual data at this time.');
  let newRead = readAll(fileName);
  return newRead;
}

/*
Add Item:
Add a JSON value to the end of a JSON file.
*/
const addItem = (fileName, item) => {
  // @TODO - Functionality on hold until required
  console.log('Sorry, add item is not currently active.');
}


/********************************************/
/*   # Delete                              */
/******************************************/

/*
Delete Items:
Delete items from the contents of a JSON file based on the property/value criteria provided as parameters.
More than one item will be removed if more than one item matches the criteria.
*/
const deleteItems = (fileName, property, value) => {
  // @TODO - Functionality on hold until required
  console.log('Sorry, delete item is not currently active');
}


/********************************************/
/*   # Validations                         */
/******************************************/

/*
Is JSON File:
Check if the file has the extension .JSON or .json
Caution: this does not check the actual contents of the file.
*/
const isJSONFile = (fileName) => {
  let explode = typeof fileName === 'string' ? fileName.split('.') : [''];
  let extension = explode[(explode.length - 1)];
  let isJSON = extension.toLowerCase() === "json";
  return isJSON;
}


/********************************************/
/*   # Logs                                */
/******************************************/

/*
Log Error:
Log simple error message to the console.
*/
const _logError = (e) => {
  console.log(`JSONFile Manager Error: \n${e}`);
}


/********************************************/
/*   # Exports                             */
/******************************************/

module.exports = {
  readAll,
  getItems,
  writeFile,
  addItem,
  deleteItems,
  isJSONFile
}
