const path = require('path')
const PouchDB = require('pouchdb')
var dotenv = require('dotenv');
dotenv.load();
const db = new PouchDB(process.env.DB_URL)
const {
    prop,
    forEach
} = require('ramda')
const create = require('./methods/create.js')
const update = require('./methods/update.js')
const remove = require('./methods/remove.js')
const getThe = require('./methods/get.js')



function listFansByState(startToken, limit, cb) {
    db.allDocs({
        startkey: `fan_${startToken}`,
        endkey: `fan_${startToken}\uffff`,
        limit: limit,
        include_docs: true
    }, function(err, res) {
        if (err) {
            return cb(err)
        }
        if (res) {
            return cb(null, res)
        }
    })
}


function queryDB(view,options,cb){
  console.log('view',view,'options',options)
  db.query(view,options,function(err,body){
    if(err){
      return cb(err)
    }
    if(body){
      return cb(null,body.rows)
    }
  })
}

function getArtistEvents({startDate,endDate,artistID},cb){
  startDate = new Date(startDate)
  endDate = new Date(endDate)
  let startYear = startDate.getUTCFullYear()
  let startMonth = startDate.getUTCMonth() + 1
  let startDay = startDate.getUTCDate()
  let endYear = endDate.getUTCFullYear()
  let endMonth = endDate.getUTCMonth() + 1
  let endDay = endDate.getUTCDate()
  let options = {
    include_docs: true,
    startkey: [artistID,startYear,startMonth,startDay,0,0],
    endkey: [artistID,endYear,endMonth,endDay,23,59]
  }
  queryDB('artistevents',options,cb)
}

function getArtistDaySheets({startDate,endDate,artistID},cb){
  startDate = new Date(startDate)
  endDate = new Date(endDate)
  let startYear = startDate.getUTCFullYear()
  let startMonth = startDate.getUTCMonth() + 1
  let startDay = startDate.getUTCDate()
  let endYear = endDate.getUTCFullYear()
  let endMonth = endDate.getUTCMonth() + 1
  let endDay = endDate.getUTCDate()
  let options = {
    include_docs: true,
    startkey: [artistID,startYear,startMonth,startDay,0,0],
    endkey: [artistID,endYear,endMonth,endDay,23,59]
  }
  queryDB('artistdaysheets',options,cb)
}




module.exports = {
    fansByState: listFansByState,
    getFan: getThe.fan,
    getEvent: getThe.event,
    getDaySheet: getThe.daysheet,
    getView: queryDB,
    getArtistEvents: getArtistEvents,
    getArtistDaySheets: getArtistDaySheets,
    updateFan: update.fan,
    updateEvent: update.event,
    updateDaySheet: update.event,
    removeFan: remove.fan,
    removeEvent: remove.event,
    removeDaySheet: remove.daysheet,
    createFan: create.fan,
    listStreetTeam: queryDB,
    createEvent: create.event,
    createDaySheet: create.daysheet
}
