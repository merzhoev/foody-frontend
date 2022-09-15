import React from 'react';
import debounce from 'lodash.debounce';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import {
  addIngrtAction,
  fetchAutocomplete,
  removeIngrtAction,
  setAutoCompleteOpenAction,
  setCheckedAction,
} from '../../redux/actions/search';
import { IIngredient } from '../../redux/reducers/search/types';
import { fetchDishesByIngrts, setFindByAction } from '../../redux/actions/dish';

export const SearchByIngrs = () => {
  const dispatch = useAppDispatch();
  const { isChecked, addedIngrs, autocompleteList, isAutocompleteOpen } = useAppSelector(
    ({ search }) => search,
  );
  const isLoading = useAppSelector(({ dish }) => dish.isLoading);
  const [textFieldValue, setTextFieldValue] = React.useState<string>('');
  const autocompleteRef = React.useRef<HTMLUListElement>(null);
  const textFieldRef = React.useRef<HTMLInputElement>(null);
  const searchByIngrsRef = React.useRef<HTMLDivElement>(null);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    dispatch(setCheckedAction(checked));
  };

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTextFieldValue(value);
  };

  const handleAutocompleteItemClick = (ingrt: IIngredient) => {
    const isIngrtExist = addedIngrs.find(({ _id }) => _id === ingrt._id);
    if (!isIngrtExist) {
      dispatch(addIngrtAction(ingrt));
    }

    setTextFieldValue('');
    dispatch(setAutoCompleteOpenAction(false));
    textFieldRef.current?.focus();
  };

  const onRemoveIngrt = (_id: number) => {
    dispatch(removeIngrtAction(_id));
  };

  const handleFindBtnClick = () => {
    if (searchByIngrsRef.current) {
      const searchByIngrs = searchByIngrsRef.current;
      const offset = searchByIngrs.offsetTop;
      const height = searchByIngrs.offsetHeight;
      window.scrollTo({ top: offset + height, behavior: 'smooth' });
    }

    dispatch(setFindByAction('ingrts'));
    dispatch(fetchDishesByIngrts());
  };

  const fetchIngrts = (value: string) => {
    dispatch(fetchAutocomplete(value));
  };

  const debouncedFetchIngrts = React.useCallback(debounce(fetchIngrts, 250), []);

  React.useEffect(() => {
    debouncedFetchIngrts(textFieldValue);
  }, [textFieldValue]);

  React.useEffect(() => {
    const handleOutsideClick = (e: any) => {
      const path = e.path || (e.composedPath && e.composedPath());
      if (isAutocompleteOpen && !path.includes(autocompleteRef.current)) {
        dispatch(setAutoCompleteOpenAction(false));
      }
    };

    document.body.addEventListener('click', handleOutsideClick);

    return () => document.body.removeEventListener('click', handleOutsideClick);
  }, [isAutocompleteOpen]);

  return (
    <div ref={searchByIngrsRef} className="search__by-ingrs">
      <label htmlFor="search__by-ingrs-text-field" className="search__by-ingrs-label label">
        Ингредиенты
      </label>
      <div className="search__by-ingrs-input-container">
        <ul className="search__by-ingrs-ingrs-list">
          {addedIngrs.map((ingrt) => (
            <li key={ingrt._id} className="search__by-ingrs-ingrt">
              <span className="search__by-ingrs-ingrt-name">{ingrt.name}</span>
              <button
                onClick={() => onRemoveIngrt(ingrt._id)}
                className="search__by-ingrs-ingrt-btn">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M2.35352 1.64648L1.64648 2.35352L5.29297 6L1.64648 9.64648L2.35352 10.3535L6 6.70703L9.64648 10.3535L10.3535 9.64648L6.70703 6L10.3535 2.35352L9.64648 1.64648L6 5.29297L2.35352 1.64648Z"
                    fill="#027A48"
                  />
                </svg>
              </button>
            </li>
          ))}
          <li className="search__by-ingrs-list-input">
            <input
              autoComplete="off"
              ref={textFieldRef}
              onChange={handleTextFieldChange}
              value={textFieldValue}
              id="search__by-ingrs-text-field"
              className="search__by-ingrs-input"
              placeholder="Введите ингредиент"
              type="text"
            />
          </li>
        </ul>
        <ul
          ref={autocompleteRef}
          className={clsx(
            'search__autocomplete',
            isAutocompleteOpen && 'search__autocomplete--visible',
          )}>
          {autocompleteList.map((ingrt) => (
            <li
              onClick={() => handleAutocompleteItemClick(ingrt)}
              key={ingrt._id}
              className="search__autocomplete-item">
              <span className="search__autocomplete-text">{ingrt.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <label className="search__by-ingrs-checkbox-label">
        <input
          className="search__by-ingrs-checkbox"
          type="checkbox"
          name="pantryIgnore"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span className="search__by-ingrs-checkbox-text">
          Игнорировать типичные ингредиенты, такие как вода, соль, мука и т. д.
        </span>
      </label>
      <button
        onClick={handleFindBtnClick}
        className={clsx('search__by-ingrs-btn btn-primary', isLoading && 'btn-primary--disabled')}>
        Найти рецепты
      </button>
    </div>
  );
};
