// Import libraries
import { createSlice } from '@reduxjs/toolkit';

type InitialStateProps = {
    isSidebarOpen: boolean;
}

const initialState: InitialStateProps = {
    isSidebarOpen: true
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        toggleSideBar: (state) => ({
            ...state,
            isSidebarOpen: !state.isSidebarOpen,
        }),
    },
})

// Action creators are generated for each case reducer function
export const { toggleSideBar } = userSlice.actions

export default userSlice.reducer