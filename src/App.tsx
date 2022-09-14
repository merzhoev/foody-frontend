import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { Home, FullDish, NotFound, Login, Register, Favorite } from './pages';
import { Header, Footer } from './components';

import { useAppDispatch } from './redux/store';
import { fetchMe } from './redux/actions/auth';
import { fetchFavorites } from './redux/actions/favorite';

function App() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchMe());
    dispatch(fetchFavorites());
  }, []);

  return (
    <div className="App">
      <Header />

      <main className="main">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dishes/:id" element={<FullDish />} />
            <Route path="/favorites" element={<Favorite />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/not-found" />} />
          </Routes>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
