import reducer, { fetchUserOrders } from "../userOrdersSlice";

const initialState = {
  orders: [],
  loading: false,
  error: null
};

describe("userOrdersSlice", () => {
  test("pending", () => {
    const action = { type: fetchUserOrders.pending.type };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(true);
  });

  test("fulfilled", () => {
    const payload = [{ number: 1 }];

    const action = {
      type: fetchUserOrders.fulfilled.type,
      payload
    };

    const state = reducer(initialState, action);

    expect(state.orders).toEqual(payload);
    expect(state.loading).toBe(false);
  });

  test("rejected", () => {
    const action = {
      type: fetchUserOrders.rejected.type,
      error: { message: "Ошибка" }
    };

    const state = reducer(initialState, action);

    expect(state.error).toBe("Ошибка");
    expect(state.orders.length).toBe(0);
  });
});
