import { DishTypes, IDishState, TDishActions } from './types';

const initialState: IDishState = {
  dishes: [],
  findBy: '',
  page: 0,
  totalPages: 0,
  isLoading: false,
};

export const dishReducer = (state = initialState, action: TDishActions) => {
  switch (action.type) {
    case DishTypes.SET_DISHES:
      return {
        ...state,
        dishes: action.payload,
      };
    case DishTypes.SET_FIND_BY:
      return {
        ...state,
        findBy: action.payload,
      };
    case DishTypes.SET_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    case DishTypes.SET_TOTAL_PAGES:
      return {
        ...state,
        totalPages: action.payload,
      };
    case DishTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};
