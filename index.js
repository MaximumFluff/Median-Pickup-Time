const app = require('express')();
const path = require('path');
const csv = require('csv-parser');
const fs = require('fs');
const calculateMedian = require('./src/calculateMedian');
const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/median_pickup_time', (req, res) => {
  let pickups = [];
  let startTime = new Date(req.query.start_time);
  let endTime = new Date(req.query.end_time);
  // Parse the CSV file and push all values with matching location to array
  fs.createReadStream('./CSV/pickup_times.csv')
    .pipe(csv())
    .on('data', row => {
      // Sort data based on start times, end times and location id in query
      let pickupTime = new Date(row.iso_8601_timestamp);
      if (row.location_id == req.query.location_id) {
        if (pickupTime >= startTime && pickupTime <= endTime) {
          pickups.push(row);
        }
      }
    })
    .on('end', () => {
      if (pickups.length == 0) res.json({ 'ERROR': 'No values found within that range' })
      const median = calculateMedian(pickups);
      if (pickups.length != 0) {
        res.json({
          'median': median,
        })
      }
    });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
