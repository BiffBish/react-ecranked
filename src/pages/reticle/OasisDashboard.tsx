import React from "react";
import { useRef, useEffect } from "react";
import useState from 'react-usestateref';
import styled from "styled-components";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { Shortener } from "@ecranked/api"
function JoinServer(client: W3CWebSocket | null, sessionID: string, teamID: number) {
  client?.send(
    JSON.stringify({
      command: "join-server",
      session_id: sessionID,
      lobby_team: teamID,
    })
  );
}

const AutoCompleteInput = styled.input`
  background-color: transparent;
  // border: none;
  outline: none;
  color: #fff;
  font-size: 18px;
  padding: 8px;
  font-family: "Montserrat", sans-serif;
  z-index: 50;
  // width: 10px;
`;

interface RadioSwitchProps {
  label: string
  value?: (string | number)
  setCurrent: (value: string | number) => void
  current: string | number,
  buttonStyle?: React.CSSProperties
  buttonClassName?: string
}
const RadioSwitch = ({ label, value, current, setCurrent, buttonStyle, buttonClassName }: RadioSwitchProps) => {
  if (value === undefined) {
    value = label;
  }
  return (
    <div
      className={"rounded button padded" + (buttonClassName ? " " + buttonClassName : "")}
      onClick={() => {
        if (value === undefined) {
          setCurrent(label);
        } else {
          setCurrent(value);
        }
      }}
      style={{
        backgroundColor: current === value ? "#444" : undefined,
        ...buttonStyle,
      }}
    >
      {label}
    </div>
  );
};


