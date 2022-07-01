import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUserThreads } from '../actions/inbox';
import { RootState } from '../store';

export interface InboxState {
  tags: Array<string>;
  includeSpamTrash: boolean;
}

const parseBool = (value: any) => {
  return value === '1';
};

const defaultInboxState: InboxState = {
  tags: localStorage.getItem('tags')
    ? JSON.parse(localStorage.getItem('tags')!)
    : [],
  includeSpamTrash: localStorage.getItem('spamTrash')
    ? parseBool(localStorage.getItem('spamTrash'))
    : false,
};

const extraReducers = {
  [fetchUserThreads.fulfilled.toString()]: (
    state: InboxState,
    action: PayloadAction<any>
  ) => {
    // state.tags = false;
  },
};

const inbox = createSlice({
  name: 'Inbox',
  initialState: defaultInboxState,
  extraReducers: extraReducers,
  reducers: {
    addTag: (state, action: PayloadAction<any>) => {
      state.tags = [...state.tags, ...[action.payload]];
    },
    clearInbox: (state) => {
      state.tags = [];
      state.includeSpamTrash = false;
    },
    removeTag: (state, action: PayloadAction<any>) => {
      const tags = [...state.tags];
      tags.splice(tags.indexOf(action.payload), 1);

      state.tags = tags;
    },
    toggleIncludeSpamTrash: (state) => {
      state.includeSpamTrash = !state.includeSpamTrash;
    },
  },
});

export const inboxActions = inbox.actions;

export const inboxSelector = (state: RootState) => state.inbox;

export default inbox.reducer;
