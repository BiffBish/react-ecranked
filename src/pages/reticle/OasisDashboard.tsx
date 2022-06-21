import React from "react";
import { useRef, useEffect } from "react";
import useState from 'react-usestateref';
import styled from "styled-components";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import api, { Queue as APIQueue, Shortener, QueueUser as APIQueueUser, useMe, Api } from "@ecranked/api"

// import api from "../../api";
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
  function onSubmitQueue() {
    if (gameName === "" || gameRegion === "" || gameTeam === "") {
      alert("Please fill out all fields");
      return;
    }
    APIQueue.makeNew(
      {
        map_name: gameName + "",
        region: gameRegion + "",
        game_rules: "{}",
        live_only: false,
        public: false,
      });
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
        <div className="rounded button padded" onClick={onSubmitQueue}>
          Make Queue
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
              if (!gameID) return;
              let code = await Shortener.shortenGameInvite({
                session_id: gameID,
                game_rules: "",
                map_name: "null",
                region: "null",
                team: "spectate"
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


interface ClientActionsProps {
  client: W3CWebSocket | null;
  reticlePreferences: reticlePreferencesInterface;
  clientConnected: boolean;
}
const ClientActions = ({ client, reticlePreferences, clientConnected }: ClientActionsProps) => {
  if (!clientConnected) {
    return <div className="padded border button">
      Connecting to reticle instance...
    </div>;
  }
  return (
    <>
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
    </>
  )
}

interface OasisDashboardProps {
  joinCode?: string;
}


interface QueuesProps {
  queues: APIQueue[]
}
const Queues = ({ queues }: QueuesProps) => {
  console.log(queues)
  return (
    <div className="padded rounded list">
      <h2>Join a queue!</h2>
      {queues.map((queue) => {
        return (
          <div className="border-thick  horizontal-fill">

            <div className="padded">
              <h3>{queue.id}</h3>
            </div>
            <div className="padded">
              <h3>{queue.isJoined ? "True" : "False"}</h3>
            </div>
            <div className="rounded button padded" onClick={async () => { await queue.join() }}>
              Join
            </div>
          </div>)
      }
      )}
    </div>
  );
};


interface QueueProps {
  queue: APIQueue,
  client: W3CWebSocket | null;

  gameID: string | null;
}


const QueueUser = ({ user, queue, ready }: { user: APIQueueUser, queue: APIQueue, ready?: boolean }) => {
  // console.log(user, queue, ready)
  return (
    <div className="horizontal-fill">
      <div className="padded rounded border-thick horizontal-fill">
        <div className="padded rounded border-thick button" style={{ backgroundColor: ready === true ? "green" : ready === false ? "yellow" : "gray", maxWidth: "5px" }} />
        <h3>{user.oculus_name}</h3>

      </div>
      {/* <div className="padded">
        <h3>{user.isJoined ? "True" : "False"}</h3>
      </div> */}
      {
        user.can_kick ?
          <div className="padded rounded border-thick button" onClick={async () => { await queue.kick(user.oculus_id) }}>
            Kick
          </div>
          : null
      }

    </div >
  );
}


const LinkButton = ({ queue, linkCode, team }: {
  queue: APIQueue,
  linkCode: string | null,
  team: string
}) => {

  const [hover, setHover] = useState<boolean>(false);
  if (!queue.isAdmin) return null;

  if (linkCode) {
    return (
      <div className="border centered button" onClick={async () => {
        navigator.clipboard.writeText("<reticle://join/" + linkCode + ">");
      }} onMouseEnter={
        () => {
          setHover(true);
        }
      } onMouseLeave={
        () => {
          setHover(false);
        }

      }>
        <p>{hover ? "<reticle://join/" + linkCode + ">" : "Click to copy join-link"}</p>
      </div >
    );
  }

  return (
    <p className="border centered button" onClick={
      async () => {
        let teamName: "orange" | "blue" | "spectate" | "any" = "any";
        switch (team) {
          case "Orange":
            teamName = "orange";
            break;
          case "Blue":
            teamName = "blue";
            break;
          case "Spectator":
            teamName = "spectate";
            break;
          case "Join":
            teamName = "any";
            break;
        }

        queue.makeInviteLink(teamName);
      }


    }> {" "}🔗 Generate {team} link</p>
  )
}

const QueuePage = ({ queue: selectedQueue, gameID, client }: QueueProps) => {
  const { readyUsers, isLoading } = APIQueue.useReadyUsers();
  const { me } = useMe();


  const [waitingForGameID, setWaitingForGameID] = useState<boolean>(false);
  useEffect(() => {
    if (gameID && waitingForGameID) {
      selectedQueue.issueJoin(gameID)
    }
  }, [gameID])



  useEffect(() => {
    if (selectedQueue && me) {
      selectedQueue.setReady(false);
    }
  }, [me, selectedQueue])

  const [processedReadyUsers, setProcessedReadyUsers] = useState<{ [key: string]: boolean }>({})
  console.log("Rendering Queue Page")

  useEffect(() => {
    console.log("Processing ready users")
    const newProcessedReadyUsers = {} as { [key: string]: boolean }
    readyUsers?.forEach((user) => {
      newProcessedReadyUsers[user.oculus_id] = user.ready;
    });
    setProcessedReadyUsers(newProcessedReadyUsers);
    console.log("Processed ready users", newProcessedReadyUsers)
  }, [readyUsers])

  APIQueue.onJoinGameCallback = (sessionID) => {
    //Get the team the user is in
    let team = 0;

    if (selectedQueue.blue_users.find((user) => user.oculus_id === me?.oculus_id)) {
      team = 0;
    }
    if (selectedQueue.orange_users.find((user) => user.oculus_id === me?.oculus_id)) {
      team = 1;
    }
    if (selectedQueue.spectate_users.find((user) => user.oculus_id === me?.oculus_id)) {
      team = 2;
    }

    JoinServer(client, sessionID, team);
  }

  APIQueue.onLaunchGameCallback = (queueID, mapName, gameRules, region) => {
    let team = 0;

    if (selectedQueue.blue_users.find((user) => user.oculus_id === me?.oculus_id)) {
      team = 0;
    }
    if (selectedQueue.orange_users.find((user) => user.oculus_id === me?.oculus_id)) {
      team = 1;
    }
    if (selectedQueue.spectate_users.find((user) => user.oculus_id === me?.oculus_id)) {
      team = 2;
    }
    setWaitingForGameID(true)
    client?.send(
      JSON.stringify({
        command: "create-server",
        map: mapName,
        region: region,
        lobby_team: team,
      })
    );
  }

  return (
    <div className="padded rounded list border-thick">
      <h2>Queue</h2>
      <h3>{selectedQueue.id}</h3>
      <div className="horizontal-fill">
        {selectedQueue.can_leave ? <div className="button" onClick={async () => { await selectedQueue.leave() }}>Leave</div> : null}
        {selectedQueue.can_delete ? <div className="button" onClick={async () => { await selectedQueue.delete() }}>Delete Queue</div> : null}
        <LinkButton linkCode={selectedQueue.any_link} queue={selectedQueue} team="Join" />
      </div>
      <div className="horizontal-fill">
        <div className="list">
          <h3 className="rounded padded border-thick horizontal-fill"><h3>Blue Team</h3> <LinkButton linkCode={selectedQueue.blue_link} queue={selectedQueue} team="Blue" /></h3>

          {selectedQueue.blue_users.map((player) => <QueueUser user={player.resolved} queue={selectedQueue} key={player.oculus_id} ready={processedReadyUsers[player.oculus_id]} />)}
          {selectedQueue.can_join_blue ? <div className="padded rounded button" onClick={async () => { await selectedQueue.join("blue") }}>+ Join team</div> : null}
        </div>
        <div className="list">
          <h3 className="rounded padded border-thick horizontal-fill"><h3>Spectator Team</h3> <LinkButton linkCode={selectedQueue.spectate_link} queue={selectedQueue} team="Spectator" /></h3>

          {selectedQueue.spectate_users.map((player) => <QueueUser user={player.resolved} queue={selectedQueue} key={player.oculus_id} ready={processedReadyUsers[player.oculus_id]} />)}
          {selectedQueue.can_join_spectate ? <div className="padded rounded button" onClick={async () => { await selectedQueue.join("spectate") }}>+ Join team</div> : null}

        </div>
        <div className="list">
          <h3 className="rounded padded border-thick horizontal-fill"><h3>Orange Team</h3> <LinkButton linkCode={selectedQueue.orange_link} queue={selectedQueue} team="Orange" /></h3>

          {selectedQueue.orange_users.map((player) => <QueueUser user={player.resolved} queue={selectedQueue} key={player.oculus_id} ready={processedReadyUsers[player.oculus_id]} />)}
          {selectedQueue.can_join_orange ? <div className="padded rounded button" onClick={async () => { await selectedQueue.join("orange") }}>+ Join team</div> : null}

        </div>
      </div >
      {/* A giant Ready up button */}
      <div className="padded rounded button" onClick={async () => { await selectedQueue.setReady(true) }}>Ready up</div>
      <div className="padded rounded button" onClick={() => { selectedQueue.launchQueue(selectedQueue.blue_users[0].oculus_id) }}>Launch Game</div>
    </div >
  )
}




export default function OasisDashboard({ joinCode }: OasisDashboardProps) {
  // const clientIP = "192.168.50.105:13113"
  const clientIP = "127.0.0.1:13113"
  const { me } = useMe()
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

  // const [showHostGame, setShowHostGame] = useState(false);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentGameState]);




  useEffect(() => {
    if (joinCode && me) {
      console.log("Getting code", joinCode)
      Shortener.getShortenedQueueInvite(joinCode).then((invite) => {
        console.log("Got code", invite)
        if (!invite) {
          alert("Invalid invite code")
          return;
        }
        APIQueue.fetch(invite.queue_id).then((queue) => {
          console.log("Queue", queue)
          if (!queue) {
            alert("Invalid queue")

            return;
          }
          let inviteTeam = invite.type

          switch (inviteTeam) {
            case "blue":
              queue.setBlueCode(invite.code)
              break;
            case "orange":
              queue.setOrangeCode(invite.code)
              break;
            case "spectate":
              queue.setSpectateCode(invite.code)
              break;
            case "any":
              queue.setAnyCode(invite.code)
              break;
            default:
              break;
          }

          if (inviteTeam === "any") {
            inviteTeam = "spectate"
          }
          queue.joinWithCode(invite.code, inviteTeam).then(() => {
            // setSelectedQueue(queue)
          })

        });
      });
    }
  }, [joinCode, me])

  useEffect(() => {
    console.log("client", client, client?.readyState, "server", serverLive?.readyState)
    if (client) {
      client.onerror = (error) => {
        console.error(error);
      };
      client.onopen = () => {
        console.log("WebSocket Client Connected");

        if (joinCode) {
          console.log("Getting code", joinCode)
          Shortener.getShortenedGameInvite(joinCode).then((data) => {
            if (!data) {
              alert("Invalid join code")
              window.close();
              return
            }
            let teamID = 0;
            switch (data.team) {
              case "blue":
                teamID = 0;
                break;
              case "orange":
                teamID = 1;
                break;
              case "spectate":
                teamID = 2;
                break;
            }

            JoinServer(client, data.session_id, teamID);
          });



          // Shortener.getShortenedData<{
          //   sessionID: string,
          //   teamID: number
          // }>(joinCode).then((data) => {
          //   if (!data) {
          //     alert("Invalid join code")
          //     window.close();
          //     return
          //   }
          //   JoinServer(client, data.sessionID, data.teamID);
          //   //Close the page
          //   window.close();
          // });
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

  const { all: queues, isLoading: AllQueuesLoading } = APIQueue.useAll()

  const [selectedQueue, setSelectedQueue] = useState<APIQueue | null>(null)
  useEffect(() => {
    if (!AllQueuesLoading && selectedQueue === null) {
      if (queues.find(queue => queue.isJoined)) {
        setCurrentMenuState("Queue");
        setSelectedQueue(queues.find(queue => queue.isJoined) ?? null);
      }
    }
  }, [AllQueuesLoading, queues]);
  // const {me} = useMe()






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
            <>
              {selectedQueue ? <QueuePage queue={selectedQueue} gameID={gameID} client={client} /> : <Queues queues={queues} />}
              <GameHistory history={gameHistory} />
            </>
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
        <ClientActions client={client} reticlePreferences={reticlePreferences} clientConnected={clientConnected} />
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