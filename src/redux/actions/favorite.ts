import axios from '../../axios';
import { Dispatch } from 'redux';
import {
  ISetFavoritesAction,
  FavoriteTypes,
  IAddFavoriteAction,
  IRemoveFavoriteAction,
  ISetLoadingAction,
  TFavoriteActions,
} from './../reducers/favorite/types';
import { IFullDish } from './../reducers/fullDish/type';

export const setFavoritesAction = (favorites: IFullDish[]): ISetFavoritesAction => ({
  type: FavoriteTypes.SET_FAVORITES,
  payload: favorites,
});

export const addFavoriteAction = (favorite: IFullDish): IAddFavoriteAction => ({
  type: FavoriteTypes.ADD_FAVORITE,
  payload: favorite,
});

export const removeFavoriteAction = (id: string): IRemoveFavoriteAction => ({
  type: FavoriteTypes.REMOVE_FAVORITE,
  payload: id,
});

export const setLoadingAction = (loading: boolean): ISetLoadingAction => ({
  type: FavoriteTypes.SET_LOADING,
  payload: loading,
});

export const fetchFavorites = () => async (dispatch: Dispatch<TFavoriteActions>) => {
  try {
    dispatch(setLoadingAction(true));
    const { data } = await axios.get<IFullDish[]>('favorites');

    dispatch(setFavoritesAction(data));
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setLoadingAction(false));
  }
};

export const fetchAddFavorite = (id: string) => async (dispatch: Dispatch<TFavoriteActions>) => {
  try {
    dispatch(setLoadingAction(true));
    const { data } = await axios.post<IFullDish>(`favorites/${id}`);

    dispatch(addFavoriteAction(data));
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setLoadingAction(false));
  }
};

export const fetchRemoveFavorite = (id: string) => async (dispatch: Dispatch<TFavoriteActions>) => {
  try {
    dispatch(setLoadingAction(true));
    await axios.delete(`favorites/${id}`);

    dispatch(removeFavoriteAction(id));
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setLoadingAction(false));
  }
};
