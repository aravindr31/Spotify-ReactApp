import React from "react";
import "../Stylesheets/Login.css";

const clientid = "31794e88e1254626ad086c68c79cfb89";
const redirect_url = "http://localhost:3000";

const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
  "streaming",
  "user-read-email",
  "user-read-private",
  "user-library-read",
  "user-library-modify",  
];

const auth_url = `https://accounts.spotify.com/authorize?client_id=${clientid}&response_type=code&redirect_uri=${redirect_url}&scope=${scopes.join(
  "%20"
)}`;

function Login() {
  return (
    <div className="login">
      <img
        className="login_logo"
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png"
        alt=""
      />
      <a href={auth_url} className="login_button">
        LOGIN WITH SPOTIFY{" "}
      </a>
    </div>
  );
}

export default Login;
