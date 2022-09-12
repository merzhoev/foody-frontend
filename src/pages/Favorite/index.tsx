import clsx from 'clsx';
import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { DishCard } from '../../components/DishCard';
import { fetchFavorites } from '../../redux/actions/favorite';
import { selectIsAuth } from '../../redux/reducers/auth';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import emptyImg from '../../assets/images/empty-favorites.png';

export const Favorite = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { favorites, isLoading } = useAppSelector(({ favorite }) => favorite);
  const isAuth = useAppSelector(selectIsAuth);

  React.useEffect(() => {
    if (isAuth) {
      dispatch(fetchFavorites());
    }
  }, []);

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  const handleBackBtnClick = () => {
    navigate(-1);
  };

  return (
    <div className="favorite">
      {favorites.length ? (
        <>
          <h1 className="favorite__title">Избранное</h1>
          <section className="dishes">
            <div className="dishes__list">
              <div
                className={clsx('dishes__overlay', isLoading && 'dishes__overlay--visible')}></div>
              {favorites.map((dish: any) => (
                <DishCard
                  isFavorited={!!favorites.find(({ _id }) => _id === dish._id)}
                  key={dish._id}
                  {...dish}
                />
              ))}
            </div>
          </section>
        </>
      ) : (
        <div className="favorite__empty">
          <img src={emptyImg} alt="Грустный эмоджи" className="favorite__empty-img" />
          <h2 className="favorite__empty-title">Закладок нет :(</h2>
          <p className="favorite__empty-subtitle">Вы ничего не добавляли в избранное</p>
          <button onClick={handleBackBtnClick} className="favorite__empty-btn btn-primary">
            <svg
              className="favorite__empty-icon"
              width="24"
              height="24"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.5892 3.92247L5.34501 9.16664H16.6667V10.8333H5.34501L10.5892 16.0775L9.41084 17.2558L2.15501 9.99997L9.41084 2.74414L10.5892 3.92247Z"
                fill="#fff"
              />
            </svg>
            Вернуться назад
          </button>
        </div>
      )}
    </div>
  );
};
