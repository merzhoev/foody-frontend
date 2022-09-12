import { combineReducers, createStore, applyMiddleware } from 'redux';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, { ThunkDispatch } from 'redux-thunk';

import { dishReducer } from './reducers/dish/index';
import { searchReducer } from './reducers/search';
import { fullDishReducer } from './reducers/fullDish/index';
import { favoriteReducer } from './reducers/favorite';
import { authReducer } from './reducers/auth';

const rootReducer = combineReducers({
  search: searchReducer,
  dish: dishReducer,
  fullDish: fullDishReducer,
  favorite: favoriteReducer,
  auth: authReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export type TRootState = ReturnType<typeof rootReducer>;
export type TRootActions = ReturnType<typeof store.dispatch>;
export type AppDispatch = ThunkDispatch<TRootState, any, TRootActions>;

export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
