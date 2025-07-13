import Footer from '@/components/client/common/Footer';
import Header from '@/components/client/common/Header';
import React, { type PropsWithChildren } from 'react';

const CustomerLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <main className='flex flex-col min-h-screen bg-gray-100 pb-24'>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default CustomerLayout;
