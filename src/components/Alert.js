import React from "react";

import Grid from "@material-ui/core/Grid";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Alert from "@material-ui/lab/Alert";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  alertContainer: {
    width: '95%',
    margin: 'auto',
  },
}));

function MyAlert({isOpen, setIsOpen, alertObj}) {
  const classes = useStyles();

  if (isOpen === false) {
    return null;
  }

  return (
    <Grid item className={classes.alertContainer}>
      <Alert
        variant="filled"
        severity={alertObj.type}
        onClose={() => setIsOpen(false)}
      >
        <AlertTitle><strong>{alertObj.title}</strong></AlertTitle>
        <strong>{alertObj.content}</strong>
      </Alert>
    </Grid>
  );
}

export default MyAlert;
