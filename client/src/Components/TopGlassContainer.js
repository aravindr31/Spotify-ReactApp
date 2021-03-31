import React from "react";
import { useStateProviderValue } from "../StateProvider";
import "./TopGlassContainer.css";

function TopGlassContainer({ item }) {
  const [{ nowPlaying, playState }, dispatch] = useStateProviderValue();

  const handlePlay = () => {
    dispatch({
      type: "SET_NOW_PLAYING",
      nowPlaying: item,
    });
    dispatch({
      type: "SET_PLAYSTATE",
      playState: true,
    });
  };

  return (
    <div
      className="topGlassContainer"
      key={item.album.uri}
      onClick={handlePlay}
    >
      <img src={item.album.images[0].url} alt="" />
      <h2>{item.album.name}</h2>
    </div>
  );
}

export default TopGlassContainer;
