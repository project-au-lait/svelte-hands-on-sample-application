import messageStore from './MessageStore';

class RestClient {
  private baseUrl = 'http://localhost:3000/';

  async get<T>(fetch: Fetch, endpoint: string): Promise<T | undefined> {
    return this.handleFetch<T>(fetch, 'GET', endpoint);
  }

  async post<T>(fetch: Fetch, endpoint: string, data: unknown): Promise<T | undefined> {
    return this.handleFetch<T>(fetch, 'POST', endpoint, data);
  }

  async put<T>(fetch: Fetch, endpoint: string, data: unknown): Promise<T | undefined> {
    return this.handleFetch<T>(fetch, 'PUT', endpoint, data);
  }

  async delete<T>(fetch: Fetch, endpoint: string): Promise<T | undefined> {
    return this.handleFetch<T>(fetch, 'DELETE', endpoint);
  }

  private async handleFetch<T>(
    fetch: Fetch,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    endpoint: string,
    data?: unknown
  ): Promise<T | undefined> {
    const body = data ? JSON.stringify(data) : undefined;

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body
      });

      if (response.ok) {
        return response.json();
      }
      messageStore.show(response.statusText);
    } catch (error) {
      console.error('Fetch error:', error);

      if (error instanceof Error) {
        messageStore.show(error.message);
      } else {
        messageStore.show(String(error));
      }
    }
  }
}

export const restClient = new RestClient();
