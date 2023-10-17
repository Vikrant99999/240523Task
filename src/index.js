import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { persistStore } from "redux-persist";
import { ErrorBoundary } from "react-error-boundary";

import "./index.css";
import App from "./App";
import { customTheme } from "./theme/light/customTheme";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "./redux/store";
import { ErrorFallback } from "./pages/ErrorPage";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
let persistor = persistStore(store);

const root = document.getElementById("root");
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

render(
  <>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider theme={customTheme}>
              <CssBaseline />
              <Router basename="/ews">
                <App />
              </Router>
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </ErrorBoundary>
  </>,
  root
);
