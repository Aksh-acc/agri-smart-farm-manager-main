
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import LoginForm from '@/components/auth/LoginForm';

const Login: React.FC = () => {
  return (
    <PageLayout className="bg-gradient-to-b from-background to-muted/40">
      <LoginForm />
    </PageLayout>
  );
};

export default Login;
