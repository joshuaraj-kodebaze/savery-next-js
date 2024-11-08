// Import libraries
import { createSlice } from '@reduxjs/toolkit';

type InitialStateProps = {
    isCreate: boolean;
}

const initialState: InitialStateProps = {
    isCreate: false
}

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        toggleIsCreate: (state) => ({
            ...state,
            isCreate: !state.isCreate,
        }),
    },
})

// Action creators are generated for each case reducer function
export const { toggleIsCreate } = projectSlice.actions

export default projectSlice.reducer