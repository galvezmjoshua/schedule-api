const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 51000;
const assert = require('assert')
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const uri = 'mongodb+srv://LunchApp:IxzAJ9NZtl1K3fdR@cluster0.jz3s8.mongodb.net/LunchSchedule?retryWrites=true&w=majority';

const lineRoute = require('./routes/line.routes')

mongoose.Promise = global.Promise;
mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.log('Database connected sucessfully !')
},
    error => {
        console.log('Database could not be connected : ' + error)
    }
)

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/", lineRoute);

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});

function getWeek(s, l) {
  if(!(s)) {
    return 1;
  }
  let d = new Date()
  let day = d.getDay()
  let difference = (d - s) + ((s.getTimezoneOffset() - d.getTimezoneOffset()) * 60 * 1000);
  let oneDay = 1000 * 60 * 60 * 24;
  let dayNum = Math.floor(difference / oneDay);
  let week = (dayNum / 7) % l;
  return Math.floor(week);
}
