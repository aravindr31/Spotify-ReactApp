import React, { useState } from "react";
import "./Player.css";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import { Avatar, IconButton } from "@material-ui/core";
import { useStateProviderValue } from "../StateProvider";
import Body from "./Body";
import SearchResult from "./SearchResult";

function Player({ spotifyApi }) {
  const [
    { user, accessToken, searchResult, albumPage },
    dispatch,
  ] = useStateProviderValue();
  const [search, setSearch] = useState("");

  spotifyApi.setAccessToken(accessToken);
  const handleSearch = (e) => {
    setSearch(e.target.value);

    if (!search) return;
    let cancelRequest = false;
    spotifyApi.searchTracks(search).then((data) => {
      if (cancelRequest) return;
      dispatch({
        type: "SET_SEARCH_RESULT",
        searchResult: data.body.tracks.items.map((track) => {
          return track;
        }),
      });
    });
    return () => (cancelRequest = true);
  };
  // console.log(searchResult)
  return (
    <div className="player">
      <div className="header">
        <div className="header_left">
          <IconButton>
            <ArrowBackIosRoundedIcon className="arrows" />
          </IconButton>
          <IconButton>
            <ArrowForwardIosRoundedIcon className="arrows" />
          </IconButton>
          <div className="search">
            <SearchRoundedIcon />
            <input
              type="text"
              placeholder="Search Music"
              onChange={handleSearch}
              // (e) => search.setSearch(e.target.value)
            />
          </div>
        </div>
        <div className="header_right">
          <Avatar src={user?.images[0]?.url} />
          <h3>{user?.display_name}</h3>
        </div>
      </div>
      <div className="body">{search ? <SearchResult /> : <Body />}</div>
    </div>
  );
}

export default Player;
