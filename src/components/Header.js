import React from "react";

import useTheme from "@material-ui/core/styles/useTheme";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  TextField,
} from "@material-ui/core";

function Header({selected, setSelected, services, levels}) {
  const theme = useTheme();

  return (
    <Grid style={{marginTop: theme.spacing(2.5)}}>
      <FormControl variant="outlined" style={{width: 300}}>
        <InputLabel id="logs-select-service-label">Service</InputLabel>
        <Select
          labelId="logs-select-service-label"
          id="logs-select-service"
          value={selected.service}
          onChange={({target: {value}}) => setSelected((o) => ({...o, service: value}))}
          label="Service"
        >
          <MenuItem value={'all'}>All</MenuItem>
          {services.map((service, index) => (
            <MenuItem value={service} key={index}>{service}</MenuItem>
          ))}
          <MenuItem value={'demo'}>Demo</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" style={{width: 150, marginLeft: theme.spacing(1)}}>
        <InputLabel id="logs-select-level-label">Log Level</InputLabel>
        <Select
          labelId="logs-select-level-label"
          id="logs-select-level"
          value={selected.logLevel}
          onChange={({target: {value}}) => setSelected((o) => ({...o, logLevel: value}))}
          label="Log Level"
        >
          <MenuItem value={'all'}>All</MenuItem>
          {levels.map((level, index) => (
            <MenuItem value={level} key={index}>{level}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl style={{width: 300, marginLeft: theme.spacing(1)}}>
        <TextField
          value={selected.requestId}
          onChange={({target: {value}}) => setSelected((o) => ({...o, requestId: value}))}
          label="Request ID"
          type="search"
          variant="outlined"
        />
      </FormControl>
    </Grid>
  );
}

export default Header;
