import { Inbox as InboxIcon } from '@mui/icons-material';

import { Alert, AlertTitle, Typography } from '@mui/material';
import React from 'react';

const Guest: React.FC = ({ children }) => {
  return (
    <>
      <Alert icon={<InboxIcon />} severity="info">
        <AlertTitle>Welcome to Y&A's Gmail Inbox Search</AlertTitle>
        Please login using your <strong>organizational</strong> email address in
        order to proceed
      </Alert>
    </>
  );
};

export default Guest;
