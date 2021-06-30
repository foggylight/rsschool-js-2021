import React, { ReactElement } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import SideMenu from './components/sideMenu/SideMenu';
import { Routes } from './models/app';
import Main from './views/Main';

function App(): ReactElement {
  return (
    <BrowserRouter>
      <SideMenu />
      <Header />
      <Switch>
        <Route path={Routes.main}>
          <Main />
        </Route>
        <Route path={Routes.categories}>
          <div>category</div>
        </Route>
        <Route path={Routes.statistics}>
          <div>statistics</div>
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
