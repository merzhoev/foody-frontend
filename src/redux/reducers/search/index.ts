import { ISearchState, TSearchActions, SearchTypes } from './types';

const initialState: ISearchState = {
  addedIngrs: [],
  autocompleteList: [],
  dishName: '',
  isAutocompleteOpen: false,
  isChecked: true,
  isLoading: false,
};

export const searchReducer = (state = initialState, action: TSearchActions) => {
  switch (action.type) {
    case SearchTypes.ADD_INGRT:
      return {
        ...state,
        addedIngrs: [...state.addedIngrs, action.payload],
      };
    case SearchTypes.REMOVE_INGRT:
      return {
        ...state,
        addedIngrs: state.addedIngrs.filter(({ _id }) => _id !== action.payload),
      };
    case SearchTypes.SET_AUTOCOMPLETE:
      return {
        ...state,
        autocompleteList: action.payload,
      };
    case SearchTypes.SET_DISH_NAME:
      return {
        ...state,
        dishName: action.payload,
      };
    case SearchTypes.SET_AUTOCOMPLETE_OPEN:
      return {
        ...state,
        isAutocompleteOpen: action.payload,
      };
    case SearchTypes.SET_CHECKED:
      return {
        ...state,
        isChecked: action.payload,
      };
    case SearchTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};
