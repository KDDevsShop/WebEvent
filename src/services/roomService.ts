import ApiService from './api.service';

class RoomService {
  api: ApiService;

  constructor() {
    this.api = new ApiService('http://localhost:5000/api/rooms');
  }

  async getAllRooms(params: Record<string, any> = {}): Promise<any> {
    const query = new URLSearchParams(params).toString();
    return this.api.request(query ? `/?${query}` : '/', 'GET');
  }

  async deleteRoom(id: string): Promise<any> {
    return this.api.request(`/${id}`, 'DELETE');
  }

  async getRoomById(id: string): Promise<any> {
    return this.api.request(`/${id}`, 'GET');
  }

  async updateRoom(id: string, data: any): Promise<any> {
    return this.api.request(`/${id}`, 'PUT', data);
  }
}

export default new RoomService();
