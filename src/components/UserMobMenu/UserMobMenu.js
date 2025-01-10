import { IconButton, Box, VStack, useDisclosure } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { FaUser } from 'react-icons/fa';
import { useAuth } from 'hooks';
import { useDispatch } from 'react-redux';
import { logOut } from 'redux/auth/operations';
import css from './UserMobMenu.module.css';
import { useEffect, useRef, useState } from 'react';
import { MdNotifications } from 'react-icons/md';
import MenuNotifications from 'components/MenuNotifications/MenuNotifications';
import Count from 'components/Count/Count';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/config';

const UserMobMenu = () => {
  const { user } = useAuth();

  // ====== unreadNotificationsCout ======
  const [unreadNotificationsCout, setUnreadNotificationsCout] = useState(0);
  useEffect(() => {
    const notificationsCollection = collection(db, 'notifications');

    const unsubscribe = onSnapshot(notificationsCollection, snapshot => {
      const notificationsData = [];
      snapshot.docs.forEach(doc => {
        if (user.uid === doc.data().userId && !doc.data().isRead) {
          notificationsData.push({ id: doc.id, ...doc.data() });
        }
      });

      setUnreadNotificationsCout(notificationsData.length);
    });

    return () => unsubscribe();
  }, [user.uid]);

  // ========================================

  const [isOpenMenuNotifications, setIsOpenMenuNotifications] = useState(false);
  const toggleMenuNotifications = () => {
    isOpenMenuNotifications
      ? setIsOpenMenuNotifications(false)
      : setIsOpenMenuNotifications(true);
  };
  const userMenuNotificationsRef = useRef();
  const userMenuNotificationsButtonRef = useRef();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toggleMenu = () => (isOpen ? onClose() : onOpen());
  const dispatch = useDispatch();
  const userMenuRef = useRef();

  useEffect(() => {
    const handleClickOutside = event => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        userMenuNotificationsRef.current &&
        !userMenuNotificationsRef.current.contains(event.target) &&
        !userMenuNotificationsButtonRef.current.contains(event.target)
      ) {
        setIsOpenMenuNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <Box display={{ base: 'flex', md: 'none' }} ref={userMenuRef}>
      <IconButton
        icon={
          isOpen ? (
            <CloseIcon size="16px" />
          ) : (
            <FaUser size="16px" color="#6da305" />
          )
        }
        onClick={toggleMenu}
        variant="ghost"
        aria-label="Open Menu"
      />

      <Count count={unreadNotificationsCout}>
        <IconButton
          ref={userMenuNotificationsButtonRef}
          icon={<MdNotifications size="22px" color="#6da305" />}
          onClick={toggleMenuNotifications}
          variant="ghost"
          aria-label="Open Menu"
        />
      </Count>

      {/* Меню Notifications */}
      {isOpenMenuNotifications && (
        <MenuNotifications
          ref={userMenuNotificationsRef}
          onClose={() => setIsOpenMenuNotifications(false)}
        />
      )}

      {/* Меню */}
      {isOpen && (
        <Box
          position="absolute"
          top="60px"
          left="0"
          width="100%"
          bg="white"
          zIndex="overlay"
          boxShadow="md"
          ref={userMenuRef}
        >
          <VStack align="start" spacing={4} p={4}>
            <p>ID: {user.userId}</p>
            <p>
              {user.surname} {user.name}
            </p>
            <p>{user.email}</p>
            <button
              type="button"
              className={css.link}
              onClick={() => dispatch(logOut())}
            >
              Odhlásit se
            </button>
          </VStack>
        </Box>
      )}
    </Box>
  );
};

export default UserMobMenu;
