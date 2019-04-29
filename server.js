const express = require("express");
const app = express();

// const bodyParser = require('body-parser');
const data = require("./data");

// app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));


app.get("/", function(req, res){
    res.sendfile('index.html'); 
});

//routes api to /data
app.get("/data", (req, res) => {
  return res.send(data);
});

var PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
