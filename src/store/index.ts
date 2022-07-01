import { configureStore } from '@reduxjs/toolkit';

import auth from '../reducers/auth';
import inbox from '../reducers/inbox';

const store = configureStore({
  devTools: true,
  reducer: {
    auth,
    inbox,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

store.subscribe(() => {
  const tags = store.getState().inbox.tags;
  const spamTrash = store.getState().inbox.includeSpamTrash;
  const tagsJson = JSON.stringify(tags);

  localStorage.setItem('tags', tagsJson);
  localStorage.setItem('spamTrash', spamTrash ? '1' : '0');
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