interface HostGameOptionsProps {
  websocket: W3CWebSocket
}
const HostGameOptions = ({ websocket }: HostGameOptionsProps) => {
  const [gameName, setGameName] = useState<string | number>("");
  const [gameRegion, setGameRegion] = useState<string | number>("");
  const [gameTeam, setGameTeam] = useState<string | number>("");
  // const history = useHistory();
  function onSubmit() {
    if (gameName === "" || gameRegion === "" || gameTeam === "") {
      alert("Please fill out all fields");
      return;
    }
    websocket.send(
      JSON.stringify({
        command: "create-server",
        map: gameName,
        region: gameRegion,
        lobby_team: gameTeam,
      })
    );
  }
  return (
    <div className="horizontal-fill border-thick padded">
      <div className="list no-gap" >
        <div className="centered">Map</div>
        <div className="grid-container">
          <RadioSwitch
            label={"Dyson"}
            value={"mpl_combat_dyson"}
            current={gameName}
            setCurrent={setGameName}
            buttonStyle={{
              borderRadius: "0px", border: "none"

            }}
          />
          <RadioSwitch
            label={"Combustion"}
            value={"mpl_combat_combustion"}
            current={gameName}
            setCurrent={setGameName}

            buttonStyle={{
              borderRadius: "0px", border: "none"

            }}
          />
          <RadioSwitch
            label={"Fission"}
            value={"mpl_combat_fission"}
            current={gameName}
            setCurrent={setGameName}
            buttonStyle={{
              borderRadius: "0px", border: "none"

            }}
          />
          <RadioSwitch
            label={"Surge"}
            value={"mpl_combat_gauss"}
            current={gameName}
            setCurrent={setGameName}
            buttonStyle={{
              borderRadius: "0px",
              border: "none"
            }}
          />
          <div
            className="button padded"
            style={{
              gridArea: "bottombar"
            }}
            onClick={async () => {
              //Do this animation 10 times
              for (let i = 0; i < 20; i++) {
                //Do a little animation that randomly selects a map
                const maps = ["mpl_combat_dyson", "mpl_combat_combustion", "mpl_combat_fission", "mpl_combat_gauss"];
                const randomMap = maps[Math.floor(Math.random() * maps.length)];
                setGameName(randomMap);
                //Wait a little bit. have it slow down a little bit
                const waitTime = i;
                await new Promise(resolve => setTimeout(resolve, waitTime * 10));
              }
            }}
          >
            Random
          </div>
        </div>
      </div>
      <div className="list no-gap">
        <div className="centered">Region</div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto",
          // grid-template-areas:
          //   'topbar topbar'
          //   'left right'
          //   'bottombar bottombar';
          gap: "4px",
          backgroundColor: "rgb(70, 70, 70)",

          padding: "4px",
        }}>

          <RadioSwitch
            label={"usw"}
            current={gameRegion}
            setCurrent={setGameRegion} buttonStyle={{
              borderRadius: "0px",
              border: "none"
            }}
          />
          <RadioSwitch
            label={"usc"}
            current={gameRegion}
            setCurrent={setGameRegion} buttonStyle={{
              borderRadius: "0px",
              border: "none"
            }}
          />
          <RadioSwitch
            label={"uscn"}
            current={gameRegion}
            setCurrent={setGameRegion} buttonStyle={{
              borderRadius: "0px",
              border: "none"
            }}
          />
          <RadioSwitch
            label={"use"}
            current={gameRegion}
            setCurrent={setGameRegion} buttonStyle={{
              borderRadius: "0px",
              border: "none"
            }}
          />
          <RadioSwitch
            label={"euw"}
            current={gameRegion}
            setCurrent={setGameRegion} buttonStyle={{
              borderRadius: "0px",
              border: "none"
            }}
          />
          <RadioSwitch
            label={"jp"}
            current={gameRegion}
            setCurrent={setGameRegion} buttonStyle={{
              borderRadius: "0px",
              border: "none"
            }}
          />
          <RadioSwitch
            label={"aus"}
            current={gameRegion}
            setCurrent={setGameRegion}
            buttonStyle={{
              borderRadius: "0px",
              border: "none"
            }}
          />
        </div>

      </div>
      <div className="list no-gap">
        <div className="centered">Team</div>

        <div className="grid-container">
          <RadioSwitch
            label={"Spectate"}
            value={2}
            current={gameTeam}
            setCurrent={setGameTeam}
            buttonStyle={{
              borderRadius: "0px",
              gridArea: "topbar", border: "none"

            }}
          />
          <RadioSwitch
            label={"Blue"}
            value={0}
            current={gameTeam}
            setCurrent={setGameTeam}
            buttonStyle={{
              borderRadius: "0px",
              gridArea: "left", border: "none"

            }}
          />
          <RadioSwitch
            label={"Orange"}
            value={1}
            current={gameTeam}
            setCurrent={setGameTeam}
            buttonStyle={{
              borderRadius: "0px",
              gridArea: "right", border: "none"

            }}
          />
          <div
            className="button padded"
            style={{
              gridArea: "bottombar", border: "none"
            }}
            onClick={async () => {
              //Do this animation 10 times
              for (let i = 0; i < 20; i++) {
                //Do a little animation that randomly selects a map
                const maps = [0, 1];
                const randomMap = maps[Math.floor(Math.random() * maps.length)];
                setGameTeam(randomMap);
                //Wait a little bit. have it slow down a little bit
                const waitTime = i;
                await new Promise(resolve => setTimeout(resolve, waitTime * 10));
              }
            }}
          >
            Random


          </div>

        </div>
      </div>
      <div className="list no-gap">
        <div className="rounded button padded" onClick={onSubmit}>
          Launch
        </div>
      </div>

    </div>
  );
};





interface GameState {
  id: string;
  blueTeam: ETeam[];
  orangeTeam: ETeam[];
  mapName: string;
  startTime: number;
  reportingSocketIDs: string[];
}

interface RawServerWebsocketState {
  id: string;
  state: State;
}

interface State {
  id: string;
  blueTeam: ETeam[];
  orangeTeam: ETeam[];
  mapName: string;
  startTime: number;
  reportingSocketID: string;
}

interface RawServerState {
  sockets: RawServerWebsocketState[]
}

interface ETeam {
  id: number;
  name: string;
}


