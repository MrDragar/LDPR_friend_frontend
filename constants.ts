
// Simulation of vite.config environment variable logic
// In a real Vite project, this would be import.meta.env.VITE_API_URL
export const API_BASE_URL = (typeof window !== 'undefined' && (window as any).API_URL) 
  ? (window as any).API_URL 
  : 'https://сервер.плюссемь.рф/';

export const STORAGE_KEY = 'ldpr_jwt_token';
