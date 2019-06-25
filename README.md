# Median Pickup Time REST API

Running this code requires that Node.js and Git is installed on your computer, before you proceed make sure that you have them installed, otherwise download the installers from their respective websites

## Installation and usage instructions
- In the terminal, clone this repository with this command: ` git clone https://github.com/MaximumFluff/Median-Pickup-Time.git`
- run ` npm install ` inside the repository folder, this will install the required dependencies
- Within the folder, type ` node index.js ` within the terminal and hit enter, this will run the server on port 8000 on localhost
- The endpoint will then be ` localhost:8000/median_pickup_time ` which you can test with your web browser
- Passing the values is done through the URL like so: ` localhost:8000/median_pickup_time?location_id=12&start_time=2019-01-09T20:00:00&end_time=2019-01-09T21:00:00 `
- ` localhost:8000 ` will return a HTML page with a brief tutorial on using the API