
const express = require('express');
const fs = require('fs');
const path = require('path');
const JSONFileManager = require('./modules/JSONFileManager.module');
const bodyParser = require('body-parser');

const app = express();

/**********************************************************/
/*                                                       */
/*   App                                                */
/*                                                     */
/******************************************************/
/*

*** @TODO expand logic to multiple files with routes

*****************
*   Contents:   *
*****************

  # Utilities
  # JSON Config
  # APIs
    > Campaigns
    > Cards
    > Filters
  # Static
  # Exports

******************/


/********************************************/
/*   # Utilites                            */
/******************************************/

/*
> Get File Items
Get content from JSON file
*/
const getFileItems = (fileName) => {
  let fileAddress = path.join(__dirname, fileName);
  const items = JSONFileManager.readAll(fileAddress)
  return items;
};

const writeFile = (fileName, content) => {
    let fileAddress = path.join(__dirname, fileName);
    const result = JSONFileManager.writeFile(fileAddress, content);
    return result;
};

/********************************************/
/*   # JSON Config                         */
/******************************************/

// Allow for reading a significant chunk of JSON data in the requset.
app.use(express.json({limit: '10mb', extended: true}));

/********************************************/
/*   # APIs                                */
/******************************************/

/*****************
*  > Campaigns   *
*****************/

/*Access url to get list of campaigns*/
app.use('/api/campaigns', (req, res, next) => {
  let items = getFileItems('data/campaigns.json');
  res.status(200).json({
    message: `Campaign items fetched successfully!`,
    items: items
  });
});

/*************
*  > Cards   *
*************/

const cardsDataFile = 'data/cards.json';

/*use url to write/override list of cards*/
app.use('/api/cards/update', (req, res, next) => {
  console.log('UPDATING... (app.js)');
  let updatedItems = writeFile(cardsDataFile, req.body);
  res.status(200).json({
    message: 'Card items updated successfully!',
    items: updatedItems
  });
  console.log('Content Updated.')
});


/*use url to get list of cards*/
app.use('/api/cards', (req, res, next) => {
  console.log('READING... (app.js)');
  let items = getFileItems(cardsDataFile);
  res.status(200).json({
    message: `Card items fetched successfully!`,
    items: items
  });
  console.log('Content Read.')
});

/***************
*  > Filters   *
***************/

/*Access url to get list of filter options*/
app.use('/api/filters', (req, res, next) => {
  let items = getFileItems('data/filters.json');
  res.status(200).json({
    message: `Filter items fetched successfully!`,
    items: items
  });
});

/********************************************/
/*   # Static                              */
/******************************************/

/*Static file locations (angular dist directory)*/
app.use(express.static(path.join(__dirname, '../dist')));

/*All other urls point to front end*/
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
})

/********************************************/
/*   # Exports                             */
/******************************************/

module.exports = app;
