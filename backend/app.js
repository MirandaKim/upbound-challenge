
const express = require('express');
const fs = require('fs');
const path = require('path');
const JSONFileManager = require('./modules/JSONFileManager.module');

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
}

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

/*use url to get list of cards*/
app.use('/api/cards', (req, res, next) => {
  let items = getFileItems('data/cards.json');
  res.status(200).json({
    message: `Card items fetched successfully!`,
    items: items
  });
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
