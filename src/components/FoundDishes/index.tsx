import React from 'react';
import clsx from 'clsx';

import { DishCard } from '../DishCard';
import { Paginate } from '../Paginate';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchDishesByIngrts, fetchDishesByName, setPageAction } from '../../redux/actions/dish';

export const FoundDishes = () => {
  const dispatch = useAppDispatch();
  const { dishes, page, totalPages, isLoading, findBy } = useAppSelector(({ dish }) => dish);
  const { favorites } = useAppSelector(({ favorite }) => favorite);

  const handlePageChange = (selectedItem: { selected: number }) => {
    const scrollTitle = (document.querySelector('.dishes__title') as HTMLDivElement)?.offsetTop;
    window.scrollTo({ top: scrollTitle - 50, behavior: 'smooth' });

    const clickedPage = selectedItem.selected + 1;

    if (findBy === 'ingrts') {
      dispatch(fetchDishesByIngrts(clickedPage));
    }

    if (findBy === 'name') {
      dispatch(fetchDishesByName(clickedPage));
    }
  };

  return (
    <>
      {!!dishes.length && (
        <section className="dishes">
          <h3 className="dishes__title">Блюда по вашему запросу</h3>
          <div className="dishes__list">
            <div className={clsx('dishes__overlay', isLoading && 'dishes__overlay--visible')}></div>
            {dishes.map((dish) => (
              <DishCard
                key={dish._id}
                isFavorited={!!favorites.find(({ _id }) => _id === dish._id)}
                {...dish}
              />
            ))}
          </div>
          {totalPages && (
            <Paginate page={page - 1} totalPages={totalPages} handlePageChange={handlePageChange} />
          )}
        </section>
      )}
    </>
  );
};
