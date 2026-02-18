import axios from 'axios';

const client = axios.create({
    baseURL: 'http://localhost:3001',
});

// Request interceptor to add auth token
client.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Retry logic
client.interceptors.response.use(undefined, async (err) => {
    const { config, message } = err;
    if (!config || !config.retry) {
        return Promise.reject(err);
    }

    // Retry count
    config.retryCount = config.retryCount || 0;

    if (config.retryCount >= config.retry) {
        return Promise.reject(err);
    }

    config.retryCount += 1;

    // Create new promise to handle exponential backoff
    const backoff = new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, config.retryDelay || 1000);
    });

    await backoff;
    return client(config);
});

export const getExpenses = (params) => client.get('/api/expenses', { params, retry: 3, retryDelay: 1000 });
export const createExpense = (data) => {
    // Check if data is FormData (for file uploads)
    if (data instanceof FormData) {
        return client.post('/api/expenses', data, {
            headers: { 'Content-Type': 'multipart/form-data' },
            retry: 3,
            retryDelay: 1000
        });
    }
    return client.post('/api/expenses', data, { retry: 3, retryDelay: 1000 });
};

export const getUser = () => client.get('/api/user', { retry: 3, retryDelay: 1000 });
export const updateUser = (data) => client.put('/api/user', data, { retry: 3, retryDelay: 1000 });
export const updatePassword = (passwords) => client.patch('/api/user/security', passwords);
export const deleteUser = () => client.delete('/api/user');
export const addCategory = (data) => client.post('/api/user/categories', data);
export const updateCategory = (id, data) => client.patch(`/api/user/categories/${id}`, data);
export const deleteCategory = (id) => client.delete(`/api/user/categories/${id}`);

export const getBudgets = () => client.get('/api/budgets', { retry: 3, retryDelay: 1000 });
export const createBudget = (data) => client.post('/api/budgets', data, { retry: 3, retryDelay: 1000 });
export const updateBudget = (id, data) => client.put(`/api/budgets/${id}`, data, { retry: 3, retryDelay: 1000 });
export const deleteBudget = (id) => client.delete(`/api/budgets/${id}`);

export const authLogin = (data) => client.post('/api/auth/login', data);
export const authRegister = (data) => client.post('/api/auth/register', data);
export const authMe = () => client.get('/api/auth/me');

export const getSubscriptions = () => client.get('/api/subscriptions', { retry: 3, retryDelay: 1000 });
export const createSubscription = (data) => client.post('/api/subscriptions', data, { retry: 3, retryDelay: 1000 });
export const updateSubscription = (id, data) => client.patch(`/api/subscriptions/${id}`, data, { retry: 3, retryDelay: 1000 });
export const deleteSubscription = (id) => client.delete(`/api/subscriptions/${id}`);

export default client;
