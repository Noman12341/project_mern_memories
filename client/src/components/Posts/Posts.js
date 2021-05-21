import React from 'react';
import Post from './Post/Post';
import useStyles from './styles';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

const Posts = () => {
    const classes = useStyles();
    const posts = useSelector((state) => state.posts);

    return (
        !posts.length ? <CircularProgress /> : (
            <Grid container className={classes.mainContainer} alignItems="stretch" spacing={3}>
                {posts.map((post, index) => (
                    <Grid item key={index} xs={12} sm={6}>
                        <Post post={post} />
                    </Grid>
                ))}
            </Grid>
        )
    );
}
export default Posts;