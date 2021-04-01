import React from "react";
import "../Stylesheets/Footer.css";
import { useStateProviderValue } from "../StateProvider";
import SpotifyPlayer from "react-spotify-web-playback";
function Footer() {
  
  const [
    { accessToken, nowPlaying, playState },
    dispatch,
  ] = useStateProviderValue();

  if (!nowPlaying || !accessToken) return null;
  return (
    <div className="footer">
      <SpotifyPlayer
        className="player"
        token={accessToken}
        showSaveIcon
        uris={nowPlaying ? [nowPlaying.uri] : []}
        styles={{
          color: "#fff",
          height: 40,
          sliderTrackBorderRadius: 5,
          sliderColor: "#1db954",
          sliderHandleColor: "#1db954",
        }}
        play={playState}
        initialVolume={0.5}
      />
    </div>
  );
}

export default Footer;
