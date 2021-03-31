import "./App.css";
import Home from "./Components/Home";
import Login from "./Components/Login";

function App() {
  const code = new URLSearchParams(window.location.search).get("code");

  return (
    code ? <Home code={code} /> : <Login />
  );
}

export default App;
