
export interface TelegramAuthData {
  initData: string;
}

export interface JWTToken {
  token: string;
}

export interface MeResponse {
  id: number;
  is_member: boolean;
  username: string | null;
  surname: string;
  name: string;
  patronymic: string;
  birth_date: string;
  phone_number: string;
  region: string;
  email: string;
  gender: string;
  city: string;
  wish_to_join: boolean;
  home_address: string | null;
  news_subscription: boolean;
}

export enum AppState {
  LOADING = 'LOADING',
  AUTH_SUCCESS = 'AUTH_SUCCESS',
  NOT_TELEGRAM = 'NOT_TELEGRAM',
  AUTH_ERROR = 'AUTH_ERROR'
}

export type View = 'HOME' | 'PROFILE' | 'MUSIC' | 'SHOP' | 'APPEAL' | 'JOIN';
