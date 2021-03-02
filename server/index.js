const express = require('express');

const bodyParser = require ('body-parser');

var cors = require("cors");
//create express app
const app = express();

//set up server port
const port = 5000;

app.use(cors());

//parse request data content type application/x-www-form-rulencoded
app.use(bodyParser.urlencoded({extended: false}));

//parse request data content type application/json
app.use(bodyParser.json());

//define root route
app.get('/', (req, res) => {
  res.send('Hello World!')
});

//import release routes
const releaseRoutes = require('./src/routes/release.route');

//create release routes 
app.use('/api/release', releaseRoutes);

//listen to the port
app.listen(port, () => {
  console.log(`expressserver is running at http://localhost:${port}`);
});