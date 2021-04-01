import React from "react";
import { useStateProviderValue } from "../StateProvider";
import "../Stylesheets/Options.css";

function Options({ option, Icon, id, trackUri }) {
  const [{ nowPlaying }, dispatch] = useStateProviderValue();

  // console.log(id)
  const handlePlay = () => {
      if(!trackUri) return 
    dispatch({
      type: "SET_NOW_PLAYING",
      nowPlaying: { uri: trackUri },
    });
  };
  return (
    <div className="options" onClick={handlePlay}>
      {Icon && <Icon className="options_icons" />}
      {Icon ? <h4>{option}</h4> : <p>{option}</p>}
    </div>
  );
}

export default Options;
