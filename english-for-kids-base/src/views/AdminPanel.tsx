import React, { ReactElement, useEffect, useRef, useState } from 'react';
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

  const [reload, setReload] = useState(false);
  const [screenWidth] = useState(window.screen.width);
  const [cardCount, incrementCount] = useState(0);
  const [categoriesData, updateData] = useState((): ICategory[] => []);
  const [categoriesRoutesData, updateRoutesData] = useState((): ICategory[] => []);
  const [isBottom, setPlacing] = useState(false);

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

  window.addEventListener('storage', () => {
    history.push(Routes.main);
  });

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getCategoriesData().then(data => updateRoutesData(data));
    checkAuthenticated();
    if (screenWidth > 1054) {
      incrementCount(7);
    } else if (screenWidth > 794) {
      incrementCount(5);
    } else if (screenWidth > 534) {
      incrementCount(3);
    } else {
      incrementCount(1);
    }
  }, []);

  useEffect(() => {
    getCategoriesData().then(data => updateData(data.splice(0, cardCount)));
  }, [cardCount]);

  const cards = categoriesData.map(({ id, image, name }) => (
    <AdminCategoryCard setReload={setReload} key={id} id={id} image={image} name={name} />
  ));

  const cardsEditPages = categoriesRoutesData.map(({ id, name }) => (
    <Route key={id} exact path={`/admin/${id}/words`}>
      <AdminCategory id={id} name={name} />
    </Route>
  ));

  useEffect(() => {
    if (!isBottom) {
      return;
    }
    if (screenWidth > 1054) {
      incrementCount(cardCount + 4);
    } else if (screenWidth > 794) {
      incrementCount(cardCount + 3);
    } else if (screenWidth > 534) {
      incrementCount(cardCount + 2);
    } else {
      incrementCount(cardCount + 1);
    }
  }, [isBottom]);

  useEffect(() => {
    if (reload) {
      getCategoriesData().then(data => updateData(data.splice(0, cardCount)));
      getCategoriesData().then(data => updateRoutesData(data));
      setReload(false);
    }
  }, [reload]);

  const scrollHandler = () => {
    if (!ref.current) {
      return;
    }
    if (ref.current.scrollTop + ref.current.clientHeight >= ref.current.scrollHeight) {
      setPlacing(true);
    } else {
      setPlacing(false);
    }
  };

  return (
    <>
      <AdminHeader />
      <Switch>
        <Route exact path={Routes.adminC}>
          <main onScroll={scrollHandler} ref={ref} className="main-container admin-main-container">
            <p className="category-text">Choose category to change:</p>
            <div className="cards-field categories-field">
              <NewCategoryCard setReload={setReload} />
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
