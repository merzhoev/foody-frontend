import { TRootState } from './../../store';
import { AuthTypes, IAuthState, TAuthActions } from './types';

const initialState: IAuthState = {
  data: null,
  error: null,
  isLoading: false,
};

export const authReducer = (state = initialState, action: TAuthActions) => {
  switch (action.type) {
    case AuthTypes.SET_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case AuthTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case AuthTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export const selectIsAuth = (state: TRootState) => Boolean(state.auth.data);
