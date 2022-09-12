import { IClearSimilarDishesAction } from './../reducers/fullDish/type';
import { Dispatch } from 'redux';
import axios from '../../axios';
import {
  FullDishTypes,
  IFullDish,
  TFullDishActions,
  ISetDishAction,
  ISetSimilarDishesAction,
  ISetPageAction,
  ISetTotalPagesAction,
  ISetLoadingAction,
} from '../reducers/fullDish/type';

export const setDishAction = (dish: IFullDish): ISetDishAction => ({
  type: FullDishTypes.SET_DISH,
  payload: dish,
});

export const setSimilarDishesAction = (dishes: IFullDish[]): ISetSimilarDishesAction => ({
  type: FullDishTypes.SET_SIMILAR_DISHES,
  payload: dishes,
});

export const clearSimilarDishesAction = (): IClearSimilarDishesAction => ({
  type: FullDishTypes.CLEAR_SIMILAR_DISHES,
});

export const setPageAction = (page: number): ISetPageAction => ({
  type: FullDishTypes.SET_PAGE,
  payload: page,
});

export const setTotalPagesAction = (page: number): ISetTotalPagesAction => ({
  type: FullDishTypes.SET_TOTAL_PAGES,
  payload: page,
});

export const setLoadingAction = (loading: boolean): ISetLoadingAction => ({
  type: FullDishTypes.SET_LOADING,
  payload: loading,
});

export const fetchSimilarDishes =
  (id: string | undefined, categories: string[], page: number = 1) =>
  async (dispatch: Dispatch<TFullDishActions>) => {
    try {
      dispatch(setLoadingAction(true));
      const { data } = await axios.get(`/dishes-similar?page=${page}`, {
        params: {
          id,
          categories,
        },
      });

      dispatch(setPageAction(page));
      dispatch(setSimilarDishesAction(data.dishes));
      dispatch(setTotalPagesAction(data.totalPages));
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoadingAction(false));
    }
  };

export const fetchFullDish = (id: string | undefined) => async (dispatch: any) => {
  try {
    const { data } = await axios.get<IFullDish>(`/dishes/${id}`);

    dispatch(setDishAction(data));

    dispatch(setPageAction(0));
    dispatch(setTotalPagesAction(0));
    dispatch(clearSimilarDishesAction());
    dispatch(fetchSimilarDishes(id, data.categories));
  } catch (err) {
    console.log(err);

    window.location.href = '/not-found';
  }
};
