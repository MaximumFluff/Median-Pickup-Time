// TODO: Further error checking
const app = require('express')();
const path = require('path');
const csv = require('csv-parser');
const fs = require('fs');
const cache = require('memory-cache');
const calculateMedian = require('./src/calculateMedian');
const checkDateFormat = require('./src/checkDateFormat');
const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/median_pickup_time', async (req, res) => {
  // If cached value exists, return that othewise proceed in parsing CSV file
  let cachedValue = cache.get(req.url);
  if (cachedValue) {
    res.json(cachedValue);
  } else {
    // Error checking for the parameters
    if (!req.query.start_time || !req.query.end_time || !req.query.location_id) {
      res.json({
        ERROR: 'One or more required parameters missing from request',
      });
    } else {
      // Define array for parsed CSV values, create date objects to compare with
      let pickups = [];
      let timeValues = checkDateFormat(req.query.start_time, req.query.end_time);
      let startTime = new Date(timeValues[0]);
      let endTime = new Date(timeValues[1]);
      // Parse the CSV file and push all values with matching location to array
      await fs
        .createReadStream('./CSV/pickup_times.csv')
        .pipe(csv())
        .on('data', row => {
          // Sort data based on start times, end times and location id in query
          let pickupTime = new Date(row.iso_8601_timestamp);
          if (row.location_id === req.query.location_id) {
            if (pickupTime >= startTime && pickupTime <= endTime) {
              pickups.push(row);
            }
          }
        })
        .on('end', () => {
          console.log('CSV File parsed!');
          if (pickups.length === 0) {
            const returnJson = { ERROR: 'No values found within that range' };
            cache.put(req.url, returnJson);
            res.json(returnJson);
          }
          else if (pickups.length !== 0) {
            const median = calculateMedian(pickups);
            const returnJson = { median };
            cache.put(req.url, returnJson);
            res.json(returnJson);
          }
        });
    }
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
