import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<{
    name?: string;
    avatar?: string;
  } | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      // You can also get user info from localStorage or decode from token
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          setUserInfo(JSON.parse(userData));
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }
    }
  }, []);

  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('user');
  //   setIsLoggedIn(false);
  //   setUserInfo(null);
  //   // Optionally redirect to home page
  //   window.location.href = '/';
  // };

  return (
    <header className="bg-gray-300 text-white py-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to={'/'} className="flex items-center">
          <img src="/logo.png" alt="Logo" className="h-10" />
        </Link>

        {/* Navbar */}
        <nav className="flex space-x-8">
          <Link to={'/'} className="text-white hover:text-primary">
            Trang chủ
          </Link>
          <Link to={'/about-us'} className="text-white hover:text-primary">
            Giới thiệu
          </Link>
          <Link to={'/events'} className="text-white hover:text-primary">
            Sự kiện
          </Link>
          <Link to={'/contact'} className="text-white hover:text-primary">
            Liên hệ
          </Link>
        </nav>

        {/* Buttons */}
        <div className="flex space-x-4 items-center">
          <Button className="bg-primary px-4 py-2 rounded hover:bg-secondary">
            Tạo sự kiện
          </Button>

          {!isLoggedIn ? (
            <Button
              onClick={() => navigate('/login')}
              color="primary"
              className="bg-primary px-4 py-2 rounded hover:bg-secondary"
            >
              Đăng nhập
            </Button>
          ) : (
            <div className="flex items-center space-x-2 cursor-pointer">
              {/* User Avatar */}
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center overflow-hidden">
                {userInfo?.avatar ? (
                  <img
                    src={userInfo.avatar}
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white font-semibold text-sm">
                    {userInfo?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
