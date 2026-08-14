import { configureStore } from "@reduxjs/toolkit";

const appReducer = (
  state = {},
  _action: unknown,
) => state;

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
});

export type RootState = ReturnType<
  typeof store.getState
>;

export type AppDispatch =
  typeof store.dispatch;