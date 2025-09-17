import React, { FC, ReactNode } from 'react'
import AuthContainer from '../_components/AuthContainer';

const AuthLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <AuthContainer direction="column" justifyContent="space-between">
      {children}
    </AuthContainer>
  )
}

export default AuthLayout;