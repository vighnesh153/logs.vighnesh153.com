import React from 'react';
import {withStyles, useTheme} from '@material-ui/core/styles';
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
  timestamp: 'Time',
  level: 'Level',
  message: 'Message',
  meta: 'Meta',
};

const getBgColor = (logLevel, theme) => {
  switch (logLevel) {
    case 'error':
      return {backgroundColor: theme.palette.error.main};
    case 'warn':
      return {backgroundColor: theme.palette.warning.main};
    case 'info':
      return {backgroundColor: theme.palette.info.main};
    default:
      return {}
  }
};

const getTextColor = (logLevel, theme) => {
  switch (logLevel) {
    case 'error':
      return {color: theme.palette.error.contrastText};
    case 'warn':
      return {color: theme.palette.warning.contrastText};
    case 'info':
      return {color: theme.palette.info.contrastText};
    default:
      return {}
  }
};

export default function Logs({logs}) {
  const theme = useTheme();

  const tableCells = (items, log) => (
    items.map((item, index) => (
      <StyledTableCell
        align={'left'}
        key={index}
        style={getTextColor(log.level, theme)}
      >
        {item}
      </StyledTableCell>
    ))
  );

  const tableRow = (log) => (
    <StyledTableRow key={log.id} style={getBgColor(log.level, theme)}>
      {tableCells(
        [log.timestamp, log.requestId, log.level, log.message, log.meta],
        log
      )}
    </StyledTableRow>
  );

  return (
    <TableContainer component={Paper}>
      <Table style={{minWidth: 700}}>
        <TableHead>
          <TableRow>
            <StyledTableCell align={'left'}>{headers.timestamp}</StyledTableCell>
            <StyledTableCell align={'left'}>{headers.requestId}</StyledTableCell>
            <StyledTableCell align={'left'}>{headers.level}</StyledTableCell>
            <StyledTableCell align={'left'}>{headers.message}</StyledTableCell>
            <StyledTableCell align={'left'}>{headers.meta}</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {logs.map(tableRow)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

