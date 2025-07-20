import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    articles: localStorage.getItem('UserArticles') ? JSON.parse(localStorage.getItem('UserArticles')) : [],
    filter: "",
    latestArticles: JSON.parse(localStorage.getItem('LatestArticles')) || [],
    categories: JSON.parse(localStorage.getItem('categoryInUse')) || [],
    searchArray: [],
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setArticles: (state, action) => {
            state.articles = action.payload;
            localStorage.setItem('UserArticles', JSON.stringify(state.articles));
        },
        setLatestArticles: (state, action) => {
            state.latestArticles = action.payload;
            localStorage.setItem('LatestArticles', JSON.stringify(state.latestArticles));
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
        setSearch: (state, action) => {
            const temp = action?.payload?.split(' ');
            state.searchArray = temp;
        },
        setCategory: (state, payload) => {
            state.categories = payload.payload
            localStorage.setItem('categoryInUse', JSON.stringify(state.categories));
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    }
});

export const { setArticles, setFilter, setCategory, setSearch, setLatestArticles } = userSlice.actions;
export default userSlice.reducer;
