import { useSelector } from 'react-redux';
import {
  selectUser,
  selectIsLoggedIn,
  selectIsRefreshing,
  selectError,
  selectIsLoading,
} from 'redux/auth/selectors';

export const useAuth = () => {
  const isLoading = useSelector(selectIsLoading);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const user = useSelector(selectUser);
  const error = useSelector(selectError);

  return {
    isLoading,
    isLoggedIn,
    isRefreshing,
    user,
    error,
  };
};
