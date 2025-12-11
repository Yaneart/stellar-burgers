import store, { RootState } from './store';

describe('rootReducer initialization', () => {
  test('Инициализация стор', () => {
    const state: RootState = store.getState();

    expect(state).toHaveProperty('auth');
    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('burgerConstructor');
    expect(state).toHaveProperty('feed');
    expect(state).toHaveProperty('order');
    expect(state).toHaveProperty('userOrders');
  });
});
