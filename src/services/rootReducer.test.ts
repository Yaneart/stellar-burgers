import authReducer from './slices/authSlice';
import ingredientsReducer from './slices/ingredientsSlice';
import constructorReducer from './slices/constructorSlice';
import feedReducer from './slices/feedSlice';
import orderReducer from './slices/orderSlice';
import userOrdersReducer from './slices/userOrdersSlice';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  auth: authReducer,
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  feed: feedReducer,
  order: orderReducer,
  userOrders: userOrdersReducer
});

describe('rootReducer initialization', () => {
  test('должен корректно инициализировать состояние', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toHaveProperty('auth');
    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('burgerConstructor');
    expect(state).toHaveProperty('feed');
    expect(state).toHaveProperty('order');
    expect(state).toHaveProperty('userOrders');

    expect(state.auth).toBeDefined();
    expect(state.ingredients).toBeDefined();
    expect(state.feed).toBeDefined();
  });
});
