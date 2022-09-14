import React from 'react';
import clsx from 'clsx';
import { fetchDishesByName, setFindByAction } from '../../redux/actions/dish';
import { setDishNameAction } from '../../redux/actions/search';
import { useAppDispatch, useAppSelector } from '../../redux/store';

export const SearchByName = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(({ dish }) => dish.isLoading);
  const [textFieldValue, setTextFieldValue] = React.useState<string>('');
  const searchByNameRef = React.useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTextFieldValue(value);
  };

  const handleFindBtnClick = () => {
    if (searchByNameRef.current) {
      const searchByName = searchByNameRef.current;
      const offset = searchByName.offsetTop;
      const height = searchByName.offsetHeight;
      window.scrollTo({ top: offset + height, behavior: 'smooth' });
    }

    dispatch(setFindByAction('name'));
    dispatch(setDishNameAction(textFieldValue));
    dispatch(fetchDishesByName());
    setTextFieldValue('');
  };

  return (
    <div ref={searchByNameRef} className="search__by-name">
      <label htmlFor="search__by-name-text-field" className="search__by-name-label label">
        Название блюда
      </label>
      <input
        onChange={handleInputChange}
        value={textFieldValue}
        id="search__by-name-text-field"
        className="search__by-name-input"
        placeholder="Введите название блюда"
        autoComplete="off"
        type="text"
      />
      <button
        onClick={handleFindBtnClick}
        className={clsx('search__by-name-btn btn-primary', isLoading && 'btn-primary--disabled')}>
        Найти рецепты
      </button>
    </div>
  );
};
