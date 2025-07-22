import AdminLayout from '@/layouts/AdminLayout';
import CustomerLayout from '@/layouts/CustomerLayout';
import EventListPage from '@/pages/client/EventListPage';
import HomePage from '@/pages/client/HomePage';
import RoomListAdmin from '@/pages/admin/RoomListAdmin';
import LoginPage from '@/pages/client/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegisterPage from '@/pages/client/RegisterPage';

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

        <Route
          path='/events'
          element={
            <CustomerLayout>
              <EventListPage />
            </CustomerLayout>
          }
        />

        {/* Login route */}
        <Route path='/login' element={<LoginPage />} />

        {/* Login route */}
        <Route path='/register' element={<RegisterPage />} />
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
          path='/admin/rooms'
          element={
            <AdminLayout>
              {/* RoomListAdmin will show the list of rooms */}
              <RoomListAdmin />
            </AdminLayout>
          }
        />

        <Route
          path='/admin/rooms'
          element={
            <AdminLayout>
              {/* RoomListAdmin will show the list of rooms */}
              <RoomListAdmin />
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
