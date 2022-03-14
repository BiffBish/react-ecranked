// import React, {useState , useRef, useEffect} from 'react'
import React, { useState } from "react";
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
