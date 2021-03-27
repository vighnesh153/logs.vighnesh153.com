import React from 'react';

import { withStyles, useTheme } from '@material-ui/core/styles';

import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';

import Box from '@material-ui/core/Box';
import MuiTypography from '@material-ui/core/Typography';

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import MuiLink from "@material-ui/core/Link";

const LOG_LEVELS = {
  ERROR: "error",
  WARN: "warn",
  INFO: "info",
}

const Link = withStyles({
  root: {
    width: 150,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
})(MuiLink);

const Typography = withStyles({
  root: {
    fontWeight: 'inherit',
    marginRight: 16,
    maxWidth: 200,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
})(MuiTypography);

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    marginBottom: '8px !important',
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    whiteSpace: 'pre',
  },
}))(MuiAccordionDetails);

const getTextColor = (logLevel, theme) => {
  switch (logLevel) {
    case LOG_LEVELS.ERROR:
      return theme.palette.error.main;
    case LOG_LEVELS.WARN:
      return theme.palette.warning.main;
    case LOG_LEVELS.INFO:
      return theme.palette.info.main;
    default:
      return 'inherit';
  }
};

function FormatLog({log, setSelected}) {
  const theme = useTheme();

  return (
    <Box display={'flex'} width={'100%'} fontWeight={'bold !important'}>
      <Typography
        style={{
          width: 90,
          color: getTextColor(log.level, theme),
        }}
      >
        {log.level.toUpperCase()}
      </Typography>
      <Typography>
        --
      </Typography>
      <Typography>
        {log.meta.time || new Date().toLocaleString()}
      </Typography>
      <Typography>
        --
      </Typography>
      <Typography style={{width: 200}}>
        {log.message || 'No Message'}
      </Typography>
      <Typography>
        --
      </Typography>
      <Link
        onClick={() => setSelected((o) => ({...o, requestId: log.requestId}))}
      >
        Request ID: {log.requestId}
      </Link>
    </Box>
  );
}

function ExpandableLog({ log, setSelected }) {
  const [expanded, setExpanded] = React.useState('');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Accordion square expanded={expanded === 'panel'} onChange={handleChange('panel')}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <FormatLog log={log} setSelected={setSelected} />
      </AccordionSummary>
      <AccordionDetails>
        {log.meta}
      </AccordionDetails>
    </Accordion>
  );
}

export default ExpandableLog;
