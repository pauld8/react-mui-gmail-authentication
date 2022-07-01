import {
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Paper,
  Table,
  TablePagination,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchUserMessages } from '../../actions/inbox';
import { useAppDispatch } from '../../hooks';
import { authSelector } from '../../reducers/auth';
import { inboxSelector } from '../../reducers/inbox';

const InboxTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const auth = useSelector(authSelector);
  const inbox = useSelector(inboxSelector);
  const { enqueueSnackbar } = useSnackbar();

  const [threads, setThreads] = useState([]);

  useEffect(() => {
    dispatch(fetchUserMessages());
  }, []);

  return (
    <>
      <TableContainer elevation={4} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {threads.map((thread: any) => (
              <TableRow
                key={thread.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {thread.name}
                </TableCell>
                <TableCell align="right">{thread.calories}</TableCell>
                <TableCell align="right">{thread.fat}</TableCell>
                <TableCell align="right">{thread.carbs}</TableCell>
                <TableCell align="right">{thread.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Paper elevation={5}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={30}
          rowsPerPage={10}
          page={1}
          onPageChange={() => {}}
          onRowsPerPageChange={() => {}}
        />
      </Paper>
    </>
  );
};

export default InboxTable;
