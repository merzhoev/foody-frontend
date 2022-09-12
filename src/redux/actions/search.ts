import axios from '../../axios';
import {
  SearchTypes,
  ISetCheckedAction,
  IAddIngrtAction,
  IIngredient,
  IRemoveIngrtAction,
  ISetAutocompleteAction,
  ISetAutocompleteOpenAction,
  ISetLoadingAction,
  TSearchActions,
  ISetDishNameAction,
} from './../reducers/search/types';
import { Dispatch } from 'redux';

export const addIngrtAction = (ingrt: IIngredient): IAddIngrtAction => ({
  type: SearchTypes.ADD_INGRT,
  payload: ingrt,
});

export const removeIngrtAction = (id: number): IRemoveIngrtAction => ({
  type: SearchTypes.REMOVE_INGRT,
  payload: id,
});

export const setAutoCompleteAction = (ingrts: IIngredient[]): ISetAutocompleteAction => ({
  type: SearchTypes.SET_AUTOCOMPLETE,
  payload: ingrts,
});

export const setDishNameAction = (dishName: string): ISetDishNameAction => ({
  type: SearchTypes.SET_DISH_NAME,
  payload: dishName,
});

export const setAutoCompleteOpenAction = (open: boolean): ISetAutocompleteOpenAction => ({
  type: SearchTypes.SET_AUTOCOMPLETE_OPEN,
  payload: open,
});

export const setCheckedAction = (checked: boolean): ISetCheckedAction => ({
  type: SearchTypes.SET_CHECKED,
  payload: checked,
});

export const setLoadingAction = (loading: boolean): ISetLoadingAction => ({
  type: SearchTypes.SET_LOADING,
  payload: loading,
});

export const fetchAutocomplete = (value: string) => async (dispatch: Dispatch<TSearchActions>) => {
  try {
    dispatch(setLoadingAction(true));
    const { data } = await axios.get(`/ingredients?query=${value}`);

    if (data.length) {
      dispatch(setAutoCompleteAction(data));
    }

    dispatch(setAutoCompleteOpenAction(!!data.length));
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setLoadingAction(false));
  }
};
