import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { selectIsAuth } from '../../redux/reducers/auth';
import { logout } from '../../redux/actions/auth';

export const Header = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectIsAuth);
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);

  const toggleMenu = () => {
    document.body.classList.toggle('scroll-block');
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogoutClick = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      dispatch(logout());
    }
  };

  return (
    <header className={clsx('header', isMenuOpen && 'mobile-menu--open')}>
      <div className="container">
        <div className="header__content">
          <Link to="/" className="header__logo">
            foody
          </Link>
          <ul className="header__menu">
            <li className="header__menu-item">
              <Link to="/" className="header__menu-link">
                Главная
              </Link>
            </li>
            <li className="header__menu-item">
              <Link to="/favorites" className="header__menu-link">
                Избранное
              </Link>
            </li>
          </ul>
          <div className="header__auth">
            {isAuth ? (
              <button onClick={handleLogoutClick} className="header__btn btn-attention">
                Выйти
              </button>
            ) : (
              <>
                <Link to="/login" className="header__btn header__btn-signin">
                  Войти
                </Link>
                <Link to="/register" className="header__btn btn-primary">
                  Регистрация
                </Link>
              </>
            )}
          </div>
          <div className="header__hamburger-container" onClick={toggleMenu}>
            <div className="header__hamburger">
              <div className="header__hamburger-inner">
                <span className="header__hamburger-line"></span>
                <span className="header__hamburger-line"></span>
                <span className="header__hamburger-line"></span>
              </div>
            </div>
          </div>
          <div className="header__mobile-menu">
            <div className="header__mobile-menu-inner">
              <p className="header__mobile-menu-label">Меню</p>
              <ul className="header__mobile-menu-nav">
                <li className="header__mobile-menu-item">
                  <Link to="/" className="header__mobile-menu-link" onClick={toggleMenu}>
                    <svg
                      className="header__mobile-menu-icon"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_232_4)">
                        <path
                          d="M23.2773 9.85797L13.2069 0.890762C13.1732 0.861205 13.1326 0.835837 13.087 0.816404C12.4425 0.313713 11.5523 0.337103 10.9305 0.890762L0.860036 9.85693C0.138225 10.4991 0.0470931 11.6388 0.658074 12.3982C1.04423 12.8785 1.68476 12.8724 2.17596 12.7706V22.4094C2.17596 23.137 2.74426 23.7294 3.44332 23.7294H9.50966C9.78295 23.7294 10.0048 23.5014 10.0048 23.2206V14.8142H14.1336V23.2206C14.1336 23.5014 14.3554 23.7294 14.6286 23.7294H20.695C21.3941 23.7294 21.9624 23.137 21.9624 22.4094V12.7706C22.4554 12.8703 23.094 12.8775 23.4802 12.3982C24.0902 11.6389 23.9991 10.4981 23.2773 9.85797ZM22.7169 11.7489C22.615 11.872 22.0871 11.8047 21.6654 11.6155C21.512 11.5463 21.3337 11.5627 21.1961 11.6564C21.0565 11.75 20.9714 11.9109 20.9714 12.0817V22.4085C20.9714 22.5755 20.8465 22.7108 20.6941 22.7108H15.1227V14.3045C15.1227 14.0236 14.9009 13.7956 14.6277 13.7956H9.50875C9.23547 13.7956 9.0137 14.0236 9.0137 14.3045V22.7108H3.4423C3.28981 22.7108 3.16506 22.5755 3.16506 22.4085V12.0816C3.16506 11.9096 3.08083 11.7489 2.94034 11.6552C2.80075 11.5626 2.62347 11.5483 2.46996 11.6154C2.0957 11.7854 1.52649 11.8811 1.41951 11.7478C1.14917 11.4119 1.18789 10.9092 1.50668 10.6253L11.5772 1.65818C11.8525 1.41393 12.2514 1.41393 12.5268 1.65818C12.5623 1.69076 12.6031 1.71717 12.6456 1.73661L22.6289 10.6274C22.9486 10.9103 22.9871 11.4129 22.7169 11.7489Z"
                          fill="#7F56D9"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_232_4">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>

                    <span className="header__mobile-menu-text">Главная</span>
                  </Link>
                </li>
                <li className="header__mobile-menu-item">
                  <Link to="/favorites" className="header__mobile-menu-link" onClick={toggleMenu}>
                    <svg
                      className="header__mobile-menu-icon"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_54_13)">
                        <path
                          d="M22.0615 3.409C20.8048 2.15227 19.141 1.4654 17.3653 1.4654C15.5896 1.4654 13.9207 2.15736 12.664 3.41409L12.0077 4.07044L11.3411 3.40391C10.0844 2.14719 8.41047 1.45013 6.63477 1.45013C4.86416 1.45013 3.1953 2.1421 1.94366 3.39374C0.686934 4.65047 -0.00502959 6.31932 5.83779e-05 8.09502C5.83779e-05 9.87072 0.69711 11.5345 1.95384 12.7912L11.509 22.3464C11.6413 22.4787 11.8194 22.5499 11.9924 22.5499C12.1654 22.5499 12.3435 22.4838 12.4758 22.3515L22.0513 12.8116C23.308 11.5548 24 9.88599 24 8.11029C24.0051 6.33458 23.3182 4.66573 22.0615 3.409ZM21.0846 11.8398L11.9924 20.8964L2.92055 11.8245C1.92331 10.8273 1.37381 9.50439 1.37381 8.09502C1.37381 6.68566 1.91822 5.36278 2.91546 4.37063C3.90762 3.37847 5.23049 2.82897 6.63477 2.82897C8.04414 2.82897 9.3721 3.37847 10.3693 4.37572L11.5192 5.5256C11.7889 5.79526 12.2214 5.79526 12.491 5.5256L13.6307 4.38589C14.628 3.38865 15.9559 2.83915 17.3602 2.83915C18.7645 2.83915 20.0874 3.38865 21.0846 4.3808C22.0818 5.37805 22.6263 6.70092 22.6263 8.11029C22.6313 9.51965 22.0818 10.8425 21.0846 11.8398Z"
                          fill="#7F56D9"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_54_13">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <span className="header__mobile-menu-text">Избранное</span>
                  </Link>
                </li>
              </ul>
              <div className="header__mobile-auth">
                {isAuth ? (
                  <button onClick={handleLogoutClick} className="header__btn btn-attention">
                    Выйти
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="header__btn header__btn-signin"
                      onClick={toggleMenu}>
                      Войти
                    </Link>
                    <Link to="/register" className="header__btn btn-primary" onClick={toggleMenu}>
                      Регистрация
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
