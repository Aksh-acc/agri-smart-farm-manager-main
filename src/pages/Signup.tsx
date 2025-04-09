
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import SignupForm from '@/components/auth/SignupForm';

const Signup: React.FC = () => {
  return (
    <PageLayout className="bg-gradient-to-b from-background to-muted/40">
      <SignupForm />
    </PageLayout>
  );
};

export default Signup;
