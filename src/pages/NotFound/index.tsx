import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-2);
  };

  return (
    <div className="not-found">
      <p className="not-found__error">404 ошибка</p>
      <h1 className="not-found__title">Страница не найдена</h1>
      <p className="not-found__subtitle">
        Извините, страница, которую вы ищете, не существует или была перемещена
      </p>
      <div className="not-found__btns">
        <button onClick={handleBackClick} className="not-found__back-btn">
          <svg
            className="not-found__back-btn-icon"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.5892 3.92247L5.34501 9.16664H16.6667V10.8333H5.34501L10.5892 16.0775L9.41084 17.2558L2.15501 9.99997L9.41084 2.74414L10.5892 3.92247Z"
              fill="#475467"
            />
          </svg>
          Назад
        </button>
        <Link to="/" className="not-found__home-btn btn-primary">
          На главную
        </Link>
      </div>
    </div>
  );
};
