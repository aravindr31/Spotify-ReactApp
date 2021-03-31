export const initialState = {
  user: null,
  expiresIn: null,
  accessToken: null,
   playlist: [],
  nowPlaying:null,
  playState:true,
  searchResult:[],
  albumPage:false,
};

export const reducer = (state, action) => {
  //   console.log(action);
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_TOKEN":
      return {
        ...state,
        accessToken: action.accessToken,
      };
    case "SET_EXPIRY":
      return {
        ...state,
        expiresIn: action.expiresIn,
      };
    case "SET_PLAYLIST":
      return {
        ...state,
        playlist: action.playlist,
      };
    case "SET_DEFAULTPLAYLIST": {
      return {
        ...state,
        dPlaylist: action.dPlaylist,
      };
    }
    case "SET_RECENTPLAYLIST": {
      return {
        ...state,
        rPlaylist: action.rPlaylist,
      };
    }
    case "SET_TOPTRACKS": {
      return {
        ...state,
        topTracks: action.topTracks,
      };
    }
    case "SET_NEW_RELEASES": {
      return {
        ...state,
        newReleases: action.newReleases,
      };
    }
    case "SET_NOW_PLAYING":{
      return{
        ...state,
        nowPlaying:action.nowPlaying,
      }
    }
    case "SET_PLAYSTATE":{
      return{
        ...state,
        playState:action.playState,
      }
    }
    case "SET_SEARCH_RESULT":{
      return{
        ...state,
        searchResult:action.searchResult,
      }
    }
    case "SET_ALBUMPAGE":{
      return{
        ...state,
        albumPage:action.albumPage,
      }
    }
    default:
      return state;
  }
};

export default reducer;
