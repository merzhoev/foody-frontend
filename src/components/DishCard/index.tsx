import React from 'react';
import clsx from 'clsx';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { selectIsAuth } from '../../redux/reducers/auth';
import { fetchAddFavorite, fetchRemoveFavorite } from '../../redux/actions/favorite';

interface IDishCardProps {
  _id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  categories: string[];
  isFavorited: boolean;
}

export const DishCard: React.FC<IDishCardProps> = ({
  _id,
  imageUrl,
  title,
  subtitle,
  categories,
  isFavorited,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectIsAuth);
  const isLoading = useAppSelector((state) => state.favorite.isLoading);

  const onAddFavorite = () => {
    if (!isAuth) {
      return navigate('/login');
    }

    dispatch(fetchAddFavorite(_id));
  };

  const onRemoveFavorite = () => {
    if (!isAuth) {
      return navigate('/login');
    }

    dispatch(fetchRemoveFavorite(_id));
  };

  return (
    <div className="dish-card">
      <div
        className="dish-card__image-container"
        style={{
          background: `url(${imageUrl})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}>
        <svg
          onClick={isFavorited ? onRemoveFavorite : onAddFavorite}
          className={clsx(
            'dish-card__heart-icon',
            isFavorited && 'dish-card__heart-icon--favorited',
          )}
          width="24"
          height="22"
          viewBox="0 0 24 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            className="dish-card__heart-icon-inner"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 3.07333C11.5021 2.4274 10.8624 1.9045 10.1303 1.54502C9.39824 1.18553 8.59335 0.999061 7.77778 1C4.60889 1 2 3.60889 2 6.77778C2 8.40667 2.67333 9.91111 3.65889 10.8967L11.2144 18.4522C11.4228 18.6605 11.7054 18.7775 12 18.7775C12.2946 18.7775 12.5772 18.6605 12.7856 18.4522L20.3411 10.8967C20.3588 10.8791 20.3758 10.8609 20.3922 10.8422C21.3 9.80444 22 8.44444 22 6.77778C22 3.60889 19.3911 1 16.2222 1C14.5033 1 12.9756 1.81111 12 3.07333Z"
            fill="#fff"
          />
          <path
            className="dish-card__heart-icon-out"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.0573 20.9427C11.3074 21.1926 11.6464 21.333 12 21.333C12.3536 21.333 12.6926 21.1926 12.9427 20.9427L22.0093 11.876C23.192 10.6933 24 8.888 24 6.93333C24 3.13067 20.8693 0 17.0667 0C15.0987 0 13.34 0.82 12.04 2.14933L12 2.108L11.96 2.14933C10.6613 0.82 8.90133 0 6.93333 0C3.13067 0 0 3.13067 0 6.93333C0 8.888 0.808 10.6933 1.99067 11.876L11.0573 20.9427ZM12 5.73333C11.765 5.73326 11.5342 5.67106 11.3309 5.55305C11.1277 5.43504 10.9592 5.26541 10.8427 5.06133C9.98667 3.56267 8.536 2.66667 6.93333 2.66667C4.60267 2.66667 2.66667 4.60267 2.66667 6.93333C2.66667 8.17867 3.192 9.30667 3.876 9.99067L12 18.1147L20.124 9.99067C20.808 9.30667 21.3333 8.17867 21.3333 6.93333C21.3333 4.60267 19.3973 2.66667 17.0667 2.66667C15.464 2.66667 14.0133 3.56267 13.1573 5.06133C13.0408 5.26541 12.8723 5.43504 12.6691 5.55305C12.4658 5.67106 12.235 5.73326 12 5.73333Z"
            fill="#7F56D9"
          />
        </svg>
      </div>
      <Link to={`/dishes/${_id}`} className="dish-card-link">
        <div className="dish-card__description">
          <h3 className="dish-card__title">{title}</h3>
          <p className="dish-card__subtitle">
            {subtitle.length > 100 ? subtitle.substring(0, 100) + '...' : subtitle}
          </p>
          <ul className="dish-card__categories">
            {categories.map((category) => (
              <li key={category} className="dish-card__category">
                <span className="dish-card__category-text">{category}</span>
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </div>
  );
};
