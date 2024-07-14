import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';

import App from '@/App.tsx';
import { store } from '@/Redux/store';
import { mantineTheme } from '@/Config';
import { AuthModal } from '@/Shared/Components';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <MantineProvider theme={mantineTheme} defaultColorScheme="light">
        <BrowserRouter>
          <App />
          <AuthModal />
        </BrowserRouter>
      </MantineProvider>
    </Provider>
  </StrictMode>
);
