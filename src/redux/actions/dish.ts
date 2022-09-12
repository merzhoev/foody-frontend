import axios from '../../axios';
import { Dispatch } from 'redux';
import { TRootState } from '../store';
import {
  IDish,
  DishTypes,
  ISetDishesAction,
  ISetPageAction,
  ISetTotalPagesAction,
  ISetLoadingAction,
  TDishActions,
  ISetFindByAction,
} from './../reducers/dish/types';

export const setDishesAction = (dishes: IDish[]): ISetDishesAction => ({
  type: DishTypes.SET_DISHES,
  payload: dishes,
});

export const setFindByAction = (findBy: string): ISetFindByAction => ({
  type: DishTypes.SET_FIND_BY,
  payload: findBy,
});

export const setPageAction = (page: number): ISetPageAction => ({
  type: DishTypes.SET_PAGE,
  payload: page,
});

export const setTotalPagesAction = (totalPages: number): ISetTotalPagesAction => ({
  type: DishTypes.SET_TOTAL_PAGES,
  payload: totalPages,
});

export const setLoadingAction = (loading: boolean): ISetLoadingAction => ({
  type: DishTypes.SET_LOADING,
  payload: loading,
});

export const fetchDishesByIngrts =
  (page: number = 1) =>
  async (dispatch: Dispatch<TDishActions>, getState: () => TRootState) => {
    try {
      const { search } = getState();
      const ingrts = search.addedIngrs.map(({ name }) => name).join();
      const ignorePantry = search.isChecked;

      dispatch(setLoadingAction(true));
      const { data } = await axios.get(
        `/dishes-by-ingrts?page=${page}&ingredients=${ingrts}&ignorePantry=${ignorePantry}`,
      );
      const { dishes, totalPages } = data;

      dispatch(setPageAction(page));
      dispatch(setTotalPagesAction(totalPages));
      dispatch(setDishesAction(dishes));
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoadingAction(false));
    }
  };

export const fetchDishesByName =
  (page: number = 1) =>
  async (dispatch: Dispatch<TDishActions>, getState: () => TRootState) => {
    try {
      const { dishName } = getState().search;

      dispatch(setLoadingAction(true));
      const { data } = await axios.get(`/dishes-by-name?title=${dishName}&page=${page}`);
      const { dishes, totalPages } = data;

      dispatch(setPageAction(page));
      dispatch(setTotalPagesAction(totalPages));
      dispatch(setDishesAction(dishes));
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoadingAction(false));
    }
  };
