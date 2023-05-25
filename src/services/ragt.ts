import axios, { AxiosInstance } from 'axios';

const RAGT_BASE_URL = 'https://dev-ragt-api.uni-voice.biz';

class RagtService {
  client: AxiosInstance;

  constructor({ ragtApiKey }) {
    this.client = axios.create({
      baseURL: RAGT_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'X-API-KEY': ragtApiKey
      }
    });
    this.client.interceptors.response.use(
      response => {
        if (response.status === 204) {
          return {};
        }
        const { data } = response;
        return data;
      },
      error => {
        if (error.response && error.response.data) {
          throw error.response.data || error;
        }
        throw error;
      }
    );
  }
  async call(url, { method, routeParams = {}, urlParams = {}, body }) {
    Object.keys(routeParams).forEach(key => {
      url = url.replace(
        new RegExp(':' + key + '(/|$)', 'g'),
        routeParams[key] + '$1'
      );
    });
    return this.client.request({
      method,
      params: urlParams,
      url: `${url}`,
      data: body ? JSON.stringify(body) : undefined
    });
  }

  // Metadata
  async upsertMetadata(data) {
    return this.call('/v0/metadata', {
      method: 'POST',
      body: data
    });
  }
}

export default RagtService;
