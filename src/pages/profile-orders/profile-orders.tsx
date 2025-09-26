import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getOrdersUser,
  removeOrdersUser,
  selectOrdersUser
} from '../../services/slices/orderFeedUserSlice';
import { getIngredients } from '../../services/slices/ingredientsSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(removeOrdersUser());
    Promise.all([dispatch(getIngredients()), dispatch(getOrdersUser())]);
  }, []);
  const orders = useSelector(selectOrdersUser);

  return <ProfileOrdersUI orders={orders} />;
};
