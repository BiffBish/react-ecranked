// import React, {useState , useRef, useEffect} from 'react'
import React, { useEffect, useState, useRef, useMemo } from "react";
import { Redirect, useHistory } from "react-router-dom";
import styled from "styled-components";

import Replay from "./pages/Replay";
import User from "./pages/User";
import Home from "./pages/Home";
import ApproveImagesModeration from "./pages/Moderation/ApproveImagesModeration";
import Moderator from "./pages/Moderator";
import Nav from "./components/Nav";

import Team from "./pages/Team";

import AnimateHeight from "react-animate-height";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Changelog from "./pages/Changelog";

// import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Leaderboard from "./pages/Leaderboard";
import UncontactedUsersModeration from "./pages/Moderation/UncontactedModeration";
import MakeTeam from "./pages/MakeTeam";
import Teams from "./pages/Teams";

import Component from "./pages/Testing";
import GlobalUserState from "./contexts/GlobalUserState";
import Routes from "./Routes";
//import { Button } from "@mui/material";

function App() {
  // const history = React.useHistory();

  const [state, setState] = useState({});
  return (
    <GlobalUserState.Provider value={[state, setState]}>
      <Routes />
    </GlobalUserState.Provider>
  );
}

// const Home = () => {
//   return (
//     <div>
//       <h1>Home Page</h1>
//     </div>
//   );
// };

export default App;
