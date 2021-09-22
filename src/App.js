// import React, {useState , useRef, useEffect} from 'react'
import React, { useState } from "react";
import styled from "styled-components";

import Replay from "./pages/Replay";
import User from "./pages/User";
import Nav from "./components/Nav";

import AnimateHeight from "react-animate-height";

// import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
//import { Button } from "@mui/material";
const PageBody = styled.div`
  position: absolute;
  width: 100%;
  z-index: -1;
  background-color: #222;
  min-height: 1000px;
`;
const combatBackground = "/images/combat_background.jpg";
const Banner = styled(AnimateHeight)`
  text-align: center;
  /* Accent / Default */
  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  margin: 0px;
  overflow: visible;
  z-index: -1;
  font-size: 60px;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  color: #fff;
`;

function App() {
  // const [todos, setTodos] = useState([])
  // const todoNameRef = useRef()
  // useEffect(() => {
  //   const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
  //   if (storedTodos) setTodos(storedTodos)
  // },[])

  // useEffect(()=>{
  //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  // },[todos])

  // function toggleTodo(id){
  //   const newTodos = [...todos]
  //   const todo = newTodos.find(todo => todo.id === id)
  //   todo.complete = !todo.complete
  //   setTodos(newTodos)
  // }

  // function handleAddTodo(e) {
  //   const name = todoNameRef.current.value
  //   if (name === '') return
  //   setTodos(prefTodos =>{
  //     return [...prefTodos, {id:name, name:name , complete:false}]
  //   })

  // }

  // function clearTodos(e) {
  //   const newTodos = todos.filter(todo => !todo.complete)
  //   setTodos(newTodos)
  // }

  const [BannerHeight, setBannerHeight] = useState(400);
  const [BannerText, setBannerText] = useState("ECRanked");

  return (
    <Router>
      <Nav style={{ height: "10px" }} />
      <PageBody>
        {}
        <Banner
          id="example-panel"
          duration={500}
          height={BannerHeight}
          style={{
            backgroundImage: `url(${combatBackground})`,
            overflow: "visible",
          }}
        >
          {BannerText}
        </Banner>
        <Route
          path={`/home`}
          render={(props) => {
            console.log("Home");
            setBannerHeight(400);
            setBannerText("ECRanked");
            return <></>;
          }}
        />
        <Route
          path={`/user/:username/stats`}
          render={(props) => {
            setBannerHeight(100);
            setBannerText(props.match.params.username);
            console.log("User");
            return <User username={props.match.params.username} />;
          }}
        />
        <Route
          path={`/replay/:session_id`}
          render={(props) => {
            setBannerHeight(100);
            setBannerText("Replay");
            console.log("User");
            return <Replay session_id={props.match.params.session_id} />;
          }}
        />
      </PageBody>
    </Router>
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
