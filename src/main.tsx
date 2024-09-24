import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';

import App from '@/App.tsx';
import { store } from '@/Redux/store';
import { mantineTheme } from '@/Config';
import { AuthModal } from '@/Shared/Components';
import { Notifications } from '@mantine/notifications';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <MantineProvider theme={mantineTheme} defaultColorScheme="light">
        <BrowserRouter>
          <Notifications />
          <App />
          <AuthModal />
        </BrowserRouter>
      </MantineProvider>
    </Provider>
  </StrictMode>
);
