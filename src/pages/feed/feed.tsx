import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getIngredients } from '../../services/slices/ingredientsSlice';
import {
  selectOrders,
  getFeeds,
  removeOrders
} from '../../services/slices/orderFeedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(selectOrders);
  useEffect(() => {
    Promise.all([dispatch(getFeeds()), dispatch(getIngredients())]);
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(removeOrders());
        dispatch(getFeeds());
      }}
    />
  );
};
