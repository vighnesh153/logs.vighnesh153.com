import React from 'react';

import Cookie from 'js-cookie';

import makeStyles from '@material-ui/core/styles/makeStyles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'block',
  },
  trailingSection: {
    display: 'flex',
    alignItems: "center",
  },
  userName: {
    marginLeft: theme.spacing(1),
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

export default function NavBar() {
  const classes = useStyles();

  const currentUser = JSON.parse(Cookie.get('user') || '{}') || null;

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Logs
          </Typography>
          <div className={classes.grow} />
          <div className={classes.trailingSection}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="false"
              color="inherit"
            >
              {
                currentUser === null ? (
                  <AccountCircle />
                ) : (
                  <Avatar
                    src={currentUser.profileImage}
                    alt={currentUser.name || 'User Profile Image'}
                    className={classes.avatar}
                  />
                )
              }
            </IconButton>
            <p className={classes.userName}>
              {currentUser.name || 'Guest'}
            </p>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
