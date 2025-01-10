import React from 'react';
import PasswordRecoveryProvider from './PasswordRecovery/PasswordRecoveryProvider';

const Providers = ({ children }) => {
  return <PasswordRecoveryProvider>{children}</PasswordRecoveryProvider>;
};

export default Providers;
