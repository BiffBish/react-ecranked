// import React, {useState , useRef, useEffect} from 'react'
import React from 'react'

import Replay from "./pages/Replay"
import User from "./pages/User"
import Nav from "./components/Nav"
// import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';

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


  return (
    <Router>
      <div className="App">
        <Nav />
        <Route path="/" component = {Home} />
        <User />
        <Replay />
      </div> 
    </Router>

  )
}

const Home = () => {
  <div>
    <h1>Home Page</h1>
  </div>
}


export default App;
