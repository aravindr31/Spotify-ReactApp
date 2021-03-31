require("dotenv").config();

const express = require("express");
const spotifyApi = require("spotify-web-api-node");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const spotifyAuth = new spotifyApi({
  redirectUri: process.env.REDIRECT_URI,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});



app.post("/login", (req, res) => {
  const code = req.body.code;

  spotifyAuth
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        access_token: data.body.access_token,
        refresh_token: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
      //   console.log("from data")
    })
    .catch((err) => {
      console.log(err);
    });
});
app.post("/refresh", (req, res) => {
  console.log("api call");
  const refreshToken = req.body.refresh_token;

  // console.log("hi")
  spotifyAuth
    .refreshAccessToken(refreshToken)
    .then((data) => {
      res.json({
        refresh_token: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});


app.listen(PORT, () => {
  console.log("Server running");
});
