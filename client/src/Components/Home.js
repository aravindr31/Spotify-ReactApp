import React, { useEffect, useState } from "react";
import Auth from "../Auth";
import Player from "./Player";
import Sidebar from "./Sidebar";
import "../Stylesheets/Home.css";
import SpotifyWebApi from "spotify-web-api-node";
import { useStateProviderValue } from "../StateProvider";
import Footer from "./Footer";

function Home({ code }) {
  const [
    { user, accessToken, dPlaylist, rPlaylist ,nowPlaying,},
    dispatch,
  ] = useStateProviderValue();
  Auth(code); //Auth hook call

  const spotifyApi = new SpotifyWebApi({
    clientId: "31794e88e1254626ad086c68c79cfb89",
  });
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);

    spotifyApi.getMe().then(
      (data) => {
        dispatch({
          type: "SET_USER",
          user: data.body,
        });
      },
      (err) => {
        console.log(err);
      }
    );
    spotifyApi.getUserPlaylists().then(
      (data) => {
        dispatch({
          type: "SET_PLAYLIST",
          playlist: data.body,
        });
      },
      (err) => {
        console.log(err);
      }
    );

    spotifyApi.getPlaylist("37i9dQZEVXcNpFMISBhCCe").then((data) => {
      dispatch({
        type: "SET_DEFAULTPLAYLIST",
        dPlaylist: data.body,
      });
      spotifyApi
        .getMyRecentlyPlayedTracks({
          limit: 20,
        })
        .then((data) => {
          let recentPlaylist = {
            name: "Recently Played",
            track_details: data.body,
          };
          dispatch({
            type: "SET_RECENTPLAYLIST",
            rPlaylist: recentPlaylist,
          });
        });
    });
    spotifyApi
      .getNewReleases({ limit: 30, offset: 0, country: "SE" })
      .then((data) => {
        // console.log(data.body);
        let NReleases = {
          name: "New Releases",
          track_details: data.body,
        };
        dispatch({
          type: "SET_NEW_RELEASES",
          newReleases: NReleases,
        });
      });

    spotifyApi.getMyTopTracks({ limit: 6 }).then((data) => {
      dispatch({
        type: "SET_TOPTRACKS",
        topTracks: data.body.items,
      });
    });
    
  }, [accessToken]);
  return (
    <div className="home">
      <div className="home_components">
        <Sidebar />
        <Player spotifyApi={spotifyApi}  />
        <Footer />
      </div>
    </div>
  );
}
export default Home;
