import React, { ReactElement } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import SideMenu from './components/sideMenu/SideMenu';

function App(): ReactElement {
  return (
    <div className="app">
      <Header />
      <SideMenu />
      <main>Content</main>
      <Footer />
    </div>
  );
}

export default App;
