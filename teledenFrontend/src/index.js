import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "antd/dist/antd.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./Context/userContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./firebase.js";
import { ThemeProvider, createTheme } from '@mui/material/styles';

import "./assets/css/animate.css";
import "./assets/css/normalize.css";
import "./assets/css/responsive-style2.css";
import "./assets/css/responsive-style.css";
import "./assets/css/style.css";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 30000 } },
});

queryClient.setQueryDefaults("requests", { staleTime: 0 });

const theme = createTheme();

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </UserProvider>
      </QueryClientProvider>
    </React.StrictMode>
    <ToastContainer />
  </ThemeProvider>,
  document.getElementById("root")
);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("../firebase-messaging-sw.js")
    .then(function (registration) {
      // console.log("Registration successful, scope is:", registration.scope);
    })
    .catch(function (err) {
      console.log("Service worker registration failed, error:", err);
    });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
