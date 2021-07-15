import React, { ReactElement, useEffect, useState } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { Routes } from '../models/app';

const AdminHeader = (): ReactElement => {
  const history = useHistory();
  const { pathname } = useLocation();

  const [isWordsPage, changeState] = useState(false);

  useEffect(() => {
    const path = pathname.split('/').reverse()[0];
    changeState(path === 'words');
  }, []);

  useEffect(() => {
    return history.listen(location => {
      const path = location.pathname.split('/').reverse()[0];
      changeState(path === 'words');
    });
  }, [history]);

  const logoutHandler = () => {
    history.push(Routes.main);
    localStorage.removeItem('token');
  };

  return (
    <header className="header admin__header">
      <div>
        <NavLink to={Routes.adminC} className="admin__routes">
          Categories
        </NavLink>
        <span className={`admin__routes ${isWordsPage ? 'active' : ''}`}>Words</span>
      </div>
      <button onClick={logoutHandler} className="btn admin__btn" type="button">
        Log out
      </button>
    </header>
  );
};

export default AdminHeader;
