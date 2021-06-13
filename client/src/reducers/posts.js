import { FETCH_ALL, UPDATE_POST, CREATE_POST, LIKE_POST, DELETE_POST, START_LOADING, END_LOADING, GET_BY_SEARCH, GET_POST } from '../constants/actionTypes';

const initialState = {
    posts: [],
    post: {},
    currentPage: null,
    numberOfPages: null,
    isLoading: true
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
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case GET_POST:
            return { ...state, post: action.payload };
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