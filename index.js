const app = require('express')();
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
})

app.get('/median_pickup_time', (req, res) => {
  
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})