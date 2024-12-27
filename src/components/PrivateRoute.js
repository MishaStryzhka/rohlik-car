import { Navigate, useSearchParams } from 'react-router-dom';
import { useAuth } from 'hooks';
import Loader from './Loader/Loader';

export const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
  const [searchParams] = useSearchParams();
  const { user, isLoggedIn, isRefreshing } = useAuth();
  const shouldRedirect = !isLoggedIn && !isRefreshing;

  if (isRefreshing) {
    return <Loader />;
  }

  if (user?.status === 'suspended') {
    return <Navigate to="/account-suspended" replace />;
  }

  return shouldRedirect ? (
    <Navigate to={redirectTo} state={{ filter: searchParams.get('filter') }} />
  ) : (
    Component
  );
};
