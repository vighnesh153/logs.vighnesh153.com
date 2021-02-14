import {useState, useEffect} from "react";
import {useLocation, useHistory} from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import useTheme from "@material-ui/core/styles/useTheme";

import Logs from "./Logs";
import Alert from "./Alert";
import Header from "./Header";
import NavBar from "./Navbar";

import * as data from "../services/data.service";
import * as auth from "../services/auth.service";
import * as util from "../services/util.service";

import dummyLogs from "../data/dummyLogs";

function App() {
  const theme = useTheme();
  const history = useHistory();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const query = util.parseQuery(location.search);

  const [logs, setLogs] = useState([]);
  const [services, setServices] = useState([]);
  const [alert, setAlert] = useState({open: false, title: '', content: '', type: ''});
  const [selected, setSelected] = useState({
    service: query.service || '',
    logLevel: query.logLevel || '',
    requestId: query.requestId || '',
  });

  // Fetch unique services
  useEffect(() => {
    data.fetchServices({setServices, handleError});
  }, []);

  // fetch logs because selected changed
  useEffect(() => {
    const config = {
      doProcess: true
    };

    const query = util.parseQuery(location.search);
    if (query.service === 'demo') {
      setLoading(false);
      setLogs(dummyLogs);
    } else {
      setLoading(true);
      data.fetchLogs({setLogs, handleError, config, setLoading}, selected, page);
    }

    return () => {
      config.doProcess = false;
    };
  }, [page, history, selected]);

  // selected change
  useEffect(() => {
    const query = {};
    if (selected['service']) query['service'] = selected['service'];
    if (selected['logLevel']) query['logLevel'] = selected['logLevel'];
    if (selected['requestId']) query['requestId'] = selected['requestId'];
    if (Object.keys(query).length > 0) {
      history.replace("/?" + util.searchifyQuery(query));
    }
    setPage(1);
  }, [selected]);

  // On location change
  useEffect(() => {
    const query = util.parseQuery(location.search);
    if (query.loginSuccess) {
      delete query.loginSuccess;
      query.time = Date.now();
      handleSuccess("You have logged in to *.vighnesh153.com.");
      history.replace("/?" + util.searchifyQuery(query));
      return;
    }
    if (Boolean(query.service) === false) {
      query.service = auth.isAdmin() ? 'all' : 'demo';
      history.replace("/?" + util.searchifyQuery(query));
      return;
    }
    if (query.service !== 'demo') {
      // If trying to access service other than demo, then
      // first make sure the user is Logged In and an Admin
      if (auth.isLoggedIn() === false) {
        query.service = selected.service;
        window.location.href = auth.getAuthUrl(query);
        return;
      }
      if (auth.isAdmin() === false) {
        query.service = 'demo';
        history.push("/?" + util.searchifyQuery(query));
        handleError({message: `You are not authorized to watch production API logs.`});
        return;
      }
    }
    if (Boolean(query.logLevel) === false) {
      query.logLevel = 'info';
      history.replace("/?" + util.searchifyQuery(query));
      return;
    }
    const newSelected = {...selected};
    if (query.service) newSelected.service = query.service;
    if (query.requestId) newSelected.requestId = query.requestId;
    if (query["logLevel"]) newSelected.logLevel = query["logLevel"];
    setSelected(newSelected)
  }, [history, location.search]);

  const handleSuccess = (msg = "The request was a success.") => {
    setAlert({
      type: 'success',
      open: true,
      title: 'Success!',
      content: msg,
    })
  };

  const handleError = (err) => {
    setAlert({
      type: 'error',
      open: true,
      title: 'Some error occurred.',
      content: err.message,
    });
  };

  const loadNextPage = () => {
    setPage(p => p + 1);
  };

  const AlertComponent = (
    <Alert
      alertObj={alert}
      close={() => setAlert({...alert, open: false})}
    />
  );

  const HeaderContainer = (
    <Grid style={{width: '95%', margin: theme.spacing(2.5, 'auto')}}>
      <Header
        selected={selected}
        setSelected={setSelected}
        services={services}
        levels={['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly']}
      />
    </Grid>
  );

  const LogsContainer = (
    <Grid style={{width: '95%', margin: theme.spacing(2.5, 'auto'), overflowX: 'auto'}}>
      <Logs logs={logs} loading={loading} selected={selected}/>
    </Grid>
  );

  const FetchMoreButtonContainer = (
    <Grid container justify={"center"} style={{margin: theme.spacing(1, 0, 1)}}>
      <Grid item style={{width: 'fit-content'}}>
        <Button
          variant={"contained"}
          color={"secondary"}
          disabled={selected.service === 'demo' || loading}
          onClick={loadNextPage}
          endIcon={loading ? <CircularProgress size={20} /> : null}
        >Fetch More</Button>
      </Grid>
    </Grid>
  );

  return (
    <div style={{
        height: '100%',
        backgroundColor: theme.palette.background.default,
        overflow: 'auto',
      }}>
      <NavBar/>
      {AlertComponent}
      {HeaderContainer}
      {LogsContainer}
      {FetchMoreButtonContainer}
    </div>
  );
}

export default App;
