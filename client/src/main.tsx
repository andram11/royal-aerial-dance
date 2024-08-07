import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";

//State management
import { Provider } from "react-redux";
import { store } from "./state/store.ts";
import App from "./App.tsx";

//Stripe
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "./api/api-service.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