interface SocketGetStateData {
  command: "get-game-state",
  payload: RawServerWebsocketState[]
}
interface SocketDisconnectData {
  command: "socket-disconnected";
  payload: {
    id: string
  };
}
interface SocketUpdateData {
  command: "socket-updated";
  payload: SocketUpdatePayload;
}
interface SocketUpdatePayload {
  id: string;
  blueTeam: ETeam[];
  orangeTeam: ETeam[];
  mapName: string;
  startTime: number;
  reportingSocketID: string;
}
type SocketMessage = SocketUpdateData | SocketDisconnectData | SocketGetStateData;





interface ActiveGameProps {
  client: W3CWebSocket | null;
  gameState: GameState
}
const ActiveGame = ({ client, gameState }: ActiveGameProps) => {
  return (
    <div className="horizontal-fill">
      <div className="border disabled-button" style={{ flexGrow: 2 }}>
        {gameState.mapName}
      </div>
      <div
        className={
          gameState.orangeTeam.length < 4
            ? "border button list"
            : "border disabled-button list"
        }
        style={{ gap: "0px" }}
        onClick={() => JoinServer(client, gameState.id, 0)}
      >
        Join Blue ({gameState.blueTeam.length}/4)
        {gameState.blueTeam.map((player) => (
          <div>{"\n" + player.name}</div>
        ))}
      </div>
      <div
        className={
          gameState.orangeTeam.length < 4
            ? "border button list"
            : "border disabled-button list"
        }
        onClick={() => JoinServer(client, gameState.id, 1)}
        style={{ gap: "0px" }}
      >
        Join Orange ({gameState.orangeTeam.length}/4)
        {gameState.orangeTeam.map((player) => (
          <div>{"\n" + player.name}</div>
        ))}
      </div>
      <div
        className="border button"
        onClick={() => JoinServer(client, gameState.id, 2)}
      >
        Spectate
      </div>
      {gameState?.reportingSocketIDs?.length}
    </div>
  );
};


interface ActiveGamesProps {
  serverState: RawServerState
  client: W3CWebSocket | null
}
const ActiveGames = ({ client, serverState }: ActiveGamesProps) => {
  //Turn the raw serverState into a list of gameStates
  const gameStates: GameState[] = []

  serverState.sockets.forEach((socket) => {
    //See if the gameStates already have a gameState with the same id
    const existingGameState = gameStates.find((gameState) => gameState.id === socket.state.id);
    if (existingGameState) {
      //If it does, update the existing gameState
      existingGameState.blueTeam = socket.state.blueTeam;
      existingGameState.orangeTeam = socket.state.orangeTeam;
      existingGameState.mapName = socket.state.mapName;
      existingGameState.startTime = socket.state.startTime;
      existingGameState.reportingSocketIDs.push(socket.id);
    } else {
      //If it doesn't, create a new gameState
      gameStates.push({
        id: socket.state.id,
        blueTeam: socket.state.blueTeam,
        orangeTeam: socket.state.orangeTeam,
        mapName: socket.state.mapName,
        startTime: socket.state.startTime,
        reportingSocketIDs: [socket.id],
      });
    }
  });

  return (
    <div className="padded rounded list">
      <h2>Active Games</h2>
      {gameStates.map((game) => {
        return <ActiveGame client={client} gameState={game} />;
      })}
    </div>
  );
};

