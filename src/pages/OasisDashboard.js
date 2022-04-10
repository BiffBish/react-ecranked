import { useRef, useEffect, useState } from "react";

import styled from "styled-components";
import { w3cwebsocket as W3CWebSocket } from "websocket";
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

const RadioSwitch = ({ label, value, current, setCurrent }) => {
  if (value === undefined) {
    value = label;
  }
  return (
    <div
      className="rounded button padded"
      onClick={() => {
        setCurrent(value);
      }}
      style={{
        backgroundColor: current === value ? "#444" : undefined,
      }}
    >
      {label}
    </div>
  );
};

const HostGameOptions = ({ websocket }) => {
  const [gameName, setGameName] = useState("");
  const [gameRegion, setGameRegion] = useState("");
  const [gameTeam, setGameTeam] = useState("");
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
    <div className="list rounded padded">
      <div className="centered">Map</div>
      <div className="horizontal-container">
        <RadioSwitch
          label={"Dyson"}
          value={"mpl_combat_dyson"}
          current={gameName}
          setCurrent={setGameName}
        />
        <RadioSwitch
          label={"Combustion"}
          onSubmit
          value={"mpl_combat_combustion"}
          current={gameName}
          setCurrent={setGameName}
        />
        <RadioSwitch
          label={"Fission"}
          value={"mpl_combat_fission"}
          current={gameName}
          setCurrent={setGameName}
        />
        <RadioSwitch
          label={"Surge"}
          value={"mpl_combat_gauss"}
          current={gameName}
          setCurrent={setGameName}
        />
      </div>
      <div className="centered">Region</div>

      <div className="horizontal-container">
        <RadioSwitch
          label={"usw"}
          current={gameRegion}
          setCurrent={setGameRegion}
        />
        <RadioSwitch
          label={"usc"}
          current={gameRegion}
          setCurrent={setGameRegion}
        />
        <RadioSwitch
          label={"uscn"}
          current={gameRegion}
          setCurrent={setGameRegion}
        />
        <RadioSwitch
          label={"use"}
          current={gameRegion}
          setCurrent={setGameRegion}
        />
        <RadioSwitch
          label={"euw"}
          current={gameRegion}
          setCurrent={setGameRegion}
        />
        <RadioSwitch
          label={"jp"}
          current={gameRegion}
          setCurrent={setGameRegion}
        />
        <RadioSwitch
          label={"aus"}
          current={gameRegion}
          setCurrent={setGameRegion}
        />
      </div>

      <div className="centered">Team</div>

      <div className="horizontal-container">
        <RadioSwitch
          label={"Blue Team"}
          value={0}
          current={gameTeam}
          setCurrent={setGameTeam}
        />
        <RadioSwitch
          label={"Orange Team"}
          value={1}
          current={gameTeam}
          setCurrent={setGameTeam}
        />
        <RadioSwitch
          label={"Spectate"}
          value={2}
          current={gameTeam}
          setCurrent={setGameTeam}
        />
      </div>

      <div className="centered"></div>

      <div className="horizontal-container">
        <div className="rounded button padded" onClick={onSubmit}>
          Launch
        </div>
      </div>
    </div>
  );
};

const client = new W3CWebSocket("ws://127.0.0.1:13113");
const serverLive = new W3CWebSocket("wss://ecranked.ddns.net/api/v2/reticle");

function JoinServer(sessionID, teamID) {
  client.send(
    JSON.stringify({
      command: "join-server",
      session_id: sessionID,
      lobby_team: teamID,
    })
  );
}

