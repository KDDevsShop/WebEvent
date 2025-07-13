import ApiService from './api.service';

class EventTypeService {
  api: ApiService;

  constructor() {
    this.api = new ApiService('http://localhost:5000/api/event-types');
  }

  async createEventType(data: unknown): Promise<unknown> {
    return this.api.request('/', 'POST', data, {
      'Content-Type': 'application/json',
    });
  }

  async getAllEventTypes(): Promise<unknown> {
    return this.api.request('/', 'GET');
  }

  async getEventTypeById(id: string): Promise<unknown> {
    return this.api.request(`/${id}`, 'GET');
  }
}

export default new EventTypeService();
