import type { StepFormData } from '@/context/StepFormContext';
import ApiService from './api.service';

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

export interface Event {
  event_id: number;
  event_name: string;
  description: string;
  account_id: string;
  status: string;
  event_date: string;
  start_time: string;
  end_time: string;
  estimated_cost: string;
  room_service_fee: string;
  final_cost: string;
  room_id: string;
  event_type_id: string;
  eventServicesCount: string;
  date_create: string;
  updated_at: string;
}

class EventService {
  api: ApiService;

  constructor() {
    this.api = new ApiService('http://localhost:5000/api/events');
  }

  async createEvent(data: StepFormData): Promise<Event> {
    return this.api.request<Event>('/', 'POST', data, {
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
