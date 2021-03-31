import { useEffect, useState } from "react";
import axios from "axios";
import { useStateProviderValue } from "./StateProvider";

export default function Auth(code) {
  const [refreshToken, setRefreshToken] = useState();
  const [{ accessToken, expiresIn }, dispatch] = useStateProviderValue();

  useEffect(() => {
    axios
      .post("http://localhost:5000/login", { code })
      .then((response) => {
        setRefreshToken(response.data.refresh_token);

        dispatch({
          type: "SET_TOKEN",
          accessToken: response.data.access_token,
        });
        dispatch({
          type: "SET_EXPIRY",
          expireIn: response.data.expireIn,
        });
        window.history.pushState({}, "", "/");
      })
      .catch(() => {
        window.location = "/";
      });
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      axios
        .post("http://localhost:5000/refresh", { refreshToken })
        .then((response) => {
          dispatch({
            type: "SET_TOKEN",
            accessToken: response.data.access_token,
          });
          dispatch({
            type: "SET_EXPIRY",
            expireIn: response.data.expireIn,
          });

          window.history.pushState({}, "", "/");
        })
        .catch(() => {
          window.location = "/";
        });
    }, (expiresIn - 60) * 1000);
    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return accessToken;
}