interface CurrentGameStateProps {
  currentGameState: number;
  gameID: string | null
}
const CurrentGameState = ({ currentGameState = 0, gameID = null }: CurrentGameStateProps) => {
  const [gameIDText, setGameIDText] = useState<string | null>(null);
  useEffect(() => {
    setGameIDText(gameID);
  }, [gameID]);
  switch (currentGameState) {
    case 0:
      return null;
    case 1:
      return (
        <div className="padded rounded horizontal-fill">
          <h3 className="centered">Transitioning...</h3>
        </div>
      );
    case 2:
      return (
        <div className="padded rounded horizontal-fill">
          <h3 className="centered">In Lobby!</h3>
        </div>
      );
    case 3:
      return (
        <div className="padded rounded horizontal-fill">
          <div
            className="padded button"
            onClick={async () => {
              let code = await Shortener.shortenData({
                sessionID: gameID,
                teamID: 0,
              })

              navigator.clipboard.writeText("<reticle://join/" + code + ">");
            }}
            onMouseEnter={() => {
              setGameIDText("Click to copy!");
            }}
            onMouseLeave={() => {
              setGameIDText(gameID);
            }}
          >
            {gameIDText}
          </div>
          <h3 className="centered">Connected to game!</h3>
        </div>
      );
    default:
      return null;
  }
};

interface reticlePreferencesInterface {
  executable_path: string;
  autojoin: string;
  launch_in_popup: string;
}




