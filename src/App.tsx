import React from 'react';

import './App.css';

import { Header } from './components/Header';
import { Search } from './components/Search';

function App() {
  return (
    <div className="App">
      <Header />

      <main className="main">
        <div className="container">
          <Search />
        </div>
      </main>

      <footer className="footer">footer</footer>
    </div>
  );
}

export default App;
