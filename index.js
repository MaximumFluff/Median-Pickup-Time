// TODO: Further error checking
const app = require('express')();
const path = require('path');
const cache = require('memory-cache');
const parseCv = require('./src/parseCv');
const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/median_pickup_time', (req, res) => {
  const cachedValue = cache.get(req.url);
  if (cachedValue) {
    res.json(cachedValue);
  }
  else {
    if (!req.query.start_time || !req.query.end_time || !req.query.location_id) {
      res.json({ ERROR: 'One or more required parameters missing from request' });
    } 
    else {
      parseCv(req, res);
    }
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
