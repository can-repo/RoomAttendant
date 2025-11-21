import axios from 'axios';
import { BASE_URL, STATIC_TOKEN } from '../config/config';
import type { RoomStatus } from '../types/api.RoomStatus';
import type { RoomDetail } from '../types/api.RoomDetail';

// Create axios instance dengan default config
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'localtonet-skip-warning': 'true',
    'ngrok-skip-browser-warning': 'true',
  },
});

// Request interceptor untuk logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`🔄 ${config.method?.toUpperCase()} Request to: ${config.url}`, config.params);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor untuk error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log('✅ Response received:', response.data);
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      url: error.config?.url
    });
    return Promise.reject(error);
  }
);

export const callApiRoomStatus = async (): Promise<RoomStatus> => {
  try {
    const response = await apiClient.get('/ra-status', {
      params: { token: STATIC_TOKEN }
    });

    // Validasi response
    if (isErrorResponse(response.data)) {
      throw new Error('API returned error response');
    }

    return response.data;
  } catch (error: any) {
    console.error('🚨 Error in callApiRoomStatus:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });
    throw new Error(`Failed to fetch room status: ${error.message}`);
  }
};

export const callApiDetailRoom = async (
  Sroom: string,
  Eroom: string,
): Promise<RoomDetail> => {
  try {
    // PERBAIKAN: Tambahkan slash di depan endpoint
    const response = await apiClient.get('/room-detail', {
      params: {
        token: STATIC_TOKEN,
        Sroom,
        Eroom,
      },
    });

    // Validasi response
    if (isErrorResponse(response.data)) {
      throw new Error('API returned error response');
    }

    return response.data;
  } catch (error: any) {
    console.error('🚨 Error in callApiDetailRoom:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      params: { Sroom, Eroom }
    });
    throw new Error(`Failed to fetch room detail: ${error.message}`);
  }
};

// Helper function untuk deteksi error response
function isErrorResponse(data: any): boolean {
  return (
    typeof data === 'string' && (
      data.includes('<!DOCTYPE html>') ||
      data.includes('<html>') ||
      data.includes('Error') ||
      data.includes('Not Found')
    ) ||
    (data && data.success === false) ||
    (data && data.error)
  );
}

// Export axios instance untuk penggunaan lain
export default apiClient;
