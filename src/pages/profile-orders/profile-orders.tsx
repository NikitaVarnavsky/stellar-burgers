import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getOrdersUser,
  removeOrdersUser,
  selectOrdersUser
} from '../../services/slices/orderFeedUserSlice';
import { getIngredients } from '../../services/slices/ingredientsSlice';
import { getFeeds } from '../../services/slices/orderFeedSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(removeOrdersUser());
    Promise.all([
      dispatch(getIngredients()),
      dispatch(getOrdersUser()),
      dispatch(getFeeds())
    ]);
  }, []);
  const orders = useSelector(selectOrdersUser);

  return <ProfileOrdersUI orders={orders} />;
};
