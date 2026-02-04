
import apiClient from './client';
import { TelegramAuthData, JWTToken, MeResponse } from '../types';

export const login = async (data: TelegramAuthData): Promise<JWTToken> => {
  const response = await apiClient.post<JWTToken>('auth/login', data);
  return response.data;
};

export const getMe = async (token?: string): Promise<MeResponse> => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const response = await apiClient.get<MeResponse>('auth/me', { headers });
  return response.data;
};
