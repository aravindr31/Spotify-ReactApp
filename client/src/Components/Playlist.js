import React from "react";
import { useStateProviderValue } from "../StateProvider";
import "./Playlist.css"
function Playlist({imageUrl , songName , artistName,trackUri}) {
  const [{nowPlaying},dispatch]=useStateProviderValue()
  const handlePlay = ()=>{
dispatch({
  type:"SET_NOW_PLAYING",
  nowPlaying:{uri:trackUri}
})
  }
  return (
    <div className="playlist"onClick={handlePlay}>
      <img className="albumImage" src={imageUrl} alt="" />
      <div className="songDetails">
      <h4 className="songName">{songName}</h4>
      <h5 className="artistName">{artistName}</h5>
      </div>
    </div>
  );
}

export default Playlist;
