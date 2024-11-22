import { NavLink } from 'react-router-dom';
import { useAuth } from 'hooks';
import css from './Navigation.module.css';
import MobMenu from 'components/MobMenu/MobMenu';
import { Box } from '@chakra-ui/react';

export const Navigation = () => {
  const { isLoggedIn, user } = useAuth();

  return (
    <nav style={{ display: 'flex', alignItems: 'center' }}>
      <MobMenu />
      <NavLink
        className={({ isActive }) =>
          `${css.link} ${isActive ? css.active : ''}`
        }
        to="/"
      >
        Help-Book
      </NavLink>
      {isLoggedIn && (
        <Box display={{ base: 'none', md: 'block' }}>
          <NavLink
            className={({ isActive }) =>
              `${css.link} ${isActive ? css.active : ''}`
            }
            to="/cars"
          >
            Cars
          </NavLink>
          {(user?.role === 'VIP' || user?.role === 'dev') && (
            <NavLink
              className={({ isActive }) =>
                `${css.link} ${isActive ? css.active : ''}`
              }
              to="/bar-code"
            >
              BarCode
            </NavLink>
          )}
          {(user?.role === 'VIP' || user?.role === 'dev') && (
            <NavLink
              className={({ isActive }) =>
                `${css.link} ${isActive ? css.active : ''}`
              }
              to="/faq"
            >
              FAQ
            </NavLink>
          )}
        </Box>
      )}
    </nav>
  );
};
