import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    dashboardData: {
        articleCount: 0,
        categoryCount: 0,
        userCount: 0,
        user: {}
    },
    categories: JSON.parse(localStorage.getItem('categories')) || [],
    settingsData: JSON.parse(localStorage.getItem('settingData')) || {},
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || {},
    isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')) || false,
};

export const frontendSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setDashboardData: (state, payload) => {
            state.dashboardData = payload.payload
            // console.log("data", state.dashboardData);
        },
        setSettingsData: (state, payload) => {
            state.settingsData = payload.payload
            localStorage.setItem('settingData', JSON.stringify(state.settingsData));
            // console.log("frontendSlice : ", state.settingsData);
        },
        setCategories: (state, payload) => {
            state.categories = payload.payload
            localStorage.setItem('categories', JSON.stringify(state.categories));
            // console.log("frontendSlice : ", state.settingsData);
        },
        setCurrentUser: (state, payload) => {
            state.currentUser = payload.payload
            localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
            // console.log("frontendSlice : ", state.currentUser);
        },
        setIsLoggedIn: (state, payload) => {
            state.isLoggedIn = payload.payload
            localStorage.setItem('isLoggedIn', JSON.stringify(state.isLoggedIn));
        },
        applyTheme: (state) => {
            if (state.settingsData.themeColor) {
                document.documentElement.style.setProperty('--primary', state.settingsData.themeColor);
            }
        },
    },
});

export const { setDashboardData, setSettingsData, setCurrentUser, setIsLoggedIn, applyTheme, setArticles, setCategories, setUsers } = frontendSlice.actions;
export default frontendSlice.reducer;
