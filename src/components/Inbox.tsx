import React, { useEffect } from 'react';
import { fetchUserMessages, fetchUserThreads } from '../actions/inbox';
import { useAppDispatch } from '../hooks';
import InboxHeader from './inbox/Header';
import InboxTable from './inbox/Table';

const Inbox: React.FC = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserThreads());
  }, []);

  return (
    <>
      <InboxHeader />

      <InboxTable />
    </>
  );
};

export default Inbox;
