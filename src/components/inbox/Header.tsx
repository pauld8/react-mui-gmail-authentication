import {
  FormGroup,
  FormControlLabel,
  Box,
  Grid,
  Switch,
  TextField,
  Chip,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks';
import { inboxActions, inboxSelector } from '../../reducers/inbox';

const InboxHeader: React.FC = () => {
  const dispatch = useAppDispatch();
  const inbox = useSelector(inboxSelector);
  const { enqueueSnackbar } = useSnackbar();

  const [tag, setTag] = useState('');

  const addSearchTag = (e: React.FormEvent) => {
    e.preventDefault();

    if (!tag.length) {
      enqueueSnackbar('Please enter a tag', { variant: 'error' });
      return;
    }

    if (inbox.tags.includes(tag)) {
      enqueueSnackbar('Tag already exists', { variant: 'error' });
      return;
    }

    dispatch(inboxActions.addTag(tag));
    setTag('');
  };

  const deleteTag = (tag: string) => {
    dispatch(inboxActions.removeTag(tag));
  };

  return (
    <>
      <Grid sx={{ height: 55, alignItems: 'center' }} container>
        <Grid item>
          <form onSubmit={addSearchTag}>
            <TextField
              id="tag"
              size="small"
              color="primary"
              label="Add search tag"
              variant="outlined"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
          </form>
        </Grid>

        <Box sx={{ flexGrow: 1 }} />
        <Grid item>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={inbox.includeSpamTrash}
                  onChange={(e) =>
                    dispatch(inboxActions.toggleIncludeSpamTrash())
                  }
                />
              }
              label="Include Spam/Trash"
            />
          </FormGroup>
        </Grid>
      </Grid>

      {inbox.tags.length > 0 && (
        <Grid
          sx={{
            maxWidth: 600,
            justifyContent: 'start',
            paddingTop: '10px',
            paddingBottom: '10px',
            alignItems: 'center',
          }}
          container
        >
          {inbox.tags.map((tag: string, index: number) => (
            <Chip
              variant="outlined"
              sx={{ marginInlineEnd: 1, marginBottom: 1 }}
              key={index}
              label={tag}
              onDelete={() => deleteTag(tag)}
            />
          ))}
        </Grid>
      )}
    </>
  );
};

export default InboxHeader;
