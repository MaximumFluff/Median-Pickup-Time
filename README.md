# Median Pickup Time REST API

Running this code requires that Node.js and Git is installed on your computer, before you proceed make sure that you have them installed, otherwise download the installers from their respective websites:

[Node.js]('https://nodejs.org/en/download/')

[Git]('https://git-scm.com/downloads')



## Installation and usage instructions
- In the terminal, clone this repository with this command: ` git clone https://github.com/MaximumFluff/Median-Pickup-Time.git`
- navigate to the new folder within the terminal and run ` npm install ` inside the repository folder, this will install the required dependencies
- Within the folder, type ` node index.js ` within the terminal and hit enter, this will run the server on port 8000 on localhost
- The endpoint will then be ` localhost:8000/median_pickup_time ` which you can test with your web browser
- Passing the values is done through the URL like so: ` localhost:8000/median_pickup_time?location_id=12&start_time=2019-01-09T20:00:00&end_time=2019-01-09T21:00:00 `
- Navigating to ` localhost:8000 ` in your browser will return a HTML page with a brief tutorial on using the API

## Code Explanation
When a request is sent to the API, it first checks to see if a cached value using the URL as a key exists, if it does it will send a JSON response containing that cached value.

If not, it proceeds to check the URL and that all required parameters have been passed. If not, it will send an error message.

When all parameters are passed it will parse the values to ensure they are in the correct format and proceed to parse the CSV file and retrieve the required values based on the parameters.

It will then calculate the median, save the result to the cache and return that value. If nothing is found based on those paramters it will cache an error message and send that response. All cached values are saved for 1 minute.

If you wish to change which CSV file it parses, simply edit the string passed to the createReadStream function inside the parseCv.js file to point the path to a different CSV file.