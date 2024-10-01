import React from "react";
import logo from "./logo.svg";
import "./styles/App.css";
import Login from './Components/Login.js';
import CreateAccount from './Components/CreateAccount.js'
import LoadingPage from "./Pages/LoadingPage.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ConfirmationPage from "./Pages/ConfirmationPage.js";
import Header from './Components/Header.js';

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api/")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <>
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/create-account" element={<CreateAccount/>}/>
          <Route path="/confirmation" element={<ConfirmationPage/>}/>
        </Routes>
      </Header>
    </BrowserRouter>
    </>
  );
}

export default App;
