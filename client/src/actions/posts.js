import * as api from '../api';
import { FETCH_ALL, UPDATE_POST, CREATE_POST, LIKE_POST, DELETE_POST } from '../constants/actionTypes';

// Action Creators
export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.getPosts();

        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

// create post 
export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);

        dispatch({ type: CREATE_POST, payload: data });
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