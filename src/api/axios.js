import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

const setupAxiosInterceptors = () => {
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    response => response,
    async (error) => {
      if (error.response) {
        const { status } = error.response;
        const originalRequest = error.config;

        if (status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const newToken = await refreshToken();
            if (newToken) {
              localStorage.setItem('authToken', newToken);
              api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
              originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
              return api(originalRequest);
            }
          } catch (refreshError) {
            console.error('Error refreshing token:', refreshError);
          }
        }
      } else {
        console.error('Unexpected error:', error);
      }

      return Promise.reject(error);
    }
  );
};

const refreshToken = async () => {
  try {
    const response = await api.post('/refresh-token', { token: localStorage.getItem('authToken') });
    return response.data.newToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return null;
  }
};

export { api, setupAxiosInterceptors };
