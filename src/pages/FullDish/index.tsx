import React from 'react';
import clsx from 'clsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchFullDish, fetchSimilarDishes } from '../../redux/actions/fullDish';

import { DishCard } from '../../components';
import { selectIsAuth } from '../../redux/reducers/auth';
import { fetchAddFavorite, fetchRemoveFavorite } from '../../redux/actions/favorite';

export const FullDish = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const params = useParams();
  const id = params.id as string;
  const { dish, similarDishes } = useAppSelector(({ fullDish }) => fullDish);
  const { favorites } = useAppSelector(({ favorite }) => favorite);
  const isAuth = useAppSelector(selectIsAuth);
  const { page, dishes, totalPages, isLoading } = similarDishes;
  const isHideShowMoreBtn = !(page >= totalPages);
  const isFavorited = !!favorites.find(({ _id }) => _id === id);

  React.useEffect(() => {
    window.scrollTo({ top: 0 });

    dispatch(fetchFullDish(id));
  }, [id]);

  const handleShowMoreClick = () => {
    const nextPage = page + 1;
    const categories = dish?.categories as string[];
    dispatch(fetchSimilarDishes(id, categories, nextPage));
  };

  const onAddFavorite = () => {
    if (!isAuth) {
      return navigate('/login');
    }

    dispatch(fetchAddFavorite(id));
  };

  const onRemoveFavorite = () => {
    if (!isAuth) {
      return navigate('/login');
    }

    dispatch(fetchRemoveFavorite(id));
  };

  return (
    <>
      {dish && (
        <>
          <div className="full-dish">
            <h1 className="full-dish__main-title">{dish.title}</h1>
            <div className="full-dish__details">
              <ul className="full-dish__info">
                {dish.readyInMinutes && (
                  <li className="full-dish__info-item">
                    <svg
                      className="full-dish__info-icon"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 2C6.48603 2 2 6.48604 2 12C2 17.514 6.48603 22 12 22C17.514 22 22 17.514 22 12C22 6.48604 17.514 2 12 2ZM12 3.5C16.7033 3.5 20.5 7.2967 20.5 12C20.5 16.7033 16.7033 20.5 12 20.5C7.29669 20.5 3.5 16.7033 3.5 12C3.5 7.2967 7.29669 3.5 12 3.5ZM11.7383 5.98926C11.5395 5.99236 11.3502 6.07423 11.2117 6.21686C11.0733 6.3595 10.9971 6.55125 11 6.75V12.75C11 12.9489 11.079 13.1397 11.2197 13.2803C11.3603 13.421 11.5511 13.5 11.75 13.5H15.75C15.8494 13.5014 15.9481 13.483 16.0403 13.446C16.1325 13.4089 16.2164 13.3539 16.2872 13.2841C16.358 13.2143 16.4142 13.1312 16.4526 13.0395C16.4909 12.9478 16.5107 12.8494 16.5107 12.75C16.5107 12.6506 16.4909 12.5522 16.4526 12.4605C16.4142 12.3688 16.358 12.2857 16.2872 12.2159C16.2164 12.1461 16.1325 12.0911 16.0403 12.054C15.9481 12.017 15.8494 11.9986 15.75 12H12.5V6.75C12.5014 6.64962 12.4827 6.54997 12.4449 6.45695C12.4071 6.36394 12.3511 6.27946 12.28 6.20852C12.209 6.13758 12.1245 6.08161 12.0314 6.04395C11.9383 6.00629 11.8387 5.98769 11.7383 5.98926Z"
                        fill="#7F56D9"
                      />
                    </svg>
                    <span className="full-dish__info-item-text">{dish.readyInMinutes} минут</span>
                  </li>
                )}
                {dish.servings && (
                  <li className="full-dish__info-item">
                    <svg
                      className="full-dish__info-icon"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M22.735 16.3828C22.4543 11.3788 18.7362 7.27798 13.9095 6.40929C13.9789 6.20557 14.0171 5.98747 14.0171 5.76065C14.0171 4.6484 13.1122 3.7436 12 3.7436C10.8878 3.7436 9.98287 4.6484 9.98287 5.76065C9.98287 5.98755 10.0211 6.20549 10.0904 6.40921C5.26392 7.27782 1.54618 11.3788 1.26545 16.3826C0.522343 16.6901 0 17.4065 0 18.2394C0 19.3516 0.931717 20.2564 2.07693 20.2564H21.9231C23.0683 20.2564 24 19.3516 24 18.2394C24 17.4068 23.4778 16.6904 22.735 16.3828ZM11.5213 5.76065C11.5213 5.49673 11.736 5.28202 12 5.28202C12.264 5.28202 12.4787 5.49673 12.4787 5.76065C12.4787 6.02465 12.264 6.23935 12 6.23935C11.736 6.23935 11.5213 6.02465 11.5213 5.76065ZM12 7.77778C16.8215 7.77778 20.7898 11.5001 21.1819 16.2222H2.8181C3.21018 11.5001 7.1785 7.77778 12 7.77778ZM21.9231 18.718H2.07693C1.78513 18.718 1.53842 18.4987 1.53842 18.2394C1.53842 17.9799 1.78513 17.7606 2.07693 17.7606H21.9231C22.2149 17.7606 22.4616 17.9799 22.4616 18.2394C22.4616 18.4987 22.2149 18.718 21.9231 18.718Z"
                        fill="#7F56D9"
                      />
                    </svg>
                    <span className="full-dish__info-item-text">{dish.servings} порций</span>
                  </li>
                )}
              </ul>
              {isFavorited ? (
                <button onClick={onRemoveFavorite} className="full-dish__favorite-btn">
                  <svg
                    className="full-dish__favorite-btn-icon"
                    width="24"
                    height="22"
                    viewBox="0 0 24 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 3.07333C11.5021 2.4274 10.8624 1.9045 10.1303 1.54502C9.39824 1.18553 8.59335 0.999061 7.77778 1C4.60889 1 2 3.60889 2 6.77778C2 8.40667 2.67333 9.91111 3.65889 10.8967L11.2144 18.4522C11.4228 18.6605 11.7054 18.7775 12 18.7775C12.2946 18.7775 12.5772 18.6605 12.7856 18.4522L20.3411 10.8967C20.3588 10.8791 20.3758 10.8609 20.3922 10.8422C21.3 9.80444 22 8.44444 22 6.77778C22 3.60889 19.3911 1 16.2222 1C14.5033 1 12.9756 1.81111 12 3.07333Z"
                      fill="#344054"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.0573 20.9427C11.3074 21.1926 11.6464 21.333 12 21.333C12.3536 21.333 12.6926 21.1926 12.9427 20.9427L22.0093 11.876C23.192 10.6933 24 8.888 24 6.93333C24 3.13067 20.8693 0 17.0667 0C15.0987 0 13.34 0.82 12.04 2.14933L12 2.108L11.96 2.14933C10.6613 0.82 8.90133 0 6.93333 0C3.13067 0 0 3.13067 0 6.93333C0 8.888 0.808 10.6933 1.99067 11.876L11.0573 20.9427ZM12 5.73333C11.765 5.73326 11.5342 5.67106 11.3309 5.55305C11.1277 5.43504 10.9592 5.26541 10.8427 5.06133C9.98667 3.56267 8.536 2.66667 6.93333 2.66667C4.60267 2.66667 2.66667 4.60267 2.66667 6.93333C2.66667 8.17867 3.192 9.30667 3.876 9.99067L12 18.1147L20.124 9.99067C20.808 9.30667 21.3333 8.17867 21.3333 6.93333C21.3333 4.60267 19.3973 2.66667 17.0667 2.66667C15.464 2.66667 14.0133 3.56267 13.1573 5.06133C13.0408 5.26541 12.8723 5.43504 12.6691 5.55305C12.4658 5.67106 12.235 5.73326 12 5.73333Z"
                      fill="#344054"
                    />
                  </svg>
                  <span className="full-dish__favorite-btn-text">В избранном</span>
                </button>
              ) : (
                <button onClick={onAddFavorite} className="full-dish__favorite-btn">
                  <svg
                    className="full-dish__favorite-btn-icon"
                    width="24"
                    height="22"
                    viewBox="0 0 24 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 3.07333C11.5021 2.4274 10.8624 1.9045 10.1303 1.54502C9.39824 1.18553 8.59335 0.999061 7.77778 1C4.60889 1 2 3.60889 2 6.77778C2 8.40667 2.67333 9.91111 3.65889 10.8967L11.2144 18.4522C11.4228 18.6605 11.7054 18.7775 12 18.7775C12.2946 18.7775 12.5772 18.6605 12.7856 18.4522L20.3411 10.8967C20.3588 10.8791 20.3758 10.8609 20.3922 10.8422C21.3 9.80444 22 8.44444 22 6.77778C22 3.60889 19.3911 1 16.2222 1C14.5033 1 12.9756 1.81111 12 3.07333Z"
                      fill="#fff"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.0573 20.9427C11.3074 21.1926 11.6464 21.333 12 21.333C12.3536 21.333 12.6926 21.1926 12.9427 20.9427L22.0093 11.876C23.192 10.6933 24 8.888 24 6.93333C24 3.13067 20.8693 0 17.0667 0C15.0987 0 13.34 0.82 12.04 2.14933L12 2.108L11.96 2.14933C10.6613 0.82 8.90133 0 6.93333 0C3.13067 0 0 3.13067 0 6.93333C0 8.888 0.808 10.6933 1.99067 11.876L11.0573 20.9427ZM12 5.73333C11.765 5.73326 11.5342 5.67106 11.3309 5.55305C11.1277 5.43504 10.9592 5.26541 10.8427 5.06133C9.98667 3.56267 8.536 2.66667 6.93333 2.66667C4.60267 2.66667 2.66667 4.60267 2.66667 6.93333C2.66667 8.17867 3.192 9.30667 3.876 9.99067L12 18.1147L20.124 9.99067C20.808 9.30667 21.3333 8.17867 21.3333 6.93333C21.3333 4.60267 19.3973 2.66667 17.0667 2.66667C15.464 2.66667 14.0133 3.56267 13.1573 5.06133C13.0408 5.26541 12.8723 5.43504 12.6691 5.55305C12.4658 5.67106 12.235 5.73326 12 5.73333Z"
                      fill="#344054"
                    />
                  </svg>
                  <span className="full-dish__favorite-btn-text">Добавить в избранное</span>
                </button>
              )}
            </div>
            <div
              style={{
                backgroundImage: `url(${dish.imageUrl})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}
              className="full-dish-image-container"></div>
            <div className="full-dish__description">
              <h3 className="full-dish__title">Описание</h3>
              <p className="full-dish__description-text">{dish.subtitle}</p>
            </div>
            <div className="full-dish__category">
              <span className="full-dish__category-text">Категория:</span>
              <ul className="full-dish__category-list">
                {dish.categories.map((category) => (
                  <li key={category} className="full-dish__category-item">
                    {category}
                  </li>
                ))}
              </ul>
            </div>
            <div className="full-dish__ingrts">
              <h3 className="full-dish__title">Ингредиенты</h3>
              <ul className="full-dish__ingrts-list">
                {dish.ingredients.map(({ _id, name, amount }) => (
                  <li key={_id} className="full-dish__ingrts-item">
                    <span className="full-dish__ingrts-name">{name}</span>
                    <span className="full-dish__ingrts-line"></span>
                    <span className="full-dish__ingrts-amount">{amount}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="full-dish__recipe">
              <h3 className="full-dish__title">Рецепт</h3>
              <ol className="full-dish__recipe-list">
                {dish.steps.map((step, index) => (
                  <li key={index} className="full-dish__recipe-item">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
          {!!dishes.length && (
            <section className="dishes">
              <h3 className="dishes__title">Похожие рецепты</h3>
              <div className="dishes__list">
                <div
                  className={clsx(
                    'dishes__overlay',
                    isLoading && 'dishes__overlay--visible',
                  )}></div>
                {dishes.map((dish: any) => (
                  <DishCard
                    key={dish._id}
                    isFavorited={!!favorites.find(({ _id }) => _id === dish._id)}
                    {...dish}
                  />
                ))}
              </div>
              <div className="dishes__btn-container">
                {isHideShowMoreBtn && (
                  <button
                    disabled={isLoading}
                    onClick={handleShowMoreClick}
                    className="dishes__show-more-btn">
                    {isLoading ? 'Загрузка...' : 'Показать ещё...'}
                  </button>
                )}
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
};
