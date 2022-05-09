import React from "react";
import { Provider } from "react-redux";
import { useRoutes, HashRouter } from "react-router-dom";

import routes from "./routes/index.js";
import store from "./stores";

import GlobalStyle from "./style";
import { IconStyle } from "./assets/iconfont/iconfont";
import { StoreProvider } from "./application/Singers/data";

const MainPages = () => {
  return useRoutes(routes);
};

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <GlobalStyle />
        <IconStyle />
        <StoreProvider>
          <MainPages />
        </StoreProvider>
      </HashRouter>
    </Provider>
  );
}

export default App;
