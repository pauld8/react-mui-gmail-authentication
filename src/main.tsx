import ReactDOM from 'react-dom';
import './styles/index.scss';
import 'loaders.css';
import App from './App';
import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';

import store from './store';
import dark from './themes/dark';

ReactDOM.render(
  <ThemeProvider theme={dark}>
    <SnackbarProvider maxSnack={5}>
      <Provider store={store}>
        <App />
      </Provider>
    </SnackbarProvider>
  </ThemeProvider>,
  document.getElementById('root')
);
