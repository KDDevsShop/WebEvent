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
  <div className='absolute inset-0 overflow-hidden pointer-events-none'>
    {/* Floating circles */}
    <div className='absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full opacity-20 animate-pulse'></div>
    <div
      className='absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full opacity-30 animate-bounce'
      style={{ animationDelay: '1s' }}
    ></div>
    <div
      className='absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full opacity-25 animate-pulse'
      style={{ animationDelay: '2s' }}
    ></div>
    <div
      className='absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-br from-green-200 to-teal-200 rounded-full opacity-20 animate-bounce'
      style={{ animationDelay: '0.5s' }}
    ></div>

    {/* Floating stars */}
    <div className='absolute top-1/4 left-1/3 text-yellow-300 opacity-40 animate-pulse'>
      <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 20 20'>
        <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
      </svg>
    </div>
    <div
      className='absolute top-1/2 right-1/4 text-purple-300 opacity-30 animate-pulse'
      style={{ animationDelay: '1.5s' }}
    >
      <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
        <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
      </svg>
    </div>
  </div>
);

const StatsCard = ({
  icon,
  number,
  label,
  gradient,
}: {
  icon: React.ReactNode;
  number: string;
  label: string;
  gradient: string;
}) => (
  <div
    className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
  >
    <div className='absolute top-0 right-0 -mt-4 -mr-4 w-16 h-16 bg-white bg-opacity-20 rounded-full'></div>
    <div className='relative z-10'>
      <div className='flex items-center justify-between mb-2'>
        <div className='text-white opacity-80'>{icon}</div>
        <div className='text-right'>
          <div className='text-2xl font-bold'>{number}</div>
          <div className='text-sm opacity-90'>{label}</div>
        </div>
      </div>
    </div>
  </div>
);

const FilterTabs = () => {
  const tabs = [
    { id: 'all', label: 'Tất cả', count: mockEvents.length },
    {
      id: 'confirmed',
      label: 'Đã xác nhận',
      count: mockEvents.filter((e) => e.status === 'CONFIRMED').length,
    },
    {
      id: 'pending',
      label: 'Chờ xử lý',
      count: mockEvents.filter((e) => e.status === 'PENDING').length,
    },
  ];

  return (
    <div className='flex flex-wrap justify-center gap-4 mb-12'>
      {tabs.map((tab, index) => (
        <button
          key={tab.id}
          className={`group relative px-6 py-3 rounded-full font-medium transition-all duration-300 ${
            index === 0
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
              : 'bg-white text-gray-600 hover:text-gray-800 shadow-md hover:shadow-lg border border-gray-200'
          }`}
        >
          <span className='relative z-10 flex items-center gap-2'>
            {tab.label}
            <span
              className={`px-2 py-1 rounded-full text-xs font-bold ${
                index === 0
                  ? 'bg-white bg-opacity-20 text-white'
                  : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
              }`}
            >
              {tab.count}
            </span>
          </span>
          {index !== 0 && (
            <div className='absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
          )}
        </button>
      ))}
    </div>
  );
};

