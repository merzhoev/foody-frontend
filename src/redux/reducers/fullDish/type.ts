interface IIngredient {
  _id: string;
  name: string;
  amount: string;
}

export interface IFullDish {
  _id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  categories: string[];
  ingredients: IIngredient[];
  steps: string[];
  readyInMinutes: number | null;
  servings: number | null;
}

export interface IFullDishState {
  dish: IFullDish | null;
  similarDishes: {
    dishes: IFullDish[];
    page: number;
    totalPages: number;
    isLoading: boolean;
  };
}

export enum FullDishTypes {
  SET_DISH = 'fullDish/SET_DISH',
  SET_SIMILAR_DISHES = 'fullDish/SET_SIMILAR_DISHES',
  CLEAR_SIMILAR_DISHES = 'fullDish/CLEAR_SIMILAR_DISHES',
  SET_PAGE = 'fullDish/SET_PAGE',
  SET_TOTAL_PAGES = 'fullDish/SET_TOTAL_PAGES',
  SET_LOADING = 'fullDish/SET_LOADING',
}

export interface ISetDishAction {
  type: FullDishTypes.SET_DISH;
  payload: IFullDish;
}

export interface ISetSimilarDishesAction {
  type: FullDishTypes.SET_SIMILAR_DISHES;
  payload: IFullDish[];
}

export interface IClearSimilarDishesAction {
  type: FullDishTypes.CLEAR_SIMILAR_DISHES;
}

export interface ISetPageAction {
  type: FullDishTypes.SET_PAGE;
  payload: number;
}

export interface ISetTotalPagesAction {
  type: FullDishTypes.SET_TOTAL_PAGES;
  payload: number;
}

export interface ISetLoadingAction {
  type: FullDishTypes.SET_LOADING;
  payload: boolean;
}

export type TFullDishActions =
  | ISetDishAction
  | ISetSimilarDishesAction
  | IClearSimilarDishesAction
  | ISetPageAction
  | ISetTotalPagesAction
  | ISetLoadingAction;
