import React, { ReactElement, useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import getCategoriesData from './data/getCategoriesData';
import { Routes } from './models/app';
import { ICategory } from './models/data';
import AdminPanel from './views/AdminPanel';
import Category from './views/Category';
import Main from './views/Main';
import Statistics from './views/Statistics';

const App = (): ReactElement => {
  const [categoriesData, updateData] = useState((): ICategory[] => []);

  useEffect(() => {
    getCategoriesData().then(data => updateData(data));
  }, []);

  const categories = categoriesData.map(category => {
    return (
      <Route exact path={`/${category.id}`} key={category.id}>
        <Category id={category.id} name={category.name} />
      </Route>
    );
  });

  return (
    <>
      <Switch>
        <Route path={Routes.admin}>
          <AdminPanel />
        </Route>
        <Route path={Routes.main}>
          <Header />
          <Switch>
            <Route exact path={Routes.main}>
              <Main />
            </Route>
            {categories}
            <Route exact path={Routes.statistics}>
              <Statistics />
            </Route>
            <Route exact path={Routes.difficultWords}>
              <Category id={0} name="Difficult words" />
            </Route>
          </Switch>
        </Route>
      </Switch>
      <Footer />
    </>
  );
};

export default App;
