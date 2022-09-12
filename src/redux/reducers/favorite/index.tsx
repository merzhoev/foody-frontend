import { TFavoriteActions, FavoriteTypes, IFavoriteState } from './types';

const initialState: IFavoriteState = {
  favorites: [],
  isLoading: false,
};

export const favoriteReducer = (state = initialState, action: TFavoriteActions) => {
  switch (action.type) {
    case FavoriteTypes.SET_FAVORITES:
      return {
        ...state,
        favorites: action.payload,
      };
    case FavoriteTypes.ADD_FAVORITE:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case FavoriteTypes.REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter(({ _id }) => _id !== action.payload),
      };
    case FavoriteTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};
