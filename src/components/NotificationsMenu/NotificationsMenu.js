import React, { useState, useEffect, useCallback } from 'react';

const NotificationsMenu = () => {
  const [permission, setPermission] = useState(Notification.permission);
  // eslint-disable-next-line no-unused-vars
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Welcome!', message: 'Thank you for visiting our site!' },
    { id: 2, title: 'New Feature', message: 'Check out our latest feature!' },
  ]);

  // Функція для запиту дозволу на сповіщення
  const requestPermission = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then(newPermission => {
        setPermission(newPermission);
        if (newPermission === 'granted') {
          alert('Дозвіл на сповіщення надано');
        } else if (newPermission === 'denied') {
          alert('Дозвіл на сповіщення відхилено');
        }
      });
    } else {
      alert('Ваш браузер не підтримує сповіщення');
    }
  };

  // Використання useCallback для уникнення повторного створення функції
  const sendNotification = useCallback(
    (title, message) => {
      if (permission === 'granted') {
        new Notification(title, {
          body: message,
          icon: '/path/to/icon.png', // Шлях до іконки (опційно)
        });
      }
    },
    [permission]
  );

  // Виклик сповіщень на основі списку notifications
  useEffect(() => {
    if (permission === 'granted') {
      notifications.forEach(notification => {
        sendNotification(notification.title, notification.message);
      });
    }
  }, [permission, notifications, sendNotification]);

  return (
    <div>
      <h2>Меню Сповіщень</h2>
      {permission === 'default' && (
        <button onClick={requestPermission}>
          Запитати дозвіл на сповіщення
        </button>
      )}
      {permission === 'granted' && (
        <div className="notifications-menu">
          <h3>Ваші сповіщення</h3>
          <ul>
            {notifications.map(notification => (
              <li key={notification.id}>
                <strong>{notification.title}</strong>: {notification.message}
              </li>
            ))}
          </ul>
        </div>
      )}
      {permission === 'denied' && (
        <p>
          Ви відхилили дозвіл на сповіщення. Щоб змінити налаштування,
          відвідайте налаштування браузера.
        </p>
      )}
    </div>
  );
};

export default NotificationsMenu;
