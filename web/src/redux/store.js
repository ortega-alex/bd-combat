import { configureStore } from '@reduxjs/toolkit';
import { sessionSlice } from './state';

export default configureStore({
    reducer: {
        session: sessionSlice.reducer
    }
});
