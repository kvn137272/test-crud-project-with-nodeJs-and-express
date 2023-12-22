require('dotenv').config();
const mongoose = require('mongoose');
const express= require('express')
const bodyParser = require('body-parser');
const PORT= 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json())
const {connect} = require('./dbConnection/dbConnection');

app.use('/posts',require('./routes/posts'));
app.all('*',(req,res)=>{
    res.sendStatus(404)
})
connect()
mongoose.connection.once("open", () => {
    console.log("connection is success");
    app.listen(PORT, () => {
      console.log(`listen on port ${PORT}`);
    });
  });


