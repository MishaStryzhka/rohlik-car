import { NavLink } from 'react-router-dom';
import { useAuth } from 'hooks';
import css from './Navigation.module.css';
import MobMenu from 'components/MobMenu/MobMenu';
import { Box, IconButton, useDisclosure } from '@chakra-ui/react';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';

export const Navigation = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toggleMenu = () => (isOpen ? onClose() : onOpen());
  const { isLoggedIn, user } = useAuth();

  return (
    <>
      <MobMenu isOpen={isOpen} onClose={onClose} />
      <nav style={{ display: 'flex', alignItems: 'center' }}>
        <IconButton
          display={{ base: 'block', xl: 'none' }}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          onClick={toggleMenu}
          variant="ghost"
          aria-label="Open Menu"
        />
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

            <NavLink
              className={({ isActive }) =>
                `${css.link} ${isActive ? css.active : ''}`
              }
              to="/packagings"
            >
              Vratné obaly
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `${css.link} ${isActive ? css.active : ''}`
              }
              to="/faq"
            >
              FAQ
            </NavLink>
          </Box>
        )}
      </nav>
    </>
  );
};
