import React, { useState } from "react";
import GlobalUserState from "./contexts/GlobalUserState";
import Routes from "./Routes";
import { GlobalUserStateInterface } from "./contexts/GlobalUserState";
import './assets/main.css';
function App() {
  const [globalUserState, setGlobalUserState] = useState<GlobalUserStateInterface>({});
  //use GlobalUserState
  return (
    <GlobalUserState.Provider value={{ globalUserState, setGlobalUserState }}>
      <Routes />
    </GlobalUserState.Provider>
  );
}

//   return (
//     <GlobalUserState.Provider value={[state, setState]}>
//       <Routes />
//     </GlobalUserState.Provider>
//   );
// }

export default App;
