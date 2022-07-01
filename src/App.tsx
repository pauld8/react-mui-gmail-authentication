import {
  Alert,
  Backdrop,
  CircularProgress,
  Container,
  Snackbar,
} from '@mui/material';
import Grow, { GrowProps } from '@mui/material/Grow';

import Guest from './components/Guest';
import Header from './components/Header';
import Inbox from './components/Inbox';
import LoadGoogleApi from './components/LoadGoogleApi';
import config from './config';
import { useAppDispatch, useAppSelector } from './hooks';
import {
  alertMessage,
  authActions,
  authSelector,
  showAlert,
} from './reducers/auth';
import { inboxActions } from './reducers/inbox';

const DISCOVERY_DOCS = [
  'https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest',
];
const SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';

const App = () => {
  const dispatch = useAppDispatch();
  const hasAlert = useAppSelector(showAlert);
  const alertMsg = useAppSelector(alertMessage);
  const auth = useAppSelector(authSelector);

  const checkIfAuthenticated = (
    isSignedIn: boolean,
    startUp: boolean = true
  ) => {
    if (isSignedIn) {
      dispatch(
        authActions.setUser({
          user: gapi.auth2
            .getAuthInstance()
            .currentUser.get()
            .getBasicProfile(),
        })
      );
    } else {
      dispatch(authActions.signOut());
      dispatch(inboxActions.clearInbox());
    }

    if (startUp) {
      dispatch(authActions.authChecked());
    }
  };

  const initClient = () => {
    gapi.client
      .init({
        apiKey: config.GOOGLE_API_KEY,
        clientId: config.GOOGLE_CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })
      .then(
        function () {
          // Listen for sign-in state changes.
          gapi.auth2
            .getAuthInstance()
            .isSignedIn.listen(function (signInStatus) {
              checkIfAuthenticated(signInStatus, false);
            });

          checkIfAuthenticated(gapi.auth2.getAuthInstance().isSignedIn.get());
        },
        function (error) {
          // appendPre(JSON.stringify(error, null, 2));
        }
      );
  };

  const onGoogleLoad = () => {
    dispatch(authActions.appLoaded());
    gapi.load('client:auth2', initClient);
  };

  const closeSnackBar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(authActions.hideAlert());
  };

  return (
    <LoadGoogleApi onLoad={onGoogleLoad}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
        open={!auth.authCheck}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Snackbar
        TransitionComponent={Grow}
        autoHideDuration={6000}
        onClose={closeSnackBar}
        open={hasAlert}
      >
        <Alert severity="warning" sx={{ width: '100%' }}>
          {alertMsg}
        </Alert>
      </Snackbar>

      {auth.authCheck && (
        <div className="App">
          <Header />

          <main className="AppMain">
            <Container maxWidth="lg">
              {!auth.loggedIn && <Guest />}

              {auth.loggedIn && (
                <>
                  <Inbox />
                </>
              )}
            </Container>
          </main>
        </div>
      )}
    </LoadGoogleApi>
  );
};

export default App;
