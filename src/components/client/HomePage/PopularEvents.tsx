import EventCard from '../common/EventCard';

type Event = {
  event_id: number;
  event_name: string;
  description: string;
  event_date: Date;
  start_time: Date;
  end_time: Date;
  estimated_cost: number;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELED';
  event_type: {
    name: string;
  };
};

const mockEvents: Event[] = [
  {
    event_id: 1,
    event_name: 'Summer Wedding Celebration',
    description: 'A beautiful summer wedding with garden reception',
    event_date: new Date('2024-07-15'),
    start_time: new Date('2024-07-15T14:00:00'),
    end_time: new Date('2024-07-15T22:00:00'),
    estimated_cost: 5000.0,
    status: 'PENDING',
    event_type: { name: 'Wedding' },
  },
  {
    event_id: 2,
    event_name: 'Corporate Annual Meeting',
    description: 'Annual company meeting and networking event',
    event_date: new Date('2024-06-20'),
    start_time: new Date('2024-06-20T09:00:00'),
    end_time: new Date('2024-06-20T17:00:00'),
    estimated_cost: 3500.0,
    status: 'CONFIRMED',
    event_type: { name: 'Corporate' },
  },
  {
    event_id: 3,
    event_name: 'Birthday Gala',
    description: 'Luxurious birthday celebration',
    event_date: new Date('2024-08-10'),
    start_time: new Date('2024-08-10T18:00:00'),
    end_time: new Date('2024-08-10T23:00:00'),
    estimated_cost: 2500.0,
    status: 'PENDING',
    event_type: { name: 'Birthday' },
  },
  {
    event_id: 4,
    event_name: 'Tech Conference 2024',
    description: 'Annual technology conference with industry leaders',
    event_date: new Date('2024-09-05'),
    start_time: new Date('2024-09-05T08:00:00'),
    end_time: new Date('2024-09-05T18:00:00'),
    estimated_cost: 4200.0,
    status: 'CONFIRMED',
    event_type: { name: 'Conference' },
  },
  {
    event_id: 5,
    event_name: 'Charity Fundraising Dinner',
    description: 'Elegant dinner event to raise funds for local charities',
    event_date: new Date('2024-10-12'),
    start_time: new Date('2024-10-12T19:00:00'),
    end_time: new Date('2024-10-12T23:30:00'),
    estimated_cost: 3800.0,
    status: 'CONFIRMED',
    event_type: { name: 'Charity' },
  },
  {
    event_id: 6,
    event_name: 'Music Festival Weekend',
    description:
      'Three-day outdoor music festival featuring local and international artists',
    event_date: new Date('2024-08-25'),
    start_time: new Date('2024-08-25T12:00:00'),
    end_time: new Date('2024-08-27T23:00:00'),
    estimated_cost: 7500.0,
    status: 'PENDING',
    event_type: { name: 'Festival' },
  },
];

const FloatingElements = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Primary colored floating elements */}
    <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full opacity-30 animate-pulse"></div>
    <div
      className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-full opacity-40 animate-bounce"
      style={{ animationDelay: '1s' }}
    ></div>
    <div
      className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full opacity-35 animate-pulse"
      style={{ animationDelay: '2s' }}
    ></div>
    <div
      className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-full opacity-25 animate-bounce"
      style={{ animationDelay: '0.5s' }}
    ></div>

    {/* Geometric shapes */}
    <div
      className="absolute top-1/3 left-1/5 w-16 h-16 bg-gradient-to-br from-blue-200 to-indigo-300 opacity-20 rotate-45 animate-spin"
      style={{ animationDuration: '20s' }}
    ></div>
    <div className="absolute bottom-1/3 right-1/5 w-12 h-12 bg-gradient-to-br from-purple-200 to-blue-300 opacity-25 rotate-12 animate-pulse"></div>

    {/* Floating stars with primary colors */}
    <div className="absolute top-1/4 left-1/3 text-blue-400 opacity-50 animate-pulse">
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    </div>
    <div
      className="absolute top-1/2 right-1/4 text-indigo-400 opacity-40 animate-pulse"
      style={{ animationDelay: '1.5s' }}
    >
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    </div>
    <div
      className="absolute bottom-1/4 left-1/2 text-purple-400 opacity-35 animate-pulse"
      style={{ animationDelay: '2.5s' }}
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    </div>
  </div>
);