const ActiveGame = ({ gameState }) => {
  return (
    <div className="horizontal-container">
      <div className="border disabled-button" style={{ flexGrow: 2 }}>
        {gameState.mapName}
      </div>
      {gameState.blueTeam.length < 4 ? (
        <div
          className="border button"
          onClick={() => JoinServer(gameState.id, 0)}
        >
          Join Blue ({gameState.blueTeam.length}/4)
        </div>
      ) : (
        <div className="border disabled-button">
          Join Blue ({gameState.blueTeam.length}/4)
        </div>
      )}
      {gameState.orangeTeam.length < 4 ? (
        <div
          className="border button"
          onClick={() => JoinServer(gameState.id, 1)}
        >
          Join Orange ({gameState.orangeTeam.length}/4)
        </div>
      ) : (
        <div className="border disabled-button">
          Join Orange ({gameState.orangeTeam.length}/4)
        </div>
      )}{" "}
      <div
        className="border button"
        onClick={() => JoinServer(gameState.id, 2)}
      >
        Spectate
      </div>
      {gameState?.reportingSocketIds?.length}
    </div>
  );
};

const ActiveGames = ({ serverState }) => {
  return (
    <div className="padded rounded list">
      <h2>Active Games</h2>
      {serverState?.map((game) => {
        return <ActiveGame gameState={game} />;
      })}
    </div>
  );
};

