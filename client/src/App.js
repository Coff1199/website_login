import React from "react";
import logo from "./logo.svg";
import "./styles/App.css";
import Login from './Components/Login.js';
import CreateAccount from './Components/CreateAccount.js'

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api/")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? "Loading..." : data}</p>
        <CreateAccount />
      </header>
    </div>
  );
}

export default App;