export default function PopularEvents() {
  return (
    <div className='relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden'>
      {/* Floating background elements */}
      <FloatingElements />

      <div className='container mx-auto py-20 px-4 relative z-10'>
        {/* Header Section */}
        <div className='text-center mb-16'>
          {/* Icon and badge */}
          <div className='inline-flex items-center justify-center mb-6'>
            <div className='relative'>
              <div className='w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl'>
                <svg
                  className='w-12 h-12 text-white'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
                  />
                </svg>
              </div>
              <div className='absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-pink-400 to-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg animate-pulse'>
                HOT
              </div>
            </div>
          </div>

          {/* Title with gradient text */}
          <h1 className='text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight'>
            Sự kiện nổi bật
          </h1>

          {/* Subtitle */}
          <p className='text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8'>
            Khám phá những sự kiện đặc biệt và trải nghiệm không thể bỏ lỡ trong
            thời gian tới
          </p>

          {/* Decorative elements */}
          <div className='flex justify-center items-center gap-4 mb-12'>
            <div className='w-16 h-1 bg-gradient-to-r from-transparent to-blue-500 rounded-full'></div>
            <div className='w-3 h-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full animate-pulse'></div>
            <div className='w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full'></div>
            <div
              className='w-3 h-3 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full animate-pulse'
              style={{ animationDelay: '0.5s' }}
            ></div>
            <div className='w-16 h-1 bg-gradient-to-r from-purple-500 to-transparent rounded-full'></div>
          </div>
        </div>

        {/* Stats Section */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16'>
          <StatsCard
            icon={
              <svg
                className='w-8 h-8'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                />
              </svg>
            }
            number={mockEvents.length.toString()}
            label='Tổng sự kiện'
            gradient='from-blue-500 to-blue-600'
          />
          <StatsCard
            icon={
              <svg
                className='w-8 h-8'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            }
            number={mockEvents
              .filter((e) => e.status === 'CONFIRMED')
              .length.toString()}
            label='Đã xác nhận'
            gradient='from-green-500 to-emerald-600'
          />
          <StatsCard
            icon={
              <svg
                className='w-8 h-8'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            }
            number={mockEvents
              .filter((e) => e.status === 'PENDING')
              .length.toString()}
            label='Chờ xử lý'
            gradient='from-orange-500 to-red-500'
          />
          <StatsCard
            icon={
              <svg
                className='w-8 h-8'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1'
                />
              </svg>
            }
            number={`$${(
              mockEvents.reduce((sum, event) => sum + event.estimated_cost, 0) /
              1000
            ).toFixed(0)}K`}
            label='Tổng giá trị'
            gradient='from-purple-500 to-pink-600'
          />
        </div>

        {/* Filter Tabs */}
        <FilterTabs />

        {/* Events Grid */}
        <div className='relative'>
          {/* Grid background pattern */}
          <div className='absolute inset-0 opacity-5'>
            <div className='grid grid-cols-12 gap-4 h-full'>
              {[...Array(48)].map((_, i) => (
                <div key={i} className='bg-gray-400 rounded-sm'></div>
              ))}
            </div>
          </div>

          {/* Events cards with staggered animation */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10'>
            {mockEvents.map((event, index) => (
              <div
                key={event.event_id}
                className='transform transition-all duration-500 hover:scale-105'
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fadeInUp 0.6s ease-out forwards',
                }}
              >
                <EventCard event={event} />
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Section */}
        <div className='mt-20 text-center'>
          <div className='relative inline-block'>
            {/* Glowing background */}
            <div className='absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-xl opacity-30 animate-pulse'></div>

            {/* CTA Content */}
            <div className='relative bg-white rounded-2xl p-8 md:p-12 shadow-2xl border border-gray-100'>
              <div className='flex justify-center mb-6'>
                <div className='w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg'>
                  <svg
                    className='w-8 h-8 text-white'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M13 10V3L4 14h7v7l9-11h-7z'
                    />
                  </svg>
                </div>
              </div>

              <h3 className='text-3xl md:text-4xl font-bold text-gray-800 mb-4'>
                Bạn muốn xem thêm sự kiện?
              </h3>

              <p className='text-lg text-gray-600 mb-8 max-w-2xl mx-auto'>
                Khám phá hàng trăm sự kiện khác đang chờ đón bạn. Từ hội thảo
                chuyên nghiệp đến lễ hội âm nhạc sôi động.
              </p>

              <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
                <button className='group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden'>
                  <span className='relative z-10 flex items-center gap-2'>
                    Xem tất cả sự kiện
                    <svg
                      className='w-5 h-5 group-hover:translate-x-1 transition-transform duration-200'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M17 8l4 4m0 0l-4 4m4-4H3'
                      />
                    </svg>
                  </span>
                  <div className='absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                </button>

                <button className='px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:text-blue-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg'>
                  Tạo sự kiện mới
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom decorative section */}
        <div className='mt-16 flex justify-center'>
          <div className='flex items-center gap-2 px-6 py-3 bg-white bg-opacity-60 backdrop-blur-sm rounded-full shadow-lg border border-white border-opacity-20'>
            <div className='flex -space-x-2'>
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full border-2 border-white shadow-sm bg-gradient-to-br ${
                    [
                      'from-blue-400 to-blue-600',
                      'from-green-400 to-green-600',
                      'from-purple-400 to-purple-600',
                      'from-pink-400 to-pink-600',
                      'from-yellow-400 to-yellow-600',
                    ][i]
                  }`}
                ></div>
              ))}
            </div>
            <span className='text-sm font-medium text-gray-700 ml-3'>
              Hơn <span className='font-bold text-blue-600'>1,000+</span> người
              đã tham gia
            </span>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
