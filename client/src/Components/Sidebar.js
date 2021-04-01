import React from "react";
import Options from "./Options";
import "../Stylesheets/Sidebar.css";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import LibraryMusicOutlinedIcon from "@material-ui/icons/LibraryMusicOutlined";
import { useStateProviderValue } from "../StateProvider";
function Sidebar() {

  const[{playlist}]=useStateProviderValue();
  // console.log(playlist)
  return (
    <div className="sidebar">
      <img
        className="sidebar_logo"
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png"
        alt=""
      />
      <Options option="Home" Icon={HomeOutlinedIcon} />
      <Options option="Search" Icon={SearchOutlinedIcon} />
      <Options option="Library" Icon={LibraryMusicOutlinedIcon} />
      <br />
      <h4 className="sidebar_playlist">PLAYLISTS</h4>
      <hr />
      <br/>
      <div className="sidebar_playlist_options">
      {playlist?.items?.map((item) => (
        <Options key={item.uri}  id={item.id} option={item.name} trackUri={item.uri}/>
      ))}
      </div>
    </div>
  );
}

export default Sidebar;
