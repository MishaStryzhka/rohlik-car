import { useEffect, lazy } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import { PrivateRoute } from './PrivateRoute';
import { RestrictedRoute } from './RestrictedRoute';
import { refreshUser } from 'redux/auth/operations';
import { useAuth } from 'hooks';
import NotFound from 'pages/NotFound';
import BarCode from 'pages/BarCode';
import Loader from './Loader/Loader';
import CarPage from 'pages/Car';
import FAQ from 'pages/Faq';
import ReturnablePackaging from 'pages/ReturnablePackaging';
import OneReturnablePackaging from 'pages/OneReturnablePackaging';

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
    <Loader />
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
        >
          <Route
            path=":carId"
            element={
              <PrivateRoute redirectTo="/login" component={<CarPage />} />
            }
          />
        </Route>

        <Route
          path="/bar-code"
          element={<PrivateRoute redirectTo="/login" component={<BarCode />} />}
        />
        <Route
          path="/packagings"
          element={
            <PrivateRoute
              redirectTo="/login"
              component={<ReturnablePackaging />}
            />
          }
        />
        <Route
          path="/packaging/:packagingId"
          element={
            <PrivateRoute
              redirectTo="/login"
              component={<OneReturnablePackaging />}
            />
          }
        />
        <Route
          path="/faq"
          element={<PrivateRoute redirectTo="/login" component={<FAQ />} />}
        />
        <Route path="*" component={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
