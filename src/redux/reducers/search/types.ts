export interface IIngredient {
  _id: number;
  name: string;
}

export interface ISearchState {
  addedIngrs: IIngredient[];
  autocompleteList: IIngredient[];
  dishName: string;
  isAutocompleteOpen: boolean;
  isChecked: boolean;
  isLoading: boolean;
}

export enum SearchTypes {
  ADD_INGRT = 'search/ADD_INGRT',
  REMOVE_INGRT = 'search/REMOVE_INGRT',
  SET_AUTOCOMPLETE = 'search/SET_AUTOCOMPLETE',
  SET_DISH_NAME = 'search/SET_DISH_NAME',
  SET_AUTOCOMPLETE_OPEN = 'search/SET_AUTOCOMPLETE_OPEN',
  SET_CHECKED = 'search/SET_CHECKED',
  SET_LOADING = 'search/SET_LOADING',
}

export interface IAddIngrtAction {
  type: SearchTypes.ADD_INGRT;
  payload: IIngredient;
}

export interface IRemoveIngrtAction {
  type: SearchTypes.REMOVE_INGRT;
  payload: number;
}

export interface ISetAutocompleteAction {
  type: SearchTypes.SET_AUTOCOMPLETE;
  payload: IIngredient[];
}

export interface ISetDishNameAction {
  type: SearchTypes.SET_DISH_NAME;
  payload: string;
}

export interface ISetAutocompleteOpenAction {
  type: SearchTypes.SET_AUTOCOMPLETE_OPEN;
  payload: boolean;
}

export interface ISetCheckedAction {
  type: SearchTypes.SET_CHECKED;
  payload: boolean;
}

export interface ISetLoadingAction {
  type: SearchTypes.SET_LOADING;
  payload: boolean;
}

export type TSearchActions =
  | IAddIngrtAction
  | IRemoveIngrtAction
  | ISetAutocompleteAction
  | ISetDishNameAction
  | ISetAutocompleteOpenAction
  | ISetCheckedAction
  | ISetLoadingAction;
