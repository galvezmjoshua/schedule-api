const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 51000;
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert')
const uri = 'mongodb+srv://LunchApp:IxzAJ9NZtl1K3fdR@cluster0.jz3s8.mongodb.net/LunchSchedule?retryWrites=true&w=majority';
app.use(cors());

function getWeek(s, l) {
  let d = new Date()
  let day = d.getDay()
  let difference = (d - s) + ((s.getTimezoneOffset() - d.getTimezoneOffset()) * 60 * 1000);
  let oneDay = 1000 * 60 * 60 * 24;
  let dayNum = Math.floor(difference / oneDay);
  let week = (dayNum / 7) % l;
  return Math.floor(week);
}

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});

const router = express.Router();

app.use("/", router);

router.route("/").get(function(req, res) {
  res.send("Working");
});

router.route("/api/:data").get(function(req, res) {
  var result = [];
  if (req.params.data == 'lunch') {
    const client = new MongoClient(uri, { useUnifiedTopology: true, useNewUrlParser: true });
    client.connect(err => {
      assert.equal(null, err);
      console.log("Connected correctly to server");
      const col = client.db("LunchSchedule").collection("LunchSchedTest");
      const cursor = col.find();
      cursor.forEach(function(doc, err) {
        assert.equal(null, err);
        if(doc.Type == "WEEKLY") {
          doc['Week'] = getWeek(doc.Start, doc.Items[1][0].length)
        }
        result.push(doc)
      }, function() {
        client.close();
        res.send(result)
      })
    });
  } else {
    res.send('No file').status(404)
  }
});
