import React from 'react';
import Post from './Post/Post';
import useStyles from './styles';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

const Posts = ({ setCurrentId }) => {
    const classes = useStyles();
    const { posts, isLoading } = useSelector((state) => state.posts);

    if (!posts.length && !isLoading) return "No posts to show.";

    return (
        isLoading ? <CircularProgress /> : (
            <Grid container className={classes.mainContainer} alignItems="stretch" spacing={3}>
                {posts.map((post, index) => (
                    <Grid item key={index} xs={12} sm={12} md={6} lg={3}>
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
    );
}
export default Posts;