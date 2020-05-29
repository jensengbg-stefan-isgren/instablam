const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const webPush = require("web-push");
const app = express();
const port = process.env.PORT || 3000;
const host = "localhost";

app.use(cors());
app.use(bodyParser.json());

//console.log(webPush.generateVAPIDKeys());

const publicKey = "BE-Fzt6TTM534ns01-SFpY_SJwIbruFGd4s-715LKazGf3x4OJACMAPZ_N4I1hA3ZZEoyocL00x-BfIGjNdMaJ0";
const privateKey = "oaW-mLqRgMs4kxxuZy4YvXlfk0w2XXF436rfKA31-cU";

const dummyDb = { subscription: null };
const saveToDatabase = async (subscription) => {
  dummyDb.subscription = subscription;
};
app.post("/notifications/save", (req, res) => {
  const body = req.body;
  saveToDatabase(body);
  res.send(JSON.stringify({ success: true }));
});

const sendNotification = async (subscription, dataToSend, options) => {
  if (subscription === null) {
    return { success: false, error: "No subscription registered" };
  }
  try {
    await webPush.sendNotification(subscription, dataToSend, options);
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: error.body,
    };
  }
};

app.post("/notifications/send", async (req, res) => {
  const subscription = dummyDb.subscription;
  const options = {
    vapidDetails: {
      subject: "http://insta.bl.am",
      publicKey: publicKey,
      privateKey: privateKey,
    },
  };

  let resp = await sendNotification(subscription, JSON.stringify(req.body), options);

  res.send(JSON.stringify(resp));
});

app.listen(port, () => {
  console.log(`server started on port ${port} @ http://${host}:${port} `);
});
