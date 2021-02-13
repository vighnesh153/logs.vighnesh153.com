import React from "react";

import Grid from "@material-ui/core/Grid";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Alert from "@material-ui/lab/Alert";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  alertContainer: {
    width: '95%',
    margin: theme.spacing(2.5, 'auto', -1),
  },
}));

function MyAlert({close, alertObj: {content, open, title, type}}) {
  const classes = useStyles();

  if (open === false) {
    return null;
  }

  return (
    <Grid item className={classes.alertContainer}>
      <Alert
        variant="filled"
        severity={type}
        onClose={close}
      >
        <AlertTitle><strong>{title}</strong></AlertTitle>
        <strong>{content}</strong>
      </Alert>
    </Grid>
  );
}

export default MyAlert;
