import React from "react";
import { useStateProviderValue } from "../StateProvider";
import TrackCard from "./TrackCard";
import "../Stylesheets/SearchResult.css";
function SearchResult() {
  const [{ searchResult }] = useStateProviderValue();
  if (searchResult.length === 0) return [];
  return (
    <div className="searchResult">
      <div className="songfield">
        <h1>Top Results</h1>
        <div className="songdata">
          {searchResult.map((track) => (
            // console.log(track)
            <TrackCard 
            key={track.uri}
            imageUrl={track.album.images[0].url}
            songName={track.album.name}
            artistName={track.album.artists[0].name}
            trackUri= {track.uri}
          />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchResult;
