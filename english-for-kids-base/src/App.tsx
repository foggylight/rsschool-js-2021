import React, { ReactElement } from 'react';
import { Switch, Route } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import getCategoriesData from './data/getCategoriesData';
import { Routes } from './models/app';
import Category from './views/Category';
import Main from './views/Main';
import Statistics from './views/Statistics';

function App(): ReactElement {
  const categories = getCategoriesData().map(category => {
    // тут вместо категори рендерить гейм или трейн в зависимости от стейта из редакса
    return (
      <Route exact path={`/${category.name.toLowerCase()}`} key={category.id}>
        <Category id={category.id} name={category.name} />
      </Route>
    );
  });

  return (
    <>
      <Header />
      <Switch>
        <Route exact path={Routes.main}>
          <Main />
        </Route>
        {categories}
        <Route exact path={Routes.statistics}>
          <Statistics />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
