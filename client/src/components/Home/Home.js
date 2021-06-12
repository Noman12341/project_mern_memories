import React, { useEffect, useState } from 'react';
import { Grow, Container, Grid, Paper, AppBar, TextField, Button, Chip } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getPosts, getPostsBySearch } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination';
import useStyles from './styles';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Home() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(null);
    const query = useQuery();
    const history = useHistory();

    const page = query.get('page') || 1;

    const searchQuery = query.get('searchQuery');
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);

    const handleKeyPress = (event) => {
        if (event.charCode === 13) {
            // search post
            handleSearch();
        }
    }

    const handleAddTag = (tag) => setTags((prevTags) => [...prevTags, tag]);

    const handleDeleteTag = (tagToDelete) => setTags(prevTags => prevTags.filter(tag => tag !== tagToDelete));

    const handleSearch = () => {
        if (search.trim() || tags) {
            // dispatch => search posts
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else {
            history.push('/');
        }
    }
    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch]);
    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit" >
                            <TextField
                                name="search"
                                variant="outlined"
                                label="Search"
                                fullWidth
                                value={search}
                                onKeyPress={handleKeyPress}
                                onChange={(event) => setSearch(event.target.value)}
                            />
                            <ChipInput
                                style={{ margin: "10px 0" }}
                                variant="outlined"
                                label="Search Tags"
                                onAdd={chip => handleAddTag(chip)}
                                onDelete={chip => handleDeleteTag(chip)}
                                value={tags}
                            />
                            <Button color="primary" variant="contained" className={classes.searchButton} onClick={handleSearch}>Search</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        <Paper elevation={6}>
                            <Pagination page={page} />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
}

export default Home;