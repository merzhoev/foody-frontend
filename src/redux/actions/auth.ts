import axios from '../../axios';
import { Dispatch } from 'redux';
import {
  AuthTypes,
  IUserData,
  IError,
  ISetDataAction,
  ISetErrorAction,
  ISetLoadingAction,
  TAuthActions,
  IAuthData,
} from './../reducers/auth/types';

export const setDataAction = (data: IUserData | null): ISetDataAction => ({
  type: AuthTypes.SET_DATA,
  payload: data,
});

export const setErrorAction = (error: IError | null): ISetErrorAction => ({
  type: AuthTypes.SET_ERROR,
  payload: error,
});

export const setLoadingAction = (loading: boolean): ISetLoadingAction => ({
  type: AuthTypes.SET_LOADING,
  payload: loading,
});

export const fetchLogin = (values: IAuthData) => async (dispatch: Dispatch<TAuthActions>) => {
  try {
    dispatch(setLoadingAction(true));
    const { data } = await axios.post<IUserData>('auth/login', values);

    window.localStorage.setItem('token', data.token);

    dispatch(setErrorAction(null));
    dispatch(setDataAction(data));
  } catch (err: any) {
    const error = err.response.data as IError;
    dispatch(setErrorAction(error));
  } finally {
    dispatch(setLoadingAction(false));
  }
};

export const fetchRegister = (values: IAuthData) => async (dispatch: Dispatch<TAuthActions>) => {
  try {
    dispatch(setLoadingAction(true));
    const { data } = await axios.post<IUserData>('auth/register', values);

    window.localStorage.setItem('token', data.token);

    dispatch(setErrorAction(null));
    dispatch(setDataAction(data));
  } catch (err: any) {
    const error = err.response.data as IError;
    dispatch(setErrorAction(error));
  } finally {
    dispatch(setLoadingAction(false));
  }
};

export const fetchMe = () => async (dispatch: Dispatch<TAuthActions>) => {
  try {
    dispatch(setLoadingAction(true));
    const { data } = await axios.get<IUserData>('auth/me');

    dispatch(setDataAction(data));
  } catch (err: any) {
    const error = err.response.data as IError;
    console.log(error);
  } finally {
    dispatch(setLoadingAction(false));
  }
};

export const logout = () => {
  window.localStorage.removeItem('token');

  return setDataAction(null);
};
