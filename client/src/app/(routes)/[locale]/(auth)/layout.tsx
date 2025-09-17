import AuthLayout from '@/app/_layouts/AuthLayout';
import { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
};

const AuthPagesLayout: FC<Props> = ({ children, ...props }) => {
  return (
    <AuthLayout>
      {children}
    </AuthLayout>
  );
}

export default AuthPagesLayout;