import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { History, Calendar, MapPin, Eye, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BookingHistoryTab: React.FC = () => {
  // Mock booking data - replace with actual data
  const bookings: unknown = [];
  const navigate = useNavigate();

  const handleNavigateToBookingPage = () => {
    navigate('/booking');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      default:
        return 'bg-slate-100 text-slate-800 hover:bg-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <History className="h-6 w-6" />
            Lịch sử đặt lịch
          </h2>
          <p className="text-slate-600 mt-1">
            Xem và quản lý lịch sử đặt chỗ của bạn
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Xuất
        </Button>
      </div>

      {bookings?.length === 0 ? (
        <Card className="border-0 shadow-sm">
          <CardContent className="flex flex-col items-center py-12">
            <History className="h-12 w-12 text-slate-400 mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Chưa có lịch hẹn
            </h3>
            <p className="text-slate-600 text-center">
              Lịch sử đặt chỗ của bạn sẽ xuất hiện ở đây sau khi bạn thực hiện
              đặt chỗ đầu tiên.
            </p>
            <Button
              onClick={handleNavigateToBookingPage}
              variant={'default'}
              className="mt-4"
            >
              Đặt lịch ngay
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {bookings?.map((booking) => (
            <Card
              key={booking.id}
              className="border-0 shadow-sm hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="space-y-1">
                      <h3 className="font-semibold text-slate-900">
                        {booking.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {booking.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(booking.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="font-semibold text-slate-900">
                        {booking.amount}
                      </div>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Xem
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingHistoryTab;
