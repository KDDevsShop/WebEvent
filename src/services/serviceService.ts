import ApiService from './api.service';

export interface Service {
  service_id: number;
  service_name: string;
  description: string;
  setup_time: number;
  is_available: boolean;
  is_active: boolean;
  updated_at: string;
  service_type_id: number;
}

export type Filters = {
  applied: number | null;
  search: unknown;
};

export type ApiResponseSingle<T> = {
  data: T;
  message: string;
  status: string;
  statusCode: number;
};

export type ApiResponseList<T> = {
  data: {
    services: T[];
    filters: Filters;
  };
  message: string;
  meta: {
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

class ServiceService {
  api: ApiService;

  constructor() {
    this.api = new ApiService('http://localhost:5000/api/services');
  }

  async createService(data: Omit<Service, 'type_id'>): Promise<Service> {
    return this.api.request<Service>('/', 'POST', data, {
      'Content-Type': 'application/json',
    });
  }

  async getAllServices(): Promise<ApiResponseList<Service>> {
    return this.api.request('/', 'GET');
  }

  async getServiceById(id: string): Promise<ApiResponseSingle<Service>> {
    return this.api.request<ApiResponseSingle<Service>>(`/${id}`, 'GET');
  }
}

export default new ServiceService();
