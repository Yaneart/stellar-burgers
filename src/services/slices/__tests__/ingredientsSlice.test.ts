import reducer, {
  fetchIngredients,
  setCurrentIngredient,
  clearCurrentIngredient
} from "../ingredientsSlice";

const ingredient = {
  _id: "123",
  name: "Булка",
  type: "bun",
  image: "",
  image_large: "",
  image_mobile: "",
  calories: 0,
  fat: 0,
  proteins: 0,
  carbohydrates: 0,
  price: 100
};

const initialState = {
  items: [],
  loading: false,
  error: null,
  currentIngredient: null
};

describe("ingredientsSlice", () => {
  test("pending → loading = true", () => {
    const action = { type: fetchIngredients.pending.type };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(true);
  });

  test("fulfilled → сохраняет данные", () => {
    const payload = [ingredient];

    const action = {
      type: fetchIngredients.fulfilled.type,
      payload
    };

    const state = reducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.items).toEqual(payload);
  });

  test("rejected → ошибка", () => {
    const action = {
      type: fetchIngredients.rejected.type,
      error: { message: "Ошибка" }
    };

    const state = reducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe("Ошибка");
  });

  test("установка текущего ингредиента", () => {
    const state = reducer(initialState, setCurrentIngredient(ingredient));
    expect(state.currentIngredient).toEqual(ingredient);
  });

  test("очистка текущего ингредиента", () => {
    const filled = { ...initialState, currentIngredient: ingredient };
    const state = reducer(filled, clearCurrentIngredient());
    expect(state.currentIngredient).toBe(null);
  });
});
