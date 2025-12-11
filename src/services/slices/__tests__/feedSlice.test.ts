import reducer, { fetchFeed, updateFeed } from "../feedSlice";

const mockOrder = {
  _id: "order1",
  number: 123,
  name: "Заказ",
  status: "done",
  ingredients: ["1", "2"],
  createdAt: "2025-01-01",
  updatedAt: "2025-01-01"
};

const feedData = {
  orders: [mockOrder],
  total: 100,
  totalToday: 20
};

const initialState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};

describe("feedSlice", () => {
  test("pending", () => {
    const state = reducer(initialState, { type: fetchFeed.pending.type });
    expect(state.loading).toBe(true);
  });

  test("fulfilled", () => {
    const state = reducer(initialState, {
      type: fetchFeed.fulfilled.type,
      payload: feedData
    });

    expect(state.orders).toEqual(feedData.orders);
  });

  test("rejected", () => {
    const action = {
      type: fetchFeed.rejected.type,
      error: { message: "Ошибка" }
    };
    const state = reducer(initialState, action);

    expect(state.error).toBe("Ошибка");
  });

  test("updateFeed", () => {
    const state = reducer(initialState, updateFeed(feedData));
    expect(state.orders.length).toBe(1);
  });
});
