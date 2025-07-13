import { Input } from '@/components/ui/input';

const Hero = () => {
  return (
    <div
      className='relative w-screen min-h-[30rem] bg-cover bg-center flex flex-col items-center justify-center'
      style={{
        backgroundImage: "url('/homepage_hero.jpg')",
      }}
    >
      {/* Blur overlay */}
      <div className='absolute inset-0 bg-black/50 backdrop-blur-xs'></div>

      {/* Content layer */}
      <div className='relative z-10 flex flex-col items-center justify-center px-4'>
        <h1 className='text-4xl font-bold mb-8 text-white text-left max-w-3xl'>
          <span className='mb-4'>Đừng bỏ lỡ! </span>
          <br />
          Đặt lịch ngay để nhận ưu đãi hấp dẫn!
        </h1>
        <div className='w-full max-w-xl'>
          <Input
            type='text'
            placeholder='Tìm kiếm sự kiện...'
            className='w-full px-6 py-6 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary bg-white/90 backdrop-blur-sm'
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
