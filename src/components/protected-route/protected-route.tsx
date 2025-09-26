import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router-dom';
import {
  selectIsAuthChecked,
  selectUser
} from '../../services/slices/userSlice';
import { useSelector } from '../../services/store';

type ProtectedRoute = {
  component: React.ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({
  component,
  onlyUnAuth = false
}: ProtectedRoute): React.JSX.Element => {
  const user = useSelector(selectUser);
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const location = useLocation();
  if (!isAuthChecked) {
    return <Preloader />;
  }
  if (!onlyUnAuth && !user.name) {
    return <Navigate to='/login' state={{ from: location }} />;
  }
  if (onlyUnAuth && user.name) {
    const { from } = location.state ?? { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }
  return component;
};
