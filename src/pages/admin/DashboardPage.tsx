import { useEffect, useState } from 'react';
import AdminDashboard, {
  type RoomStats,
  type ServiceStats,
  type InvoiceStats,
  type RevenuePoint,
  type UserStats,
  type EventStats,
} from '../admin/components/AdminDashboard';
import AnalyticsService, {
  type AnalyticsData,
} from '../../services/dashboard.service';
import RoomService from '../../services/roomService';
import ServiceService from '../../services/serviceService';
import AccountService from '../../services/accountService';
import EventService from '../../services/eventService';

export default function DashboardPage() {
  const [roomStats, setRoomStats] = useState<RoomStats | null>(null);
  const [serviceStats, setServiceStats] = useState<ServiceStats | null>(null);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [eventStats, setEventStats] = useState<EventStats | null>(null);
  const [revenueData, setRevenueData] = useState<RevenuePoint[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // const analyticsRes = await AnalyticsService.getAnalytics();
        // const data: AnalyticsData = analyticsRes.data;
        //const revenue = data.invoiceStats.totalPaidAmount;

        const revenue = [
          { date: '2025-01-01', total: 1200 },
          { date: '2025-01-02', total: 1500 },
          { date: '2025-01-03', total: 1100 },
          { date: '2025-01-04', total: 1800 },
          { date: '2025-01-05', total: 1700 },
          { date: '2025-01-06', total: 1900 },
          { date: '2025-01-07', total: 2200 },
        ];
        const roomres = await RoomService.getAllRooms();
        //console.log(roomres);

        const serviceres = await ServiceService.getAllServices();
        //console.log(serviceres);

        const accountres = await AccountService.getAllAccounts();
        //console.log(accountres);

        const eventres = await EventService.getAllEvents();
        console.log(eventres);

        setRoomStats(roomres.data.length || 0);
        setServiceStats({
          totalServices: serviceres.data.services.length || 0,
        });
        setUserStats({ totalUsers: accountres.data.accounts.length || 0 });
        setEventStats({ total: eventres.data.length || 0 });

        setRevenueData(
          revenue.map((item: { date: string; total: string | number }) => ({
            date: item.date,
            amount: Number(item.total),
          })),
        );
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    }

    fetchData();
  }, []);

  if (!roomStats || !serviceStats) {
    return <div className="p-6 text-lg">Loading dashboard...</div>;
  }

  return (
    <AdminDashboard
      roomStats={roomStats}
      serviceStats={serviceStats}
      userStats={userStats}
      eventStats={eventStats}
      revenueData={revenueData}
    />
  );
}
