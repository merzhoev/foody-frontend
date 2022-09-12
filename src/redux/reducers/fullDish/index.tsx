import { IFullDishState, TFullDishActions, FullDishTypes } from './type';

const initialState: IFullDishState = {
  dish: null,
  similarDishes: {
    dishes: [],
    page: 0,
    totalPages: 0,
    isLoading: false,
  },
};

export const fullDishReducer = (state = initialState, action: TFullDishActions) => {
  switch (action.type) {
    case FullDishTypes.SET_DISH:
      return {
        ...state,
        dish: action.payload,
      };
    case FullDishTypes.SET_SIMILAR_DISHES:
      return {
        ...state,
        similarDishes: {
          ...state.similarDishes,
          dishes: [...state.similarDishes.dishes, ...action.payload],
        },
      };
    case FullDishTypes.CLEAR_SIMILAR_DISHES:
      return {
        ...state,
        similarDishes: {
          ...state.similarDishes,
          dishes: [],
        },
      };
    case FullDishTypes.SET_PAGE:
      return {
        ...state,
        similarDishes: {
          ...state.similarDishes,
          page: action.payload,
        },
      };
    case FullDishTypes.SET_TOTAL_PAGES:
      return {
        ...state,
        similarDishes: {
          ...state.similarDishes,
          totalPages: action.payload,
        },
      };
    case FullDishTypes.SET_LOADING:
      return {
        ...state,
        similarDishes: {
          ...state.similarDishes,
          isLoading: action.payload,
        },
      };
    default:
      return state;
  }
};