export default function OasisDashboard() {
  const JoinGameIDRef = useRef();

  const [gameIDInput, setGameIDInput] = useState("");

  const [websocket, setWebsocket] = useState(null);

  const [showHostGame, setShowHostGame] = useState(false);

  const [gameID, setGameID] = useState(null);
  const [gameIDText, setGameIDText] = useState(null);

  const [currentServerState, setCurrentServerState] = useState(null);

  const [serverConnected, setServerConnected] = useState(false);
  const [clientConnected, setClientConnected] = useState(false);

  // const [currentInterval, setCurrentInterval] = useState(null);

  const pingServer = () => {
    client.send(
      JSON.stringify({
        command: "get-session",
      })
    );
  };

  useEffect(() => {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
      client.send(JSON.stringify({ command: "get-version" }));
      setClientConnected(true);
      setTimeout(() => {
        setInterval(pingServer, 4000);
      }, 4000);
    };
    serverLive.onopen = () => {
      console.log("Server Connected");
      serverLive.send(JSON.stringify({ command: "get-game-state" }));
      setServerConnected(true);
    };
  }, []);

  useEffect(() => {
    if (!serverConnected) {
      return;
    }
    serverLive.send(
      JSON.stringify({
        command: "get-game-state",
      })
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverConnected]);

  const [gameStartTime, setGameStartTime] = useState(0);

  useEffect(() => {
    if (!serverConnected) {
      return;
    }
    //Set game start time to current time in seconds
    setGameStartTime(Math.floor(Date.now() / 1000));
    if (gameID === null) {
      serverLive.send(
        JSON.stringify({
          command: "game-end-state",
        })
      );
    }
  }, [gameID, serverConnected]);

  const ParseGameData = (data) => {
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
        properMapName = "Error";
        break;
    }

    const gameData = {
      id: data.sessionid,
      blueTeam:
        data?.teams[0]?.players?.map((player) => ({
          id: player.userid,
          name: player.name,
        })) ?? [],
      orangeTeam:
        data?.teams[1]?.players?.map((player) => ({
          id: player.userid,
          name: player.name,
        })) ?? [],
      mapName: properMapName,
      startTime: gameStartTime,
    };
    serverLive.send(
      JSON.stringify({
        command: "update-game-state",
        payload: gameData,
      })
    );
  };

  useEffect(() => {
    if (!serverConnected) {
      return;
    }
    serverLive.onmessage = (message) => {
      const data = JSON.parse(message.data);
      if (data.pong) {
        console.log("Pong Heatbeat");
        return;
      }

      console.log(data);

      if (data.command === "get-game-state") {
        setCurrentServerState(data.payload);
      }

      if (data.command === "end-game") {
        setCurrentServerState((current) => {
          return current.filter((game) => game.id !== data.payload.id);
        });
      }

      if (data.command === "update-game-state") {
        setCurrentServerState((current) => {
          var FoundGame = false;

          var newState = current?.map((game) => {
            if (game.id === data.payload.id) {
              FoundGame = true;
              return data.payload;
            }
            return game;
          });

          if (!FoundGame) {
            newState.push(data.payload);
          }
          return newState;
        });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverConnected]);

  useEffect(() => {
    // alert("useEffect");
    // if (websocket === null) {
    //   return;
    // }
    window.addEventListener("beforeunload", (ev) => {
      ev.preventDefault();
      return (ev.returnValue = "Are you sure you want to close?");
    });
    setWebsocket(client);

    client.onmessage = (message) => {
      try {
        const data = JSON.parse(message.data);
        if (data.version) {
          if (data.version !== "0.2") {
            alert(
              "Reticle is out of date. Please update to the latest version."
            );
            window.history.push("/");
          }
        }
        if (data.sessionid) {
          setGameID(data.sessionid);
          ParseGameData(data);
          return;
        }

        setGameID(null);
      } catch (e) {
        setGameID(null);
        console.log(e);
      }

      // if () {
      console.log("Heartbeat");
      serverLive.send(
        JSON.stringify({
          ping: true,
        })
      );
      // }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setGameIDText(gameID);
  }, [gameID]);
  return (
    <div className="padded rounded list" style={{ margin: "20px" }}>
      <h2>Reticle Dashboard</h2>
      {gameID ? (
        <div className="padded rounded horizontal-container">
          <div
            className="padded button"
            onClick={() => {
              navigator.clipboard.writeText(gameID);
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
      ) : null}

      <div className="padded horizontal-container">
        <div className="list">
          <div
            className="padded rounded button"
            onClick={() => {
              setShowHostGame((current) => !current);
            }}
          >
            <p>Host Game</p>
          </div>
          {showHostGame ? (
            <HostGameOptions websocket={websocket} />
          ) : (
            <div></div>
          )}
          <div className="horizontal-container">
            <AutoCompleteInput
              className="padded rounded"
              ref={JoinGameIDRef}
              id="AutoCompleteInputInput"
              type="text"
              placeholder="Paste Game ID..."
              autoComplete="off"
              name="name"
              value={gameIDInput}
              onChange={(e) => setGameIDInput(e.target.value)}
              // onFocus={() => {
              //   setShowOptions(true);
              //   textInput.current.value = "";
              //   setCurrentText("");
              // }}
              // onBlur={() => {
              //   setShowOptions(false);
              // }}
            />
            <div className="padded rounded button" style={{ flexGrow: "0.2" }}>
              <p>Join Game</p>
            </div>
          </div>

          <div className="list" style={{ gap: 0 }}>
            <p>Game History</p>
            <div className="border horizontal-container">
              <div className="button" style={{ flexGrow: 0.5 }}>
                42 minuets ago
              </div>
              <div className="button">Orange</div>
              <div className="button">Social Lobby</div>
            </div>
            <div className="border  horizontal-container">
              <div className="button" style={{ flexGrow: 0.5 }}>
                24 minuets ago
              </div>
              <div className="button"></div>
              <div className="button">Social Lobby</div>
            </div>
            <div className="border horizontal-container">
              <div className="button" style={{ flexGrow: 0.5 }}>
                16 minuets ago
              </div>
              <div className="button">Blue Team</div>
              <div className="button">Dyson Game</div>
            </div>
            <div className="border  horizontal-container">
              <div className="button" style={{ flexGrow: 0.5 }}>
                3 minuets ago
              </div>
              <div className="button"></div>
              <div className="button">Social Lobby</div>
            </div>
          </div>
        </div>
        <ActiveGames serverState={currentServerState} />
      </div>
      <div className="horizontal-container">
        <div className="padded border button">Autojoin Activated</div>
        <div className="padded border button">C:/Program Files/Oculus/</div>
        <div className="padded border button">Sharing Games</div>
      </div>
    </div>
  );
}
