import { useEffect, lazy } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import { PrivateRoute } from './PrivateRoute';
import { RestrictedRoute } from './RestrictedRoute';
import { refreshUser } from 'redux/auth/operations';
import { useAuth } from 'hooks';
import { RingLoader } from 'react-spinners';

const HomePage = lazy(() => import('../pages/Home'));
const RegisterPage = lazy(() => import('../pages/Register'));
const LoginPage = lazy(() => import('../pages/Login'));
const CarsPage = lazy(() => import('../pages/Cars'));

export const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <RingLoader
        color={'#6da305'}
        loading={true}
        size={70}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  ) : (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route
          path="/register"
          element={
            <RestrictedRoute redirectTo="/cars" component={<RegisterPage />} />
          }
        />
        <Route
          path="/login"
          element={
            <RestrictedRoute redirectTo="/cars" component={<LoginPage />} />
          }
        />
        <Route
          path="/cars"
          element={
            <PrivateRoute redirectTo="/login" component={<CarsPage />} />
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
