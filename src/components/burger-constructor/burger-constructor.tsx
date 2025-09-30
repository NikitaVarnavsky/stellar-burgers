import { FC, useMemo } from 'react';
import { TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';

import {
  closeOrderRequest,
  selectConstructorItems,
  selectOrderRequest,
  selectOrderUserModal
} from '../../services/slices/burgerConstructor';
import { selectUser } from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { addNewOrder } from '../../services/slices/burgerConstructor';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const constructorItems = useSelector(selectConstructorItems);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderUserModal);
  const user = useSelector(selectUser);

  const onOrderClick = () => {
    if (!user.name) {
      return navigate('/login', { replace: true });
    }
    if (constructorItems.bun?._id && constructorItems.ingredients.length) {
      const ingredientsIds = constructorItems.ingredients.map(
        (item) => item._id
      );
      dispatch(
        addNewOrder([
          constructorItems.bun._id,
          ...ingredientsIds,
          constructorItems.bun._id
        ])
      );
    }
    if (!constructorItems.bun || orderRequest) return;
  };
  const closeOrderModal = () => {
    dispatch(closeOrderRequest());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price! * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
