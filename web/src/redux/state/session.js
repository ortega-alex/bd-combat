import { createSlice } from '@reduxjs/toolkit';
import { clearStorage, getStorage, saveStorage } from '@/utilities';
import { _KEYS } from '@/models';

const EmptySessionState = null;
const session = getStorage(_KEYS.SESSION);
export const sessionSlice = createSlice({
    name: 'session',
    initialState: session ? session : EmptySessionState,
    reducers: {
        setSession: (_, action) => {
            const { session, token } = action.payload;
            if (token) saveStorage(_KEYS.TOKEN, token);
            saveStorage(_KEYS.SESSION, session);
            return session;
        },
        modifySession: (state, action) => ({ ...state, ...action.payload }),
        resetSession: () => {
            clearStorage(_KEYS.SESSION);
            clearStorage(_KEYS.TOKEN);
            return EmptySessionState;
        }
    }
});

export const { setSession, modifySession, resetSession } = sessionSlice.actions;
export default sessionSlice.reducer;
