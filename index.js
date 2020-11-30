const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Set static path
app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());

const publicVapidKey =
  "BGjL1smDeVnlhBb3Ad-nwRXTryel2a400mo1TLYnnwoTWfQT2oIGXdVRDGGbIAxPrdxFW4YrCjfZthlTBTSpdbw";
const privateVapidKey = "rpF-nYAA-7MgTg3rM7yFdagxUHdEYbuxTTr45Hfya1M";

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

// Subscribe Route
app.post("/subscribe", (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;

  // Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({ title: "Push Test" });

  // Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
});

const port = 5001;

app.listen(port, () => console.log(`Server started on port ${port}`));