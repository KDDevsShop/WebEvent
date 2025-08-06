import { BookingPageContainer } from '@/components/client/BookingPage/BookingPageContainer';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

const breadcrumbItems = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Tạo sự kiện', href: '/bookings' },
];

const BookingPage = () => {
  return (
    <div className="px-16 py-4">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbItems.map((item, index) => (
            <BreadcrumbItem key={index}>
              {item.href === '/bookings' ? (
                <BreadcrumbPage>
                  <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
              )}
              {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      <BookingPageContainer />
    </div>
  );
};

export default BookingPage;
