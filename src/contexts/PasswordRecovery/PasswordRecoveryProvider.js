import { PaswordRecoveryContext } from './PaswordRecoveryContext';

const { useState } = require('react');

const PasswordRecoveryProvider = ({ children }) => {
  const [isOpenModalRecoverPassword, setIsOpenModalRecoverPassword] =
    useState(false);
  return (
    <PaswordRecoveryContext.Provider
      value={{ isOpenModalRecoverPassword, setIsOpenModalRecoverPassword }}
    >
      {children}
    </PaswordRecoveryContext.Provider>
  );
};

export default PasswordRecoveryProvider;
