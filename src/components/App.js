import {useState, useEffect} from "react";

import useTheme from "@material-ui/core/styles/useTheme";
import Grid from "@material-ui/core/Grid";

import NavBar from "./Navbar";
import Header from "./Header";
import Logs from "./Logs";
import Alert from "./Alert";

import * as data from "../services/data.service";
import * as auth from "../services/auth.service";
import * as util from "../services/util.service";

import dummyLogs from "../data/dummyLogs";

function App() {
  const theme = useTheme();

  const [alert, setAlert] = useState({ open: false, title: '', content: '', type: '' })

  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState('all');

  const [logs, setLogs] = useState([]);

  // Fetch unique services
  useEffect(() => {
    data.fetchServices()
      .then(res => {
        console.log(res);
        if (res.data.status === 200) {
          setServices(res.data.data);
        } else {
          handleError({
            message: (res.data && res.data.message) || 'Please contact admin.',
          });
        }
      })
      .catch(handleError)
  }, []);

  // Selected Service change
  useEffect(() => {
    if (selectedService === 'demo') {
      setLogs(dummyLogs)
    } else {
      if (auth.isLoggedIn() === false) {
        window.location.href = auth.getAuthUrl({selectedService});
        return;
      }
      if (auth.isAdmin() === false) {
        handleError({message: 'Private logs. Only Vighnesh Raut can access them.'})
        return;
      }
      data.fetchLogs()
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            console.log(res.data);
            const logs = res.data.map((log) => ({
              id: log._id,
              requestId: log.meta.requestId,
              timestamp: new Date(log.meta.time).toLocaleString(),
              level: log.level,
              message: log.message,
              meta: JSON.stringify(util.transformMeta(log.meta), null, 4)
            }));
            setLogs(logs);
          } else {
            handleError({message: (res.data && res.data.message) || 'Some error occurred.'})
          }
        })
        .catch(console.log);
      setLogs([]);
    }
  }, [selectedService]);

  const handleError = (err) => {
    setAlert({
      type: 'error',
      open: true,
      title: 'Some error occurred.',
      content: err.message,
    })
  };

  const AlertComponent = (
    <Alert
      alertObj={alert}
      close={() => setAlert({...alert, open: false})}
    />
  );

  const HeaderContainer = (
    <Grid
      style={{
        width: '95%',
        margin: theme.spacing(2.5, 'auto'),
      }}
    >
      <Header
        services={{
          list: services,
          selected: selectedService,
          setSelected: setSelectedService
        }}
      />
    </Grid>
  );

  const LogsContainer = (
    <Grid
      style={{
        width: '95%',
        margin: theme.spacing(2.5, 'auto'),
        overflowX: 'auto',
      }}
    >
      <Logs logs={logs}/>
    </Grid>
  );

  return (
    <div
      style={{
        height: '100%',
        backgroundColor: theme.palette.background.default,
        overflow: 'auto',
      }}
    >
      <NavBar/>
      {AlertComponent}
      {HeaderContainer}
      {LogsContainer}

    </div>
  );
}

export default App;
