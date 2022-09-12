import { IFullDish } from '../fullDish/type';

export interface IFavoriteState {
  favorites: IFullDish[];
  isLoading: boolean;
}

export enum FavoriteTypes {
  SET_FAVORITES = 'favorites/SET_FAVORITES',
  ADD_FAVORITE = 'favorites/ADD_FAVORITE',
  REMOVE_FAVORITE = 'favorites/REMOVE_FAVORITE',
  SET_LOADING = 'favorites/SET_LOADING',
}

export interface ISetFavoritesAction {
  type: FavoriteTypes.SET_FAVORITES;
  payload: IFullDish[];
}

export interface IAddFavoriteAction {
  type: FavoriteTypes.ADD_FAVORITE;
  payload: IFullDish;
}

export interface IRemoveFavoriteAction {
  type: FavoriteTypes.REMOVE_FAVORITE;
  payload: string;
}

export interface ISetLoadingAction {
  type: FavoriteTypes.SET_LOADING;
  payload: boolean;
}

export type TFavoriteActions =
  | ISetFavoritesAction
  | IAddFavoriteAction
  | IRemoveFavoriteAction
  | ISetLoadingAction;