interface OasisDashboardProps {
  joinCode?: string;
}
export default function OasisDashboard({ joinCode }: OasisDashboardProps) {
  // const clientIP = "192.168.50.105:13113"
  const clientIP = "127.0.0.1:13113"

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [client, setClient] = useState<W3CWebSocket | null>(
    null
  )

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [serverLive, setServerLive] = useState<W3CWebSocket | null>(
    null
  )

  useEffect(() => {
    try {
      setClient(
        new W3CWebSocket("ws://" + clientIP)
      )
    } catch (error) {
      console.log(error)
    }
    try {
      setServerLive(new W3CWebSocket("wss://ecranked.ddns.net/websockets?state=activeGames"))
    } catch (error) {
      console.log(error)
    }
  }, [])


  const [gameHistory, setGameHistory] = useState<any[]>([]);

  const JoinGameIDRef = useRef();

  const [gameIDInput, setGameIDInput] = useState("");

  const [websocket, setWebsocket] = useState<W3CWebSocket | null>(null);

  const [showHostGame, setShowHostGame] = useState(false);

  const [currentServerState, setCurrentServerState] = useState<RawServerState>({
    sockets: [],
  });

  const [serverConnected, setServerConnected, serverConnectedRef] = useState(false);
  const [clientConnected, setClientConnected] = useState(false);

  const [reticlePreferences, setReticlePreferences] = useState<reticlePreferencesInterface>({
    autojoin: "",
    launch_in_popup: "",
    executable_path: "",
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_gameData, setGameData] = useState<any>({});
  // const [currentInterval, setCurrentInterval] = useState(null);

  const [gameID, setGameID] = useState<string | null>("");

  // 0 = Not in game
  // 1 = In menu
  // 2 = In lobby
  // 3 = In game
  const [currentGameState, setCurrentGameState] = useState(0);

  const [currentMenuState, setCurrentMenuState] = useState<number | string>("");

  const pingServer = () => {
    client?.send(
      JSON.stringify({
        command: "get-session",
      })
    );
  };


  //Everytime the gameState updates from the server, update the gameHistory
  useEffect(() => {
    if (currentGameState === 3) {
      setGameHistory(
        (current) => {
          return [
            ...current,
            _gameData
          ]
        }
      )
    }
    console.log(_gameData)
    console.log(gameHistory)
  }, [currentGameState]);

  useEffect(() => {
    console.log("client", client, client?.readyState, "server", serverLive?.readyState)
    if (client) {
      client.onerror = (error) => {
        console.error(error);
      };
      client.onopen = () => {
        console.log("WebSocket Client Connected");

        if (joinCode) {
          Shortener.getShortenedData<{
            sessionID: string,
            teamID: number
          }>(joinCode).then((data) => {
            JoinServer(client, data.sessionID, data.teamID);
            //Close the page
            window.close();
          })
        }



        // if (joinSession !== null) {
        //   if (client) {
        //     JoinServer(client, , parseInt(query.get("joinTeam") ?? "2"));
        //   }
        // }


        client?.send(JSON.stringify({ command: "get-version" }));
        setClientConnected(true);
        setTimeout(() => {
          client?.send(JSON.stringify({ command: "get-config" }));
        }, 400);

        setTimeout(() => {
          setInterval(pingServer, 4000);
        }, 4000);
        if (clientConnected) {
          //Dummy code
        }
      };
    }

    if (serverLive) {
      serverLive.onopen = () => {
        console.log("Server Connected 2222");
        serverLive.send(JSON.stringify({ command: "get-game-state" }));
        setServerConnected(true);
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client, clientConnected, serverLive]);

  useEffect(() => {
    if (!serverConnected) return
    if (!serverLive) return
    serverLive.send(
      JSON.stringify({
        command: "get-game-state",
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverConnected, serverLive]);


  const [gameStartTime, setGameStartTime] = useState(0);
  useEffect(() => {
    if (!serverConnected) return
    if (!serverLive) return
    //Set game start time to current time in seconds
    setGameStartTime(Math.floor(Date.now() / 1000));
    if (gameID === null) {
      serverLive.send(
        JSON.stringify({
          command: "end-game-state",
        })
      );
    }
  }, [gameID, serverConnected, serverLive]);

  const ParseGameData = (data: any) => {
    setGameData(data);
    var properMapName = data.map_name;
    switch (data.map_name) {
      case "mpl_combat_dyson":
        properMapName = "Dyson";
        break;
      case "mpl_combat_combustion":
        properMapName = "Combustion";
        break;
      case "mpl_combat_fission":
        properMapName = "Fission";
        break;
      case "mpl_combat_gauss":
        properMapName = "Surge";
        break;
      default:
        return;
    }
    var BlueTeam = data?.teams[0]?.players ?? [];
    //sort the blue team by playerid
    BlueTeam?.sort((a: { playerid: number; }, b: { playerid: number; }) => {
      return a.playerid - b.playerid;
    });
    var OrangeTeam = data?.teams[1]?.players ?? [];
    //sort the orange team by playerid
    OrangeTeam?.sort((a: { playerid: number; }, b: { playerid: number; }) => {
      return a.playerid - b.playerid;
    });
    const gameData = {
      id: data.sessionid,
      blueTeam:
        BlueTeam.map((player: { userid: any; name: any; }) => ({
          id: player.userid,
          name: player.name,
        })) ?? [],
      orangeTeam:
        OrangeTeam?.map((player: { userid: any; name: any; }) => ({
          id: player.userid,
          name: player.name,
        })) ?? [],
      mapName: properMapName,
      startTime: gameStartTime,
    };

    if (!serverConnectedRef.current) return
    if (!serverLive) return

    serverLive.send(
      JSON.stringify({
        command: "update-game-state",
        payload: gameData,
      })
    );
  };

  useEffect(() => {
    if (!serverConnected) return
    if (!serverLive) return

    serverLive.onmessage = (message) => {
      let data = JSON.parse(message.data as string) as SocketMessage;
      // @ts-ignore
      if (data.ping) {
        console.log("Heartbeat");
        serverLive.send(
          JSON.stringify({
            pong: true,
          })
        );
        return;
      }

      console.log(data);

      if (data.command === "get-game-state") {

        setCurrentServerState({
          ...currentServerState,
          sockets: data.payload
        }
        );
      }
      if (data.command === "socket-disconnected") {

        let disconnectingSocketID = data.payload.id;

        setCurrentServerState((current) => {
          return {
            ...current,
            sockets: current?.sockets?.filter((sockets) => sockets.id !== disconnectingSocketID ?? 0)
          }
        });
      }

      if (data.command === "socket-updated") {

        let payload = data.payload;

        console.log(payload)
        setCurrentServerState((current) => {
          var FoundGame = false;
          var newState =
            current?.sockets?.map((socket) => {
              if (socket.id === payload.reportingSocketID) {
                FoundGame = true;
                return {
                  id: socket.id,
                  state: payload
                };
              }
              return socket;
            }) ?? [];

          if (!FoundGame) {
            newState.push({
              id: payload.reportingSocketID,
              state: payload
            });
          }
          return {
            ...current,
            sockets: newState,
          };
        });
      }
    };
  }, [currentServerState, serverConnected, serverLive]);

  let onConnectionError = () => {
    setGameID((currentGameID) => {
      console.log("Connection Error", gameID);
      if (currentGameID !== null) {
        client?.send(
          JSON.stringify({
            command: "kill-game",
          })
        );
        setTimeout(() => {
          setGameData((currentGameData: { client_name: any; teams: { players: any[]; }[]; }) => {
            var client_name = currentGameData.client_name;
            var teamID = null;
            currentGameData?.teams?.forEach((team: { players: any[]; }, index: any) => {
              team?.players?.forEach((player: { name: any; }) => {
                if (player.name === client_name) {
                  teamID = index;
                }
              });
            });
            JoinServer(client, currentGameID, teamID ?? 2);
            console.log("Game crash set id to null");
          }); //Find the teamID of the player
        }, 1500);
      }
      return null;
    });
  };

  const handleClientMessage = (message: { data: string; }) => {
    console.log("Current SessionID = " + gameID);

    try {
      const data = JSON.parse(message.data);
      if (data.version) {
        if (data.version !== "0.4.3") {
          alert("Reticle is out of date. Please update to the latest version.");
          // @ts-ignore
          window.history.push("/");
        }
      }
      if (data.type === "config") {
        setReticlePreferences(data);
      }
      if (data.type === "connection_error") {
        setCurrentGameState(0);
        if (reticlePreferences.autojoin !== "false") {
          onConnectionError();
        }
      }
      if (data.sessionid) {
        setCurrentGameState(3);
        console.log("Setting ID to " + data.sessionid);
        setGameID(data.sessionid);
        ParseGameData(data);
        return;
      }
      if (data.err_code === -6) {
        console.log("Setting Lobby");
        setCurrentGameState(2);
      }
      console.log("Setting to null no error");
      setGameID(null);
    } catch (e) {
      console.log("Setting Lobby");

      setCurrentGameState(1);
      console.log("Setting to null error");

      setGameID(null);
      console.log(e);
    }
  };

  useEffect(() => {
    if (!client) return
    window.addEventListener("beforeunload", (ev) => {
      ev.preventDefault();
      return (ev.returnValue = "Are you sure you want to close?");
    });
    setWebsocket(client);

    // @ts-ignore
    client.onmessage = handleClientMessage;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client]);

  return (
    <div className="list" style={{ margin: "20px" }}>
      <CurrentGameState currentGameState={currentGameState} gameID={gameID} />
      <div className="padded list">
        <div className="horizontal-fill">
          <RadioSwitch label="Queue" current={currentMenuState} setCurrent={setCurrentMenuState} buttonClassName="border-thick" />
          <RadioSwitch label="Join" current={currentMenuState} setCurrent={setCurrentMenuState} buttonClassName="border-thick" />
          <RadioSwitch label="Host" current={currentMenuState} setCurrent={setCurrentMenuState} buttonClassName="border-thick" />
        </div>
        {
          currentMenuState === "Queue" ? (

            <GameHistory history={gameHistory} />
          ) : null
        }
        {
          currentMenuState === "Join" ? (
            <div className="padded horizontal-fill">
              <div className="horizontal-fill">
                <AutoCompleteInput
                  className="padded rounded"
                  // @ts-ignore
                  ref={JoinGameIDRef}
                  id="AutoCompleteInputInput"
                  type="text"
                  reticlePreferences
                  value={gameIDInput}
                  onChange={(e) => setGameIDInput(e.target.value)}
                />
                <div className="padded rounded button" style={{ flexGrow: "0.2" }} onClick={
                  () => {
                    JoinServer(client, gameIDInput, 1);
                  }
                }>
                  <p>Join Orange</p>
                </div>
                <div className="padded rounded button" style={{ flexGrow: "0.2" }} onClick={
                  () => {
                    JoinServer(client, gameIDInput, 0);
                  }
                }>
                  <p>Join Blue</p>
                </div>
              </div>
              <ActiveGames client={client} serverState={currentServerState} />
            </div>

          ) : null
        }
        {
          currentMenuState === "Host" && websocket ? (
            <HostGameOptions websocket={websocket} />
          ) : null
        }
      </div>

      <div className="padded horizontal-fill">
        <div className="list">




        </div>
      </div>
      <div className="horizontal-fill no-gap">
        <div
          className="padded border button"
          onClick={() => {
            client?.send(
              JSON.stringify({
                command: "set-preference",
                key: "autojoin",
                value:
                  reticlePreferences.autojoin === "true" ? "false" : "true",
              })
            );
            setTimeout(() => {
              client?.send(
                JSON.stringify({
                  command: "get-config",
                })
              );
            }, 200);
          }}
        >
          {reticlePreferences.autojoin === "true"
            ? " Autojoin Activated!"
            : "Autojoin Disabled"}
        </div>
        <div
          className="padded border button"
          onClick={() => {
            var exePath = prompt("Please enter your echoVR executable path");
            if ((exePath === "" || exePath == null || exePath === undefined)) {
              return;
            }
            client?.send(
              JSON.stringify({
                command: "set-preference",
                key: "executable-path",
                value: exePath,
              })
            );
            setTimeout(() => {
              client?.send(
                JSON.stringify({
                  command: "get-config",
                })
              );
            }, 1000);
          }}
        >
          {reticlePreferences.executable_path}
        </div>
        <div
          className="padded border button"
          onClick={() => {
            client?.send(
              JSON.stringify({
                command: "set-preference",
                key: "launch-in-popup",
                value:
                  reticlePreferences.launch_in_popup === "true"
                    ? "false"
                    : "true",
              })
            );
            setTimeout(() => {
              client?.send(
                JSON.stringify({
                  command: "get-config",
                })
              );
            }, 200);
          }}
        >
          {reticlePreferences.launch_in_popup === "true"
            ? " Launching In Popup!"
            : "Not launching in popup"}
        </div>
        <div
          className="padded border button"
          onClick={() => {
            client?.send(JSON.stringify({ command: "shutdown" }));
            //Wait a second before closing the window
            setTimeout(() => {
              window.close();
            }, 1000);
          }}
        >
          Shutdown Reticle
        </div>
      </div>
    </div>
  );
}

const GameHistory = ({ history }: any) => {


  return (

    <div className="list" style={{ gap: 0 }}>
      {
        history.map((game: any) => {
          return (
            <div className="border-thick horizontal-fill">
              <div className="button" style={{ flexGrow: 0.5 }} onClick={
                () => {
                  //Copy the game ID to the clipboard
                  navigator.clipboard.writeText(game.sessionid);

                  alert("Copied to clipboard");
                }
              }>
                {game.sessionid}
              </div>
              {/* <div className="button">Orange</div> */}
              <div className="button">Game</div>
            </div>
          );
        }
        )
      }
    </div>
  )



  //   < p > Game History</p >

  //   <div className="border-thick  horizontal-fill">
  //     <div className="button" style={{ flexGrow: 0.5 }}>
  //       24 minuets ago
  //     </div>
  //     <div className="button"></div>
  //     <div className="button">Social Lobby</div>
  //   </div>
  //   <div className="border-thick horizontal-fill">
  //     <div className="button" style={{ flexGrow: 0.5 }}>
  //       16 minuets ago
  //     </div>
  //     <div className="button">Blue Team</div>
  //     <div className="button">Dyson Game</div>
  //   </div>
  //   <div className="border-thick  horizontal-fill">
  //     <div className="button" style={{ flexGrow: 0.5 }}>
  //       3 minuets ago
  //     </div>
  //     <div className="button"></div>
  //     <div className="button">Social Lobby</div>
  //   </div>
  // </div >;
}

