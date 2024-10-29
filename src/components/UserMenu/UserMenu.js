import { useDispatch } from 'react-redux';
import { logOut } from 'redux/auth/operations';
import { useAuth } from 'hooks';
import css from './UserMenu.module.css';
import { Box } from '@chakra-ui/react';
import UserMobMenu from 'components/UserMobMenu/UserMobMenu';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  return (
    <>
      <UserMobMenu />
      <Box display={{ base: 'none', md: 'block' }}>
        <div className={css.wrapper}>
          <p className={css.username}>
            {user.name} ID: {user.userId}
          </p>
          <button
            type="button"
            className={css.link}
            onClick={() => dispatch(logOut())}
          >
            Log out
          </button>
        </div>
      </Box>
    </>
  );
};