export default function PopularEvents() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
      {/* Enhanced floating background elements */}
      <FloatingElements />

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(59 130 246) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        ></div>
      </div>

      <div className="container mx-auto py-20 px-4 relative z-10">
        {/* Enhanced Header Section */}
        <div className="text-center mb-20">
          {/* Icon and badge with primary colors */}
          <div className="inline-flex items-center justify-center mb-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative w-28 h-28 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl transform transition-transform duration-300 group-hover:scale-105">
                <svg
                  className="w-14 h-14 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>
              <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-xl animate-pulse border-2 border-white">
                HOT
              </div>
            </div>
          </div>

          {/* Enhanced title with primary gradient */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-slate-800 via-blue-600 to-indigo-700 bg-clip-text text-transparent leading-tight tracking-tight">
            Sự kiện nổi bật
          </h1>

          {/* Enhanced subtitle */}
          <p className="text-xl md:text-2xl lg:text-3xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-10 font-light">
            Khám phá những sự kiện đặc biệt và trải nghiệm không thể bỏ lỡ trong
            thời gian tới
          </p>

          {/* Enhanced decorative elements with primary colors */}
          <div className="flex justify-center items-center gap-6 mb-16">
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-blue-300 to-blue-500 rounded-full"></div>
            <div className="relative">
              <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 w-4 h-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full animate-ping opacity-20"></div>
            </div>
            <div className="w-32 h-0.5 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 rounded-full"></div>
            <div className="relative">
              <div
                className="w-4 h-4 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full animate-pulse"
                style={{ animationDelay: '0.5s' }}
              ></div>
              <div
                className="absolute inset-0 w-4 h-4 bg-gradient-to-br from-
indigo-600 to-purple-600 rounded-full animate-ping opacity-20"
                style={{ animationDelay: '0.5s' }}
              ></div>
            </div>
            <div className="w-20 h-0.5 bg-gradient-to-r from-purple-500 via-indigo-300 to-transparent rounded-full"></div>
          </div>

          {/* Stats section with primary colors */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-blue-100">
              <div className="text-2xl font-bold text-blue-600">1,000+</div>
              <div className="text-sm text-slate-600">Sự kiện</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-indigo-100">
              <div className="text-2xl font-bold text-indigo-600">50K+</div>
              <div className="text-sm text-slate-600">Người tham gia</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-purple-100">
              <div className="text-2xl font-bold text-purple-600">24/7</div>
              <div className="text-sm text-slate-600">Hỗ trợ</div>
            </div>
          </div>
        </div>

        {/* Enhanced Events Grid */}
        <div className="relative mb-20">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="grid grid-cols-12 gap-4 h-full">
              {[...Array(48)].map((_, i) => (
                <div key={i} className="bg-blue-400 rounded-sm"></div>
              ))}
            </div>
          </div>

          {/* Section header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-blue-100">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-lg font-semibold text-slate-700">
                Sự kiện được yêu thích nhất
              </span>
              <div
                className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"
                style={{ animationDelay: '0.5s' }}
              ></div>
            </div>
          </div>

          {/* Events cards with enhanced styling */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {mockEvents.map((event, index) => (
              <div
                key={event.event_id}
                className="group transform transition-all duration-700 hover:scale-105 hover:-translate-y-2"
                style={{
                  animationDelay: `${index * 0.15}s`,
                  animation: 'fadeInUp 0.8s ease-out forwards',
                }}
              >
                <div className="relative">
                  {/* Glow effect on hover */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
                  <div className="relative">
                    <EventCard event={event} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Call to Action Section */}
        <div className="relative">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 rounded-3xl blur-3xl"></div>

          <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-8 md:p-16 shadow-2xl border border-white/50">
            {/* Icon with enhanced styling */}
            <div className="flex justify-center mb-8">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-xl transform transition-transform duration-300 group-hover:scale-110">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 to-blue-700 bg-clip-text text-transparent mb-6 text-center">
              Bạn muốn xem thêm sự kiện?
            </h3>

            <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto text-center leading-relaxed">
              Khám phá hàng trăm sự kiện khác đang chờ đón bạn. Từ hội thảo
              chuyên nghiệp đến lễ hội âm nhạc sôi động.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden min-w-[200px]">
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Xem tất cả sự kiện
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              <button className="group px-10 py-5 bg-white text-slate-700 font-semibold rounded-2xl border-2 border-blue-200 hover:border-blue-400 hover:text-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl min-w-[200px] relative overflow-hidden">
                <span className="relative z-10">Tạo sự kiện mới</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            {/* Enhanced feature highlights */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-slate-800 mb-1">
                  Thời gian thực
                </h4>
                <p className="text-sm text-slate-600">
                  Cập nhật sự kiện liên tục
                </p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-slate-800 mb-1">
                  Đã xác minh
                </h4>
                <p className="text-sm text-slate-600">
                  Sự kiện được kiểm duyệt
                </p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-slate-800 mb-1">Yêu thích</h4>
                <p className="text-sm text-slate-600">Lưu sự kiện quan tâm</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
