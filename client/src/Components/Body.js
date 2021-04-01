import React, { useEffect, useState } from "react";
import { useStateProviderValue } from "../StateProvider";
import "../Stylesheets/Body.css";
import TrackCard from "./TrackCard";
import TopGlassContainer from "./TopGlassContainer";
function Body() {
  const [
    { newReleases, rPlaylist, topTracks, nowPlaying },
    dispatch,
  ] = useStateProviderValue();
  // console.log(topTracks)
  const [greeting, setGreeting] = useState("Good Day");
  const time = new Date().getHours();
  useEffect(() => {
    if (time < 12) {
      setGreeting("Good morning");
    } else if (time < 16) {
      setGreeting("Good afternoon");
    } else if (time < 19) {
      setGreeting("Good evening");
    } else {
      setGreeting("Good night");
    }
  }, [time]);

  return (
    <div className="body">
      <div className="head">
        <h1>{greeting}</h1>
        <div className="recentFlexContainer">
          {topTracks?.map((item) => (
            <TopGlassContainer key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div className="songfield">
        <h1>{newReleases?.name}</h1>
        <div className="songdata">
          {newReleases?.track_details.albums.items.slice(0, 4).map((item) => (
            <TrackCard
            // track={item}
              key={item.uri}
              imageUrl={item.images[0].url}
              songName={item.name}
              artistName={item.artists[0].name}
              trackUri={item.uri}
            />
          ))}
        </div>
        <h1>{rPlaylist?.name}</h1>
        <div className="songdata">
          {rPlaylist?.track_details.items.slice(0, 4).map((item) => (
// console.log(item)
            <TrackCard
            track={item}
              key={item.track.id}
              imageUrl={item.track.album.images[0].url}
              songName={item.track.album.name}
              artistName={item.track.album.artists[0].name}
              trackUri={item.track.uri}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Body;
