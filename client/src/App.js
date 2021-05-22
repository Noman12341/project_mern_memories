import React, { useState, useEffect } from 'react';
import { Container, AppBar, Grid, Grow, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import { getPosts } from './actions/posts';

import useStyles from './styles';

import memoriesLogo from './images/memories-logo.png';

const App = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch]);
    return <Container maxWidth="lg">
        <AppBar className={classes.appBar} position="static">
            <Typography className={classes.heading} variant="h4" align="center">Memories</Typography>
            <img className={classes.image} src={memoriesLogo} alt="memories" height="60" />
        </AppBar>
        <Grow in>
            <Container>
                <Grid container justify="space-between" alignItems="stretch" spacing={4}>
                    <Grid item xs={12} sm={7} >
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={4} >
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    </Container>
}
export default App;