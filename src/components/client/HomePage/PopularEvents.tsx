import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { formatDateTime } from '@/lib/utils/formatDateTime';
import { formatCurrency } from '@/lib/utils/formatCurrency';

const mockEvents = [
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
];

export default function PopularEvents() {
  return (
    <div className='container mx-auto py-8'>
      <h1 className='text-4xl font-bold mb-8 text-gray-800 text-center'>
        Sự kiện nổi bật
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {mockEvents.map((event) => (
          <Card
            key={event.event_id}
            className='hover:shadow-lg transition-shadow'
          >
            <CardHeader>
              <CardTitle className='text-xl'>{event.event_name}</CardTitle>
              <CardDescription>{event.event_type.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-2'>
                <p className='text-sm text-gray-600'>{event.description}</p>
                <div className='flex items-center gap-2'>
                  <Badge
                    variant={
                      event.status === 'PENDING' ? 'secondary' : 'default'
                    }
                  >
                    {event.status}
                  </Badge>
                  <span className='text-sm text-gray-500'>
                    {formatDateTime(event.event_date)}
                  </span>
                </div>
                <p className='font-semibold'>
                  Estimated Cost: {formatCurrency(event.estimated_cost)}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Link to={`/events/${event.event_id}`} className='w-full'>
                <Button className='w-full'>View Details</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
