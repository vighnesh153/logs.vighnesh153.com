import {useState} from "react";
import useTheme from "@material-ui/core/styles/useTheme";

import NavBar from "./Navbar";
import Logs from "./Logs";
import Grid from "@material-ui/core/Grid";

function App() {
  const theme = useTheme();

  const [logs, setLogs] = useState([
    {id: 1, requestId: '1', timestamp: new Date().toLocaleString(), level: 'error', message: '\n      ################################################\n      🛡️  Server listening on port: 3001 🛡️\n      ################################################\n  ', meta: JSON.stringify({a: 123}, null, 4)},
    {id: 2, requestId: '2', timestamp: Date.now(), level: 'warn', message: 'Some message\nHello', meta: JSON.stringify({a: 123}, null, 4)},
    {id: 3, requestId: '3', timestamp: Date.now(), level: 'info', message: 'Some message\nHello', meta: JSON.stringify({a: 123}, null, 4)},
    {id: 4, requestId: '4', timestamp: Date.now(), level: 'http', message: 'Some message\nHello', meta: JSON.stringify({a: 123}, null, 4)},
    {id: 5, requestId: '5', timestamp: Date.now(), level: 'verbose', message: 'Some message\nHello', meta: JSON.stringify({a: 123}, null, 4)},
    {id: 6, requestId: '6', timestamp: Date.now(), level: 'debug', message: 'Some message\nHello', meta: JSON.stringify({a: 123}, null, 4)},
    {id: 7, requestId: '7', timestamp: Date.now(), level: 'silly', message: 'Some message\nHello', meta: JSON.stringify({a: 123}, null, 4)},
  ]);

  return (
    <div
      style={{
        height: '100%',
        backgroundColor: theme.palette.background.default,
        overflow: 'auto',
      }}
    >
      <NavBar/>
      <Grid
        style={{
          width: '95%',
          margin: '40px auto',
          overflowX: 'auto',
        }}
      >
        <Logs logs={logs}/>
      </Grid>
    </div>
  );
}

export default App;
