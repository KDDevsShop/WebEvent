import ApiService from './api.service';

class VariationService {
  api: ApiService;

  constructor() {
    this.api = new ApiService('http://localhost:5000/api/variations');
  }

  async createVariation(data: any): Promise<any> {
    return this.api.request('/', 'POST', data);
  }
}

export default new VariationService();
