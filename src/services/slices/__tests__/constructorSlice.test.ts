import reducer, {
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
  closeOrderModal,
  createOrder
} from "../constructorSlice";

const bun = {
  _id: "bun123",
  id: "bun123-1",
  name: "Булка",
  type: "bun",
  price: 100,
  image: "",
  image_large: "",
  image_mobile: "",
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0,
};

const ingredient = {
  ...bun,
  type: "main",
  id: "ing456-1"
};

const initialState = {
  constructorItems: { bun: null, ingredients: [] },
  orderRequest: false,
  orderModalData: null
};

describe("constructorSlice", () => {
  test("addBun", () => {
    const state = reducer(initialState, addBun(bun));
    expect(state.constructorItems.bun).toEqual(bun);
  });

  test("addIngredient", () => {
    const state = reducer(initialState, addIngredient(ingredient));
    expect(state.constructorItems.ingredients).toHaveLength(1);
  });

  test("removeIngredient", () => {
    const modified = reducer(initialState, addIngredient(ingredient));
    const state = reducer(modified, removeIngredient("ing456-1"));
    expect(state.constructorItems.ingredients).toHaveLength(0);
  });

  test("moveIngredient", () => {
    const stateWithTwo = {
      ...initialState,
      constructorItems: {
        bun: null,
        ingredients: [
          { ...ingredient, id: "1" },
          { ...ingredient, id: "2" },
        ],
      },
    };

    const state = reducer(
      stateWithTwo,
      moveIngredient({ fromIndex: 0, toIndex: 1 })
    );

    expect(state.constructorItems.ingredients[0].id).toBe("2");
    expect(state.constructorItems.ingredients[1].id).toBe("1");
  });

  test("clearConstructor", () => {
    const filled = {
      ...initialState,
      constructorItems: { bun, ingredients: [ingredient] }
    };

    const state = reducer(filled, clearConstructor());
    expect(state.constructorItems).toEqual({ bun: null, ingredients: [] });
  });

  test("createOrder.pending", () => {
    const action = { type: createOrder.pending.type };
    const state = reducer(initialState, action);
    expect(state.orderRequest).toBe(true);
  });

  test("createOrder.fulfilled", () => {
    const action = {
      type: createOrder.fulfilled.type,
      payload: { number: 100 }
    };
    const state = reducer(initialState, action);

    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toEqual({ number: 100 });
    expect(state.constructorItems.bun).toBe(null);
    expect(state.constructorItems.ingredients).toHaveLength(0);
  });

  test("createOrder.rejected", () => {
    const action = { type: createOrder.rejected.type };
    const state = reducer(initialState, action);
    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toBe(null);
  });
});
