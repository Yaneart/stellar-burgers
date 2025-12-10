import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useDispatch } from '../../services/store';
import { TIngredient } from '@utils-types';
import { addBun, addIngredient } from '../../services/slices/constructorSlice';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const handleAdd = () => {
      if (ingredient.type === 'bun') {
        const bunWithId: TIngredient & { id: string } = {
          ...ingredient,
          id: `${ingredient._id}-${Date.now()}`
        };
        dispatch(addBun(bunWithId));
      } else {
        const ingredientWithId: TIngredient & { id: string } = {
          ...ingredient,
          id: `${ingredient._id}-${Date.now()}`
        };
        dispatch(addIngredient(ingredientWithId));
      }
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
