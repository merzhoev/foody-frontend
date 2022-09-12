import { IFullDish } from './../fullDish/type';

export interface IAuthData {
  username: string;
  password: string;
}

export interface IUserData {
  _id: string;
  username: string;
  token: string;
  favorites: IFullDish[];
  createdAt: string;
  updatedAt: string;
}

export interface IError {
  message: string;
}

export interface IAuthState {
  data: IUserData | null;
  error: IError | null;
  isLoading: boolean;
}

export enum AuthTypes {
  SET_DATA = 'auth/SET_DATA',
  SET_ERROR = 'auth/SET_ERROR',
  SET_LOADING = 'auth/SET_LOADING',
}

export interface ISetDataAction {
  type: AuthTypes.SET_DATA;
  payload: IUserData | null;
}

export interface ISetErrorAction {
  type: AuthTypes.SET_ERROR;
  payload: IError | null;
}

export interface ISetLoadingAction {
  type: AuthTypes.SET_LOADING;
  payload: boolean;
}

export type TAuthActions = ISetDataAction | ISetErrorAction | ISetLoadingAction;
