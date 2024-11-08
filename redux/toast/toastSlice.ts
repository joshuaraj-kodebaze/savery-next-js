// Import libraries
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TToastState {
    message: string;
    duration: number;
    show: boolean;
    type: 'success' | 'error' | 'warning'
}

const initialState: TToastState = {
    message: '',
    duration: 5000,
    show: false,
    type: 'success'
};

type TShowToastPayloadAction = {
    message: string;
    duration?: number;
    type?: 'success' | 'error' | 'warning'
};

const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        showToast(
            state: TToastState,
            { payload }: PayloadAction<TShowToastPayloadAction>
        ) {
            return { ...initialState, ...payload, show: true };
        },
        clearToast(state: TToastState) {
            // We retain the message because we don't want
            // the message to dissappear when fading outing
            return { ...initialState, message: state.message };
        },
    },
});

export const { showToast, clearToast } = toastSlice.actions;

export default toastSlice.reducer;
