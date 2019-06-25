const app = require('express')();
const path = require('path');
const csv = require('csv-parser');
const fs = require('fs');
const Location = require('./src/Objects/Location');
const PickupTime = require('./src/Objects/PickupTime');
const port = process.env.PORT || 8000;

let locations = [];
let pickups = [];

fs
  .createReadStream('./CSV/locations.csv')
    .pipe(csv())
    .on('data', (row) => {
      locations.push(row);
    })
    .on('end', () => {
      console.log('Location CSV file successfully processed');
    })
fs
  .createReadStream('./CSV/pickup_times.csv')
    .pipe(csv())
    .on('data', row => {
      pickups.push(row);
    })
    .on('end', () => {
      console.log('Pickup CSV file succesfully processed');
    })

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
})

app.get('/median_pickup_time', (req, res) => {
  const testBody = {
    location_id: req.query.location_id,
    start_time: req.query.start_time,
    end_time: req.query.end_time,
  }
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})