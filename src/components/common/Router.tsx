import CustomerLayout from '@/layouts/CustomerLayout';
import HomePage from '@/pages/client/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Router = () => {
  return (
    <BrowserRouter>
      {/* Customer rotues */}
      <Routes>
        <Route
          path='/'
          element={
            <CustomerLayout>
              <HomePage />
            </CustomerLayout>
          }
        />

        {/* Admin rotues */}

        <Route
          path='*'
          element={
            <div className='flex justify-center items-center h-screen'>404</div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
