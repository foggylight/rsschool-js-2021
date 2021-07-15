import React, { ReactElement, useEffect, useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import AdminCategoryCard from '../components/AdminCategoryCard';
import AdminHeader from '../components/AdminHeader';
import NewCategoryCard from '../components/NewCategoryCard';
import getCategoriesData from '../data/getCategoriesData';
import { Routes } from '../models/app';
import { ICategory } from '../models/data';
import { AUTH_URL } from '../utils';
import AdminCategory from './AdminCategory';

const AdminPanel = (): ReactElement => {
  const history = useHistory();

  const checkAuthenticated = async () => {
    try {
      if (localStorage.token) {
        const res = await fetch(`${AUTH_URL}verify`, {
          headers: { token: localStorage.token },
        });

        const parseRes = await res.json();
        if (!(parseRes === true)) {
          history.push(Routes.main);
        }
      } else {
        history.push(Routes.main);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      history.push(Routes.main);
    }
  };

  const [categoriesData, updateData] = useState((): ICategory[] => []);

  useEffect(() => {
    getCategoriesData().then(data => updateData(data));
    checkAuthenticated();
  }, []);

  const cards = categoriesData.map(({ id, image, name }) => {
    return <AdminCategoryCard key={id} id={id} image={image} name={name} />;
  });

  const cardsEditPages = categoriesData.map(({ id, name }) => (
    <Route key={id} exact path={`/admin/${id}/words`}>
      <AdminCategory id={id} name={name} />
    </Route>
  ));

  return (
    <>
      <AdminHeader />
      <Switch>
        <Route exact path={Routes.adminC}>
          <main className="main-container">
            <p className="category-text">Choose category to change:</p>
            <div className="cards-field categories-field">
              <NewCategoryCard />
              {cards}
            </div>
          </main>
        </Route>
        {cardsEditPages}
        <Redirect exact from={Routes.admin} to={Routes.adminC} />
      </Switch>
    </>
  );
};

export default AdminPanel;
