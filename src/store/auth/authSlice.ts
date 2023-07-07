import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUser} from '@/utils/interfaces/user';
import {HYDRATE} from 'next-redux-wrapper';

interface AuthState {
    token: string | null;
    token2: string | null;
    user: IUser | null;
    user_id: string | null;
}

const initialState: AuthState = {
    token: null,
    token2: null,
    user: null,
    user_id: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken(state, action: PayloadAction<string | null>) {
            state.token = action.payload;
        },
        setToken2(state, action: PayloadAction<string | null>) {
            state.token2 = action.payload;
        },
        setUser(state, action: PayloadAction<IUser | null>) {
            state.user = action.payload;
        },
        setUserId(state, action: PayloadAction<string | null>) {
            state.user_id = action.payload;
        }
    },
    extraReducers(builder) {
        builder.addCase(HYDRATE, (state, action) => {
            // Initialize state with persisted values
            return {
                ...state,
                ...action,
            };
        });
    },
});

export const {setToken,setToken2, setUser, setUserId} = authSlice.actions;
export default authSlice.reducer;
