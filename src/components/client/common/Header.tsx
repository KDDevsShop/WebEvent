import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='bg-gray-400 text-white py-6 shadow-md'>
      <div className='container mx-auto flex justify-between items-center'>
        {/* Logo */}
        <Link to={'/'} className='flex items-center'>
          <img src='/logo.png' alt='Logo' className='h-10' />
        </Link>

        {/* Navbar */}
        <nav className='flex space-x-8'>
          <Link to={'/'} className='text-white hover:text-primary'>
            Trang chủ
          </Link>
          <Link to={'about-us'} className='text-white hover:text-primary'>
            Giới thiệu
          </Link>
          <Link to={'event'} className='text-white hover:text-primary'>
            Sự kiện
          </Link>
          <Link to={'contact'} className='text-white hover:text-primary'>
            Liên hệ
          </Link>
        </nav>

        {/* Buttons */}
        <div className='flex space-x-4'>
          <Button
            color='primary'
            className='bg-primary px-4 py-2 rounded hover:bg-secondary'
          >
            Đăng nhập
          </Button>
          <Button className='bg-primary px-4 py-2 rounded hover:bg-secondary'>
            Tạo sự kiện
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
