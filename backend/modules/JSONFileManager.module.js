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
const readAll = (fileName, results = {}) => {
  let items = [];
  try{
    let contentStr = fs.readFileSync(fileName, 'utf-8');
    items = JSON.parse(contentStr);
    results.success = true;
    results.message = "File items fetched successfully.";
  }catch(e){
    _logError(e);
    results.success = false;
    results.message = "Unable to read file content.";
  }
  return items;
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
Override file conent with new JSON string.

Error Handling: if the update fails, this function will reutrn the current contents of the file.
*/
const writeFile = (fileName, content, results = {}) => {
  try {
    let jStr = JSON.stringify(content); // convert object to a JSON string
    fs.writeFileSync(fileName, jStr); // override file content with updated string
  }catch(e){
    _logError(e);
    results.message = "File items update failed. Attempting to return existing file content.";
    results.success = false;
    return newRead = readAll(fileName);
  }
  results.message = 'File items updated successfully.';
  results.success = true;
  return content;
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
