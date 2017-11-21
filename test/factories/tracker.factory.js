const faker = require('faker');
const { Tracker } = require('../../src/tracker/tracker.model');
const moment = require('moment');

function createOne(userId) {
  let tallyMarks = {};
  for (i = 0; i < 6; i++) {
    //get 6 random dates
    let date =  faker.date.between(moment().subtract(faker.random.number({min:1, max:7}), 'months'), moment());
    //reassigning to date as formatted 
    date = moment(date).format("YYYY-MM-01");
    //randomly assign tally marks between 1-25
    tallyMarks[date] = faker.random.number({min:1, max:25}); 
  }

  return {
    //userId: //add this back when user is created with parameter
    name: faker.internet.domainName(),
    description: faker.company.catchPhraseDescriptor(),
    status: faker.random.number({min: 1, max: 2}), 
    notes: faker.company.catchPhrase(),
    tallyMarks  //see if this compiles without needing tallyMarks key
  };
}

function createMany (num) {
  let trackers = [];

  for (i = 0; i < num; i++) {
    trackers.push(createOne()); 
  }
  return trackers;
}
// can load this file to see if it works individually
// console.log(createOne());
module.exports = { createOne, createMany };
