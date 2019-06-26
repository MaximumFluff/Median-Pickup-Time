const csv = require('csv-parser');
const fs = require('fs');
const cache = require('memory-cache');
const calculateMedian = require('./calculateMedian');
const checkDateFormat = require('./checkDateFormat');

function parseCv(req, res) {
  const pickups = [];
  const timeValues = checkDateFormat(req.query.start_time, req.query.end_time);
  if (!timeValues) {
    res.json({ ERROR: 'Timestamps passed are incorrectly formatted' });
  } else {
    const startTime = new Date(timeValues[0]);
    const endTime = new Date(timeValues[1]);
    fs.createReadStream('./CSV/pickup_times.csv')
      .pipe(csv())
      .on('data', row => {
        const pickupTime = new Date(row.iso_8601_timestamp);
        if (row.location_id === req.query.location_id) {
          if (pickupTime >= startTime && pickupTime <= endTime) {
            pickups.push(row);
          }
        }
      })
      .on('error', () => {
        console.log('Oops');
      })
      .on('end', () => {
        if (pickups.length === 0) {
          const returnJson = { ERROR: 'No values found within that range' };
          cache.put(req.url, returnJson, 60000);
          res.json(returnJson);
        } else {
          const median = calculateMedian(pickups);
          const returnJson = { median };
          cache.put(req.url, returnJson, 60000);
          res.json(returnJson);
        }
      });
  }
}

module.exports = parseCv;
