import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import getCategoriesData from './data/getCategoriesData';
import { IState, Routes } from './models/app';
import { ICategory } from './models/data';
import { changeAuthState } from './redux/actions';
import { AUTH_URL } from './utils';
import AdminPanel from './views/AdminPanel';
import Category from './views/Category';
import Main from './views/Main';
import Statistics from './views/Statistics';

const App = (): ReactElement => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state: IState) => state.mode.isAuth);

  const [categoriesData, updateData] = useState((): ICategory[] => []);
  // const [isAuthenticated, setIsAuthenticated] = useState(authState);

  const checkAuthenticated = async () => {
    console.log(isAuthenticated);
    try {
      if (localStorage.token) {
        const res = await fetch(`${AUTH_URL}verify`, {
          headers: { token: localStorage.token },
        });

        const parseRes = await res.json();
        console.log('res:', parseRes);
        if (parseRes === true) {
          dispatch(changeAuthState(true));
          console.log('from true', isAuthenticated);
          // setIsAuthenticated(true);
        } else {
          // setIsAuthenticated(false);
          dispatch(changeAuthState(false));
          console.log('from false', isAuthenticated);
        }
      } else {
        // setIsAuthenticated(false);
        dispatch(changeAuthState(false));
        console.log('from false second', isAuthenticated);
      }

      // setIsAuthenticated(parseRes === true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

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
        <Route exact path={Routes.admin}>
          {isAuthenticated ? <AdminPanel /> : <Redirect to={Routes.main} />}
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
        <Footer />
      </Switch>
    </>
  );
};

export default App;
