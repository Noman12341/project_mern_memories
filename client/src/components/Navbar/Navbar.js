import React from 'react';
import { AppBar, Avatar, Toolbar, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import memoriesLogo from '../../images/memories-logo.png';
import useStyles from './styles';

function Navbar() {
    const classes = useStyles();
    const user = null;
    return (
        <AppBar className={classes.appBar} position="static">
            <div className={classes.brandContainer}>
                <Typography className={classes.heading} component={Link} to="/" variant="h4" align="center">Memories</Typography>
                <img className={classes.image} src={memoriesLogo} alt="memories" height="60" />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imgUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary">Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Signin</Button>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;