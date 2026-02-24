export class ApiService {
  private readonly API_URL = import.meta.env.VITE_API_URL;

  fetchUser = async () => {
    return await fetch(`${this.API_URL}/test`);
  }
}