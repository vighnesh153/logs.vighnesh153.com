import React from 'react';
import {withStyles, useTheme} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    fontWeight: "bold",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    whiteSpace: 'pre',
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const headers = {
  id: 'header',
  requestId: 'Request ID',
  level: 'Level',
  message: 'Message',
  meta: 'Meta',
};

const LOG_LEVELS = {
  ERROR: "error",
  WARN: "warn",
  INFO: "info",
}

const getBgColor = (logLevel, theme) => {
  switch (logLevel) {
    case LOG_LEVELS.ERROR:
      return {backgroundColor: theme.palette.error.main};
    case LOG_LEVELS.WARN:
      return {backgroundColor: theme.palette.warning.main};
    case LOG_LEVELS.INFO:
      return {backgroundColor: theme.palette.info.main};
    default:
      return {}
  }
};

const getTextColor = (logLevel, theme) => {
  switch (logLevel) {
    case LOG_LEVELS.ERROR:
      return {color: theme.palette.error.contrastText};
    case LOG_LEVELS.WARN:
      return {color: theme.palette.warning.contrastText};
    case LOG_LEVELS.INFO:
      return {color: theme.palette.info.contrastText};
    default:
      return {}
  }
};

export default function Logs({logs, loading, selected, setSelected}) {
  const theme = useTheme();

  const tableCells = (log) => {
    const style = {
      ...getTextColor(log.level, theme),
      ...getBgColor(log.level, theme),
    }
    return (
      [log.requestId, log.level, log.message, log.meta].map((item, index) => (
        <StyledTableCell
          align={'left'}
          key={index}
          style={Object.values(LOG_LEVELS).includes(item) ? style : {}}
        >
          {
            item === log.requestId ? (
              <Button
                variant={"contained"}
                color={"primary"}
                onClick={() => setSelected((o) => ({...o, requestId: item}))}
              >
                {item}
              </Button>
            ) : item
          }
        </StyledTableCell>
      ))
    );
  };

  if (selected.service === 'demo') {
    logs = logs.filter((log) => log.requestId.startsWith(selected.requestId));
    logs = logs.filter((log) => log.level.startsWith(
      selected.logLevel === 'all' ? '' : selected.logLevel
    ));
  }

  const tableRow = (log) => (
    <StyledTableRow key={log.id}>
      {tableCells(log)}
    </StyledTableRow>
  );

  return (
    <TableContainer component={Paper}>
      <Table style={{minWidth: 700}}>
        <TableHead>
          <TableRow>
            <StyledTableCell align={'left'}>{headers.requestId}</StyledTableCell>
            <StyledTableCell align={'left'}>{headers.level}</StyledTableCell>
            <StyledTableCell align={'left'}>{headers.message}</StyledTableCell>
            <StyledTableCell align={'left'}>{headers.meta}</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {logs.map(tableRow)}
          {!loading && logs.length === 0 && (
            <TableRow>
              <TableCell colSpan={5}>
                <Grid container alignItems={"center"} justify={"center"}>
                  No logs found.
                </Grid>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

