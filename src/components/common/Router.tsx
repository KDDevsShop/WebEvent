import AdminLayout from '@/layouts/AdminLayout';
import CustomerLayout from '@/layouts/CustomerLayout';
import EventListPage from '@/pages/client/EventListPage';
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

        <Route
          path='/events'
          element={
            <CustomerLayout>
              <EventListPage />
            </CustomerLayout>
          }
        />

        {/* Admin rotues */}

        <Route
          path='/admin'
          element={
            <AdminLayout>
              <HomePage />
            </AdminLayout>
          }
        />

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
