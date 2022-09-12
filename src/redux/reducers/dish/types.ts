export interface IDish {
  _id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  categories: string[];
}

export interface IDishState {
  dishes: IDish[];
  findBy: string;
  page: number;
  totalPages: number;
  isLoading: boolean;
}

export enum DishTypes {
  SET_DISHES = 'dish/SET_DISHES',
  SET_FIND_BY = 'dish/SET_FIND_BY',
  SET_PAGE = 'dish/SET_PAGE',
  SET_TOTAL_PAGES = 'dish/SET_TOTAL_PAGES',
  SET_LOADING = 'dish/SET_LOADING',
}

export interface ISetDishesAction {
  type: DishTypes.SET_DISHES;
  payload: IDish[];
}

export interface ISetFindByAction {
  type: DishTypes.SET_FIND_BY;
  payload: string;
}

export interface ISetPageAction {
  type: DishTypes.SET_PAGE;
  payload: number;
}

export interface ISetTotalPagesAction {
  type: DishTypes.SET_TOTAL_PAGES;
  payload: number;
}

export interface ISetLoadingAction {
  type: DishTypes.SET_LOADING;
  payload: boolean;
}

export type TDishActions =
  | ISetDishesAction
  | ISetFindByAction
  | ISetPageAction
  | ISetTotalPagesAction
  | ISetLoadingAction;
