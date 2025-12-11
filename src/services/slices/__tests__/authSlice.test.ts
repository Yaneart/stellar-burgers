import reducer, {
  loginUser,
  fetchUser,
  logoutUser,
  clearError
} from "../authSlice";

const initialState = {
  isAuthenticated: false,
  userChecked: false,
  user: null,
  loading: false,
  error: null
};

describe("authSlice", () => {
  test("login.pending", () => {
    const action = { type: loginUser.pending.type };
    const state = reducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  test("login.fulfilled", () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: { name: "User", email: "test@test.com" }
    };

    const state = reducer(initialState, action);

    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toEqual(action.payload);
  });

  test("login.rejected", () => {
    const action = {
      type: loginUser.rejected.type,
      error: { message: "Ошибка" }
    };

    const state = reducer(initialState, action);

    expect(state.error).toBe("Ошибка");
    expect(state.loading).toBe(false);
  });

  test("fetchUser.fulfilled", () => {
    const action = {
      type: fetchUser.fulfilled.type,
      payload: { name: "User" }
    };

    const state = reducer(initialState, action);

    expect(state.user).toEqual(action.payload);
    expect(state.isAuthenticated).toBe(true);
  });

  test("fetchUser.rejected", () => {
    const action = { type: fetchUser.rejected.type };
    const state = reducer(initialState, action);

    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBe(null);
  });

  test("logout.fulfilled", () => {
    const authenticated = {
      ...initialState,
      isAuthenticated: true,
      user: { name: "User", email: "test@test.com" }
    };

    const action = { type: logoutUser.fulfilled.type };
    const state = reducer(authenticated, action);

    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBe(null);
  });

  test("clearError", () => {
    const errorState = { ...initialState, error: "Ошибка" };
    const state = reducer(errorState, clearError());
    expect(state.error).toBe(null);
  });
});
