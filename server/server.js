const express = require("express");
const spotifyApi = require("spotify-web-api-node");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());



const spotifyAuth = new spotifyApi({
  redirectUri : "http://localhost:3000",
  clientId : "31794e88e1254626ad086c68c79cfb89",
  clientSecret : "5909bab9bfc7460d8f0a0b46b46a927b",
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
app.listen(5000, () => {
  console.log("Server running");
});
