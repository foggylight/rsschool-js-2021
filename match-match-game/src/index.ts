import './scss/app.scss';

import App from './app/app';

const addApp = () => {
  const rootElem = document.getElementById('app');

  if (!rootElem) throw Error('There is no element with "app" id');

  return new App(rootElem);
};
addApp();
