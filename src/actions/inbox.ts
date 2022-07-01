import { createAsyncThunk } from '@reduxjs/toolkit';
import { InboxState } from '../reducers/inbox';
import { RootState } from '../store';

export enum INBOX_ACTIONS {
  FETCH_THREADS = 'fetchUserTreads',
  FETCH_MESSAGES = 'fetchUserMessages',
}

export const fetchUserThreads = createAsyncThunk<any, any, { state: any }>(
  INBOX_ACTIONS.FETCH_THREADS,
  async (_, thunkAPI) => {
    const state: RootState = thunkAPI.getState();
    const includeSpamTrash = state.inbox.includeSpamTrash;

    const { body }: any = await gapi.client.gmail.users.threads.list({
      userId: 'me',
      includeSpamTrash: includeSpamTrash,
      maxResults: 100,
      //   q: 'subscription OR ערן',
    });

    const threads = console.log(JSON.parse(body));

    return JSON.parse(body);
  }
);

export const fetchUserMessages = createAsyncThunk<any>(
  INBOX_ACTIONS.FETCH_MESSAGES,
  async () => {
    const { body } = await gapi.client.gmail.users.messages.list({
      userId: 'me',
    });

    console.log(JSON.parse(body));

    return JSON.parse(body);
  }
);
