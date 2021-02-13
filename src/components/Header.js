import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import useTheme from "@material-ui/core/styles/useTheme";

function Header({services}) {
  const theme = useTheme();

  return (
    <FormControl variant="outlined" style={{width: 300, marginTop: theme.spacing(2.5)}}>
      <InputLabel id="logs-select-service-label">Service</InputLabel>
      <Select
        labelId="logs-select-service-label"
        id="logs-select-service"
        value={services.selected}
        onChange={e => services.setSelected(e.target.value)}
        label="Service"
      >
        <MenuItem value={'all'}>All</MenuItem>
        {services.list.map((service, index) => (
          <MenuItem value={service} key={index}>{service}</MenuItem>
        ))}
        <MenuItem value={'demo'}>Demo</MenuItem>
      </Select>
    </FormControl>
  );
}

export default Header;
