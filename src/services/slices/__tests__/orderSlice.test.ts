import reducer, { fetchOrderByNumber, clearOrder } from "../orderSlice";

const mockOrder = {
  _id: "order1",
  number: 123,
  name: "Тестовый заказ",
  status: "done",
  ingredients: ["1", "2"],
  createdAt: "2024-01-01",
  updatedAt: "2024-01-01"
};

const initialState = {
  orderData: null,
  loading: false,
  error: null
};

describe("orderSlice", () => {
  test("pending", () => {
    const state = reducer(initialState, {
      type: fetchOrderByNumber.pending.type
    });
    expect(state.loading).toBe(true);
  });

  test("fulfilled", () => {
    const state = reducer(initialState, {
      type: fetchOrderByNumber.fulfilled.type,
      payload: mockOrder
    });

    expect(state.orderData).toEqual(mockOrder);
  });

  test("rejected", () => {
    const state = reducer(initialState, {
      type: fetchOrderByNumber.rejected.type,
      error: { message: "Ошибка" }
    });

    expect(state.error).toBe("Ошибка");
  });

  test("clearOrder", () => {
    const state = reducer(
      { ...initialState, orderData: mockOrder },
      clearOrder()
    );
    expect(state.orderData).toBe(null);
  });
});
