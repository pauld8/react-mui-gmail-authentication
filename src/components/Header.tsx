import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';

import Loader from 'react-loaders';

import React, { useState } from 'react';
import LoginBtn from './LoginBtn';
import { useAppSelector } from '../hooks';
import { authSelector } from '../reducers/auth';

const Header = () => {
  const auth = useAppSelector(authSelector);

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleLogOut = () => {
    gapi.auth2.getAuthInstance().signOut();
    setAnchorElUser(null);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="relative">
          <Container maxWidth="lg">
            <Toolbar>
              <Typography variant="h6" component="div">
                Gmail Inbox Search
              </Typography>

              <Box sx={{ flexGrow: 1 }} />

              {!auth.authCheck ? (
                <Loader type="ball-pulse" active />
              ) : (
                <>
                  {!auth.loggedIn && <LoginBtn />}

                  {auth.loggedIn && (
                    <>
                      <Typography
                        sx={{ marginInlineEnd: 2 }}
                        variant="h6"
                        component="div"
                      >
                        {auth.user?.name}
                      </Typography>

                      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Tooltip title="User Settings">
                          <IconButton
                            onClick={handleOpenUserMenu}
                            sx={{ p: 0 }}
                          >
                            <Avatar
                              alt={auth.user?.name}
                              src={auth.user?.image}
                            />
                          </IconButton>
                        </Tooltip>

                        <Menu
                          sx={{ mt: '45px' }}
                          id="menu-appbar"
                          anchorEl={anchorElUser}
                          anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                          keepMounted
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                          open={Boolean(anchorElUser)}
                          onClose={handleCloseUserMenu}
                        >
                          <MenuItem onClick={handleLogOut}>
                            <Typography textAlign="center">Logout</Typography>
                          </MenuItem>
                        </Menu>
                      </Box>
                    </>
                  )}
                </>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </>
  );
};

export default Header;
