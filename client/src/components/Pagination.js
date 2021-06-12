import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Pagination, PaginationItem } from '@material-ui/lab'
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';

import { getPosts } from '../actions/posts';

function Paginate({ page }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { currentPage, numberOfPages } = useSelector(state => state.posts);
    useEffect(() => {
        if (page) dispatch(getPosts(page));

    }, [page]);
    return (
        <Pagination
            className={classes.ul}
            count={numberOfPages}
            page={Number(page) || 1}
            vairant="outlined"
            color="primary"
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
            )} />
    );
}
export default Paginate;