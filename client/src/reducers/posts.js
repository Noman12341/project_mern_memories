import { FETCH_ALL, UPDATE_POST, CREATE_POST, LIKE_POST, DELETE_POST, GET_BY_SEARCH } from '../constants/actionTypes';

const initialState = {
    posts: [],
    currentPage: null,
    numberOfPages: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_POST:
            return { ...state, posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post) };
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            }
        case CREATE_POST:
            return { ...state, posts: [...state.posts, action.payload] };
        case LIKE_POST:
            return { ...state, posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post) };
        case DELETE_POST:
            return { ...state, posts: state.posts.filter(p => p._id !== action.payload) };
        case GET_BY_SEARCH:
            return { ...state, posts: action.payload };
        default:
            return state;
    }
}
export default reducer;