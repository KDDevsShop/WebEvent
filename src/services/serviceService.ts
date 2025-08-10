import ApiService from './api.service';

interface ServiceImage {
  image_url: string;
  alt_text?: string;
}

export interface Service {
  service_id: number;
  service_name: string;
  description: string;
  setup_time: number;
  is_available: boolean;
  is_active: boolean;
  updated_at: string;
  service_type_id: number;
  images?: ServiceImage[];
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

  async createService(data: any): Promise<any> {
    let headers = {};
    if (!(data instanceof FormData)) {
      headers = { 'Content-Type': 'application/json' };
    }
    return this.api.request('/', 'POST', data, headers);
  }

  async getAllServices(
    params?: Record<string, any>,
  ): Promise<ApiResponseList<Service>> {
    let query = '';
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          searchParams.append(key, value.toString());
        }
      });
      query = `?${searchParams.toString()}`;
    }
    return this.api.request(`/${query}`, 'GET');
  }

  async getServiceById(id: string): Promise<ApiResponseSingle<Service>> {
    return this.api.request<ApiResponseSingle<Service>>(`/${id}`, 'GET');
  }

  async deleteService(id: string): Promise<any> {
    return this.api.request(`/${id}`, 'DELETE');
  }

  async updateService(id: number, data: any): Promise<any> {
    // If data is NOT FormData, send JSON content-type

    return this.api.request(`/${id}`, 'PUT', data);
  }
}

export default new ServiceService();
