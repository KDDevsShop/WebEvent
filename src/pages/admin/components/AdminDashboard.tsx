import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

import {
  FaDoorOpen,
  FaConciergeBell,
  FaUsers,
  FaCalendarAlt,
} from 'react-icons/fa';

export type RoomStats = {
  total?: number;
  available?: number;
  occupied?: number;
  maintenance?: number;
  reserved?: number;
};

export type ServiceStats = {
  totalVariations?: number;
  totalImages?: number;
  totalReviews?: number;
  totalServices?: number;
  priceRange?: { min: number; max: number } | null;
};

export type UserStats = {
  totalUsers?: number;
  activeUsers?: number;
  bannedUsers?: number;
  totalRoles?: number;
  lastLoginRange?: { earliest: string; latest: string } | null; // ISO date strings
};

export type EventStats = {
  total?: number;
};

export type InvoiceStats = {
  totalInvoices: number;
  totalAmount: number;
  paidInvoices: number;
  pendingInvoices: number;
  cancelledInvoices: number;
  overdueInvoices: number;
  refundedInvoices: number;
  totalPaidAmount: number;
  totalOverdueAmount: number;
};

export type RevenuePoint = {
  date: string;
  amount: number;
};

type AdminDashboardProps = {
  roomStats: RoomStats;
  serviceStats: ServiceStats;
  userStats: UserStats;
  eventStats: EventStats;
  revenueData: RevenuePoint[];
};

export default function AdminDashboard({
  roomStats,
  serviceStats,
  userStats,
  eventStats,
  revenueData,
}: AdminDashboardProps) {
  const metrics = [
    {
      title: 'Total Rooms',
      value: roomStats,
      description: 'Total rooms in inventory',
      icon: <FaDoorOpen size={24} />,
      //secondary: 'Available: 85 | Occupied: 25',
      color: 'bg-yellow-400 text-yellow-900',
    },
    {
      title: 'Total Services',
      value: serviceStats.totalServices,
      description: 'Total service provided',
      icon: <FaConciergeBell size={24} />,
      //secondary: 'Active: 40 | Under Maintenance: 5',
      color: 'bg-amber-600 text-amber-100',
    },
    {
      title: 'Total Users',
      value: userStats.totalUsers,
      description: 'Registered users',
      icon: <FaUsers size={24} />,

      color: 'bg-indigo-500 text-indigo-100',
    },
    {
      title: 'Total Events',
      value: eventStats.total,
      description: 'Events booked so far',
      icon: <FaCalendarAlt size={24} />,
      //secondary: 'Upcoming: 5 | Past: 17',
      color: 'bg-green-500 text-green-100',
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl text-primary font-bold ">Thống kê</h2>
      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-4">
        {metrics.map((metric, idx) => (
          <div
            key={idx}
            className={`${metric.color} rounded-2xl shadow-lg p-6 flex flex-col justify-between`}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div>{metric.icon}</div>
              <h3 className="text-xl font-semibold">{metric.title}</h3>
            </div>

            <div className="text-5xl font-bold">{metric.value}</div>

            <p className="mt-2 text-sm">{metric.description}</p>

            <p className="mt-4 text-xs opacity-70">{metric.secondary}</p>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <Card className="bg-[--muted] rounded-2xl shadow-lg p-6">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-[--primary-foreground]">
            Revenue Over Time
          </CardTitle>
        </CardHeader>
        <CardContent className="h-80 relative">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={revenueData}
              margin={{ top: 20, right: 40, left: 20, bottom: 20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--muted-foreground)"
                vertical={false} // only horizontal grid lines for cleaner look
              />
              <XAxis
                dataKey="date"
                stroke="var(--popover-foreground)"
                tick={{ fill: '#fff', fontWeight: '600' }}
                tickFormatter={(date) =>
                  new Date(date).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                  })
                }
                padding={{ left: 10, right: 10 }}
              />
              <YAxis
                stroke="var(--popover-foreground)"
                tick={{ fill: '#fff', fontWeight: '600' }}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
                width={70}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--popover-bg)',
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  fontWeight: '600',
                }}
                labelFormatter={(label) =>
                  `Date: ${new Date(label).toLocaleDateString()}`
                }
                formatter={(value: number) => [
                  `$${value.toLocaleString()}`,
                  'Revenue',
                ]}
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#fbbf24"
                strokeWidth={4}
                dot={{ r: 6, strokeWidth: 2, fill: '#fbbf24' }}
                activeDot={{ r: 8, strokeWidth: 3, fill: '#fff' }}
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
          {/* Optional: Add a subtle background pattern or gradient */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(90deg, rgba(251,191,36,0.05) 0%, rgba(251,191,36,0) 100%)',
              mixBlendMode: 'multiply',
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
