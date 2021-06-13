import * as api from '../api';
import { FETCH_ALL, UPDATE_POST, CREATE_POST, GET_POST, LIKE_POST, DELETE_POST, GET_BY_SEARCH, START_LOADING, END_LOADING } from '../constants/actionTypes';

// Action Creators
export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.getPosts(page);
        dispatch({ type: FETCH_ALL, payload: data });

        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);
    }
}

// get post detail
export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.getPost(id);
        console.log(data);
        dispatch({ type: GET_POST, payload: data });

        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);
    }
}

// create post 
export const createPost = (post, history) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);

        dispatch({ type: CREATE_POST, payload: data });

        history.push(`/posts/${data._id}`);
    } catch (error) {
        console.log(error.message);
    }
}

export const updatePost = (id, post) => async (dispatch) => {

    try {
        const { data } = await api.updatePost(id, post);

        dispatch({ type: UPDATE_POST, payload: data });

    } catch (error) {
        console.log(error.message);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);

        dispatch({ type: LIKE_POST, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);

        dispatch({ type: DELETE_POST, payload: id });
    } catch (error) {
        console.log(error);
    }
}

// get posts by search
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        const { data } = await api.getPostsBySearch(searchQuery);
        dispatch({ type: GET_BY_SEARCH, payload: data });
    } catch (error) {
        console.log(error);
    }
}