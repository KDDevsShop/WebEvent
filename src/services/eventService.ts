import type { StepFormData } from '@/context/StepFormContext';
import ApiService from './api.service';
import type { UserInfoType } from './userService';
import type { Room } from './roomService';
import type { EventType } from './eventType.service';
import type { Service } from './serviceService';

type ApiResponse<T> = {
  data: T;
  message: string;
  meta?: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  status: string;
  statusCode: number;
};

// interface Account {
//   account_id: number;
//   account_name: string;
// }

// interface Room {
//   room_id: number;
//   room_name: string;
//   is_active: boolean;
// }

// interface EventType {
//   type_id: number;
//   type_name: string;
//   is_active: boolean;
// }

// interface Service {
//   service_id: number;
//   service_name: string;
//   description: string;
//   is_active: boolean;
// }

type Variation = {
  variation_id: number;
  variation_name: string;
  base_price: string;
  duration_hours: number;
  is_active: boolean;
};

type EventServiceType = {
  service_id: number;
  variation_id: number;
  service: Service;
  variation: Variation;
};

export interface Event {
  event_id: string | number;
  event_name: string;
  description: string;
  account_id: string | number;
  status: string;
  event_date: string;
  start_time: string;
  end_time: string;
  estimated_cost: string;
  room_service_fee?: string | null;
  final_cost?: string | null;
  room_id: string | number;
  event_type_id: string | number;
  account?: UserInfoType;
  room?: Room;
  event_type?: EventType;
  event_services?: EventServiceType[];
  eventServicesCount?: string | number;
  date_create?: string;
  updated_at?: string;
}

class EventService {
  api: ApiService;

  constructor() {
    this.api = new ApiService('http://localhost:5000/api/events');
  }

  async createEvent(data: StepFormData): Promise<ApiResponse<Event>> {
    return this.api.request<ApiResponse<Event>>('/', 'POST', data, {
      'Content-Type': 'application/json',
    });
  }

  async getAllEvents(): Promise<ApiResponse<Event[]>> {
    return this.api.request('/', 'GET');
  }

  async getEventById(id: string): Promise<ApiResponse<Event>> {
    return this.api.request<ApiResponse<Event>>(`/${id}`, 'GET');
  }
}

export default new EventService();
